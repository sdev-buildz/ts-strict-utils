import { canonicalSerialization } from 'canonical-serialization'

/**
 * A typed Map data structure that accepts objects as keys, where keys are compared based on
 *  deep structural equality.
 * @see {@link canonicalSerialization} - used to sort and serialize.
 * @example
 * ```ts
 * type ObjKeyType = {
 *    a: string,
 *    b: number,
 *    c: {
 *      d: string
 *    }
 * }
 *
 * const key1 = { a: 'a', b: 1, c: { d: 'd' } }
 * const key2 = { a: 'different', b: 2, c: { d: 'random' } }
 * const key3 = { b: 1, a: 'a', c: { d: 'd' } }
 * // key3 is structurally the same as key1.
 * //  But they don't share the same reference.
 *
 *
 * // Outputs: false
 * console.log(Object.is(key1,key1Clone))
 *
 * const map = new TypedObjKeyedMap<ObjKeyType, string>()
 * map.set(key1, 'value1')
 * map.set(key2, 'value2')
 * map.set(key3, 'value3') // overwrites key1's entry. Because they are structurally equal.
 *
 * console.log(map.get(key1)) // Outputs: 'value3'
 * console.log(map.get(key2)) // Outputs: 'value2'
 * ```
 */
export class TypedObjKeyedMap<KeyType, ValueType> extends Map<
  KeyType,
  ValueType
> {
  protected observablesMap: Map<
    string,
    {
      unserializedKey: KeyType
      value: ValueType
    }
  > = new Map()

  constructor(entries?: readonly (readonly [KeyType, ValueType])[] | null) {
    super()
    if (entries) {
      entries.forEach(([key, value]) => this.set(key, value))
    }
  }

  override get(key: KeyType): ValueType | undefined {
    return this.observablesMap.get(canonicalSerialization(key))?.value
  }

  override set(key: KeyType, value: ValueType) {
    this.observablesMap.set(canonicalSerialization(key), {
      unserializedKey: key,
      value,
    })
    return this
  }

  override delete(key: KeyType) {
    return this.observablesMap.delete(canonicalSerialization(key))
  }

  override clear() {
    this.observablesMap.clear()
  }

  override has(key: KeyType): boolean {
    return this.observablesMap.has(canonicalSerialization(key))
  }

  override get size(): number {
    return this.observablesMap.size
  }

  protected getUnserializedMap(): Map<KeyType, ValueType> {
    const newMap = new Map<KeyType, ValueType>()
    this.observablesMap.forEach((value, key) =>
      newMap.set(value.unserializedKey, value.value)
    )
    return newMap
  }

  override [Symbol.iterator]() {
    return this.getUnserializedMap().entries()
  }

  override keys() {
    return this.getUnserializedMap().keys()
  }

  override values(): MapIterator<ValueType> {
    return this.getUnserializedMap().values()
  }

  override entries(): MapIterator<[KeyType, ValueType]> {
    return this.getUnserializedMap().entries()
  }

  override forEach(
    callbackfn: (
      value: ValueType,
      key: KeyType,
      map: Map<KeyType, ValueType>
    ) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ): void {
    this.getUnserializedMap().forEach(callbackfn, thisArg ?? this)
  }
}
