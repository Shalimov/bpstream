import { IGenerator } from "./generator.interface";

export class SimpleBufferGenerator implements IGenerator {
  #limit: number;
  #source: Buffer;

  constructor(buffer: Buffer, chunkSize: number) {
    this.#source = buffer;
    this.#limit = ~~Math.round(chunkSize / buffer.BYTES_PER_ELEMENT);
  }

  generate<Buffer>(): () => Generator<Buffer, void> {
    const limit = this.#limit;
    const source = this.#source;
    const bufferLength = source.length;

    return function* SimpleBufferGenerator() {
      for (let offset = 0; offset < bufferLength; offset += limit) {
        yield (source.slice(
          offset,
          offset + Math.min(limit, bufferLength - offset)
        ) as unknown) as Buffer;
      }
    };
  }
}
