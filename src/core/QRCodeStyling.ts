import getMode from "../tools/getMode";
import mergeDeep from "../tools/merge";
import QRCanvas from "./QRCanvas";
import defaultOptions, { Options, RequiredOptions } from "./QROptions";
import sanitizeOptions from "../tools/sanitizeOptions";
import { QRCode } from "../types";
import qrcode from "qrcode-generator";
import { Canvas, PngConfig } from "canvas";

export default class QRCodeStyling {
  _options: RequiredOptions;
  _canvas?: QRCanvas;
  _qr?: QRCode;

  constructor(options?: Partial<Options>) {
    this._options = options ? sanitizeOptions(mergeDeep(defaultOptions, options) as RequiredOptions) : defaultOptions;
  }

  public async draw(options?: Partial<Options>): Promise<QRCodeStyling> {
    this._options = options ? sanitizeOptions(mergeDeep(this._options, options) as RequiredOptions) : this._options;

    if (!this._options.data) {
      throw new Error("Data isn`t defined");
    }

    this._qr = qrcode(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel);
    this._qr.addData(this._options.data, this._options.qrOptions.mode || getMode(this._options.data));
    this._qr.make();
    this._canvas = new QRCanvas(this._options);
    await this._canvas.drawQR(this._qr);
    return this;
  }

  public getCanvas(): Canvas | undefined {
    return this._canvas?.getCanvas();
  }

  toPNGBuffer(options?: PngConfig): Buffer | undefined {
    return this._canvas?.getCanvas().toBuffer("image/png", options);
  }

  toSVGBuffer(): Buffer | undefined {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this._canvas?.getCanvas().toBuffer("image/svg+xml");
  }
}
