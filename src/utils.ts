/**
 * Create a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.
 * Workaround for [Microsoft/TypeScript#29729](https://github.com/microsoft/typescript/issues/29729).
 *
 * See https://github.com/sindresorhus/type-fest/blob/master/source/literal-union.d.ts
 *
 */
export type LiteralUnion<T extends U, U = string> = T | (U & { _?: never });

export interface Compare<T> {
  previous: T;
  current: T;
}
