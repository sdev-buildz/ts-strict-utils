/**
 * An Utility type that enforces omitted keys to exist on the original type,
 *  with full IDE auto-completion support.
 * @example
 * ```ts
 * type Original = 'strict' | 'utils' | 'type'
 *
 *
 * //   Doesn't throw even if 'stryct' is spelled incorrectly.
 * //       It doesn't support autocompletion.
 * type WithNormalOmit = Omit<Original,'utils'|'stryct'>
 *
 *
 * //   Throws: Type '"stryct"' does not satisfy the constraint 'strict' | 'utils' | 'type'.
 * //        It supports autocompletion.
 * type WithStrictOmit = StrictOmit<Original,'utils'|'stryct'>
 * ```
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>

/**
 * An Utility type that enforces extracted keys to exist on the original type,
 *  with full IDE auto-completion support.
 * @example
 * ```ts
 * type Original = 'strict' | 'utils' | 'type'
 *
 *
 * //   Doesn't throw even if 'stryct' is spelled incorrectly.
 * //       It doesn't support autocompletion.
 * type WithNormalExtract = Extract<Original,'utils'|'stryct'>
 *
 *
 * //   Throws: Type '"stryct"' does not satisfy the constraint 'strict' | 'utils' | 'type'.
 * //        It supports autocompletion.
 * type WithStrictExtract = StrictOmit<Original,'utils'|'stryct'>
 * ```
 */
export type StrictExtract<T, U extends T> = Extract<T, U>
