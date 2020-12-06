/// <reference types="node" />
import { IGenerator } from "./generator.interface";
export declare class ThrottledBufferGenerator implements IGenerator {
    #private;
    constructor(buffer: Buffer, chunkSize: number, throttleMs: number);
    generate<Buffer>(): () => AsyncIterable<Buffer>;
}
