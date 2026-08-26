/**
 * A strongly typed version of {@link Object.entries}.
 */
export type Entries<ObjectType> = NonNullable<
  {
    [K in keyof ObjectType]: [K, ObjectType[K]]
  }[keyof ObjectType]
>[]

/**
 * Typesafe version of {@link Object.entries}.
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * const entries = typedObjectEntries(obj)
 *
 * // entries is of type NonNullable<["a", number] | ["b", number] | ["c", number]>[]
 * ```
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * const entries = typedObjectEntries<Record<string,1|2|3|4>>(obj)
 *
 * // entries is of type [string, 1 | 2 | 3 | 4][]
 * ```
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 }
 *
 * // throws type error: Type 'number' is not assignable to type '1 | 2'
 * const entries = typedObjectEntries<Record<string,1|2>>(obj)
 * ```
 */
export function typedObjectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>
}
