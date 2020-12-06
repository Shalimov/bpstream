"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPReadableStream = void 0;
const stream_1 = require("stream");
const simple_buffer_generator_1 = require("./generators/simple-buffer.generator");
const throttled_buffer_generator_1 = require("./generators/throttled-buffer.generator");
class BPReadableStream {
    static from(source, opts) {
        const options = {
            chunkSize: BPReadableStream.DEFAULT_CHUNK_SIZE,
            ...opts,
        };
        let genType = "SIMPLE";
        if ("throttleMs" in options) {
            const throttleDefined = typeof options.throttleMs === "number";
            if (options.throttleMs !== undefined && options.throttleMs <= 0) {
                throw new Error("Throttle MS should be greater than 0");
            }
            genType = "THROTTLED";
        }
        const generatorBuilder = this.createGenerator(genType, source, options);
        const createAsyncIterator = generatorBuilder.generate();
        return stream_1.Readable.from(createAsyncIterator(), { autoDestroy: true });
    }
    static createGenerator(generatorType, buffer, opts) {
        if (generatorType === "THROTTLED") {
            const genOpts = opts;
            return new throttled_buffer_generator_1.ThrottledBufferGenerator(buffer, genOpts.chunkSize, genOpts.throttleMs);
        }
        return new simple_buffer_generator_1.SimpleBufferGenerator(buffer, opts.chunkSize);
    }
}
exports.BPReadableStream = BPReadableStream;
BPReadableStream.DEFAULT_CHUNK_SIZE = 512 * 1024;
//# sourceMappingURL=bpstream.js.map