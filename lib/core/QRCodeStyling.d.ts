/// <reference types="node" />
import QRCanvas from "./QRCanvas";
import { Options, RequiredOptions } from "./QROptions";
import { QRCode } from "../types";
import { Canvas, PngConfig } from "canvas";
export default class QRCodeStyling {
    _options: RequiredOptions;
    _canvas?: QRCanvas;
    _qr?: QRCode;
    constructor(options?: Partial<Options>);
    draw(options?: Partial<Options>): Promise<QRCodeStyling>;
    getCanvas(): Canvas | undefined;
    toPNGBuffer(options?: PngConfig): Buffer | undefined;
    toSVGBuffer(): Buffer | undefined;
}
