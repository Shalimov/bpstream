import { Readable } from "stream";

import { IGenerator } from "./generators/generator.interface";
import { SimpleBufferGenerator } from "./generators/simple-buffer.generator";
import { ThrottledBufferGenerator } from "./generators/throttled-buffer.generator";

type GeneratorType = "SIMPLE" | "THROTTLED";

type SimpleBufferStream = { chunkSize: number };

type ThrottledBufferStream = {
  chunkSize: number;
  throttleMs: number;
};

type BPReadableStreamOpts = SimpleBufferStream | ThrottledBufferStream;

export class BPReadableStream {
  private static DEFAULT_CHUNK_SIZE = 512 * 1024;

  static from(source: Buffer, opts?: BPReadableStreamOpts): Readable {
    const options = {
      chunkSize: BPReadableStream.DEFAULT_CHUNK_SIZE,
      ...opts,
    };

    let genType: GeneratorType = "SIMPLE";

    if ("throttleMs" in options) {
      const throttleDefined = typeof options.throttleMs === "number";

      if (options.throttleMs !== undefined && options.throttleMs <= 0) {
        throw new Error("Throttle MS should be greater than 0");
      }

      genType = "THROTTLED";
    }

    const generatorBuilder = this.createGenerator(genType, source, options);

    const createAsyncIterator = generatorBuilder.generate();

    return Readable.from(createAsyncIterator(), { autoDestroy: true });
  }

  private static createGenerator(
    generatorType: GeneratorType,
    buffer: Buffer,
    opts: BPReadableStreamOpts
  ): IGenerator {
    if (generatorType === "THROTTLED") {
      const genOpts = opts as ThrottledBufferStream;

      return new ThrottledBufferGenerator(
        buffer,
        genOpts.chunkSize,
        genOpts.throttleMs
      );
    }

    return new SimpleBufferGenerator(buffer, opts.chunkSize);
  }
}
