/// <reference types="node" />
import { IGenerator } from "./generator.interface";
export declare class SimpleBufferGenerator implements IGenerator {
    #private;
    constructor(buffer: Buffer, chunkSize: number);
    generate<Buffer>(): () => Generator<Buffer, void>;
}
