/// <reference types="node" />
import { Readable } from "stream";
declare type SimpleBufferStream = {
    chunkSize: number;
};
declare type ThrottledBufferStream = {
    throttleMs: number;
} & SimpleBufferStream;
declare type BPReadableStreamOpts = SimpleBufferStream | ThrottledBufferStream;
export declare class BPReadableStream {
    private static DEFAULT_CHUNK_SIZE;
    static from(source: Buffer, opts?: BPReadableStreamOpts): Readable;
    private static createGenerator;
}
export {};
