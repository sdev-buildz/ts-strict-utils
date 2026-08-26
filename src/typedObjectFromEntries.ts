/**
 * A strongly typed version of {@link Object.fromEntries}.
 * @example
 * ```ts
 * const entries: Array<[string, string | number]> = [
 *   ['key1', 1],
 *   ['2', 'two'],
 * ]
 *
 * const obj = typedObjectFromEntries(entries)
 *
 * // obj is of type Record<string, string | number>
 * ```
 * @example
 * ```ts
 * const entries = [
 *   ['key1', 1],
 *   ['2', 'two'],
 * ]
 *
 * // throws type error: type '(string | number)[][]' is not assignable to
 * //   type 'Iterable<readonly [string, string | number]>'
 * const obj = typedObjectFromEntries<string, string | number>(entries)
 * ```
 */
export const typedObjectFromEntries = <
  PropertyKey extends string,
  ValueType = unknown,
>(
  entries: Iterable<readonly [PropertyKey, ValueType]>
): Record<PropertyKey, ValueType> => {
  return Object.fromEntries(entries) as Record<PropertyKey, ValueType>
}
