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
var _limit, _source;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleBufferGenerator = void 0;
class SimpleBufferGenerator {
    constructor(buffer, chunkSize) {
        _limit.set(this, void 0);
        _source.set(this, void 0);
        __classPrivateFieldSet(this, _source, buffer);
        __classPrivateFieldSet(this, _limit, ~~Math.round(chunkSize / buffer.BYTES_PER_ELEMENT));
    }
    generate() {
        const limit = __classPrivateFieldGet(this, _limit);
        const source = __classPrivateFieldGet(this, _source);
        const bufferLength = source.length;
        return function* SimpleBufferGenerator() {
            for (let offset = 0; offset < bufferLength; offset += limit) {
                yield source.slice(offset, offset + Math.min(limit, bufferLength - offset));
            }
        };
    }
}
exports.SimpleBufferGenerator = SimpleBufferGenerator;
_limit = new WeakMap(), _source = new WeakMap();
//# sourceMappingURL=simple-buffer.generator.js.map