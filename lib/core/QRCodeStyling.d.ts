/// <reference types="node" />
import QRCanvas from "./QRCanvas";
import { Options, RequiredOptions } from "./QROptions";
import { QRCode } from "../types";
import { PngConfig } from "canvas";
export default class QRCodeStyling {
    _options: RequiredOptions;
    _canvas?: QRCanvas;
    _qr?: QRCode;
    constructor(options?: Partial<Options>);
    draw(options?: Partial<Options>): Promise<QRCodeStyling>;
    toPNGBuffer(options?: PngConfig): Buffer | undefined;
}
