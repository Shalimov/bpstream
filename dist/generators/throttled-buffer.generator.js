"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _limit, _source, _interval;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottledBufferGenerator = void 0;
class ThrottledBufferGenerator {
    constructor(buffer, chunkSize, throttleMs) {
        _limit.set(this, void 0);
        _source.set(this, void 0);
        _interval.set(this, void 0);
        __classPrivateFieldSet(this, _source, buffer);
        __classPrivateFieldSet(this, _limit, ~~Math.round(chunkSize / buffer.BYTES_PER_ELEMENT));
        __classPrivateFieldSet(this, _interval, throttleMs);
    }
    generate() {
        const limit = __classPrivateFieldGet(this, _limit);
        const source = __classPrivateFieldGet(this, _source);
        const bufferLength = source.length;
        const self = this;
        return () => ({
            [Symbol.asyncIterator]() {
                let offset = 0;
                return {
                    async next() {
                        await new Promise((resolve) => setTimeout(resolve, __classPrivateFieldGet(self, _interval)));
                        if (offset < bufferLength) {
                            const bufferSlice = source.slice(offset, offset + Math.min(limit, bufferLength - offset));
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
exports.ThrottledBufferGenerator = ThrottledBufferGenerator;
_limit = new WeakMap(), _source = new WeakMap(), _interval = new WeakMap();
//# sourceMappingURL=throttled-buffer.generator.js.map