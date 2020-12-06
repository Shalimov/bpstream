export interface IGenerator {
    generate<T>(): (() => Generator<T, void>) | (() => AsyncIterable<T>);
}
