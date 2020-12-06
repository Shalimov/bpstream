import { IGenerator } from "./generator.interface";

export class ThrottledBufferGenerator implements IGenerator {
  #limit: number;
  #source: Buffer;
  #interval: number;

  constructor(buffer: Buffer, chunkSize: number, throttleMs: number) {
    this.#source = buffer;
    this.#limit = ~~Math.round(chunkSize / buffer.BYTES_PER_ELEMENT);
    this.#interval = throttleMs;
  }

  generate<Buffer>(): () => AsyncIterable<Buffer> {
    const limit = this.#limit;
    const source = this.#source;
    const bufferLength = source.length;
    const self = this;

    return () => ({
      [Symbol.asyncIterator](): AsyncIterator<Buffer> {
        let offset = 0;

        return {
          async next(): Promise<IteratorResult<Buffer>> {
            await new Promise((resolve) => setTimeout(resolve, self.#interval));

            if (offset < bufferLength) {
              const bufferSlice = (source.slice(
                offset,
                offset + Math.min(limit, bufferLength - offset)
              ) as unknown) as Buffer;

              offset += limit;

              return { done: false, value: bufferSlice };
            }

            return { done: true, value: undefined };
          },
        };
      },
    });
  }
}
