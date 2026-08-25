import { beforeEach, describe, expect, it } from 'vitest'
import { TypedObjKeyedMap } from '../src/TypedObjectKeyedMap'

// Vitest Test Suite
describe('TypedObjKeyedMap', () => {
  let map: TypedObjKeyedMap<unknown, string>

  beforeEach(() => {
    map = new TypedObjKeyedMap()
  })

  it('accepts objects as keys', () => {
    const key = { b: 2, a: 1 }
    map.set(key, 'test-value')

    expect(map.get(key)).toBe('test-value')
    expect(map.has(key)).toBe(true)
  })

  it('accepts objects containing circular references as keys.', () => {
    const key = {
      c: 2,
      sibling: { c: 2 },
      v: 'str',
      parent: {
        toSibling: 2 as number | object,
        v: { toParent: {} as object },
        m: 5,
      },
      a: 1,
    }

    key.parent.toSibling = key.sibling
    key.parent.v.toParent = key.parent
    map.set(key, 'test-value')

    expect(map.get(key)).toBe('test-value')
    expect(map.has(key)).toBe(true)
  })

  it('acceps strings as keys.', () => {
    const key = 'test-key'
    map.set(key, 'test-value')

    expect(map.get(key)).toBe('test-value')
    expect(map.has(key)).toBe(true)
  })

  it('accepts numbers as keys.', () => {
    const key = 123
    map.set(key, 'test-value')

    expect(map.get(key)).toBe('test-value')
    expect(map.has(key)).toBe(true)
    expect(map.has('different-key')).not.toBe(true)
  })

  it('accepts functions as keys', () => {
    const key = () => {
      return { a: 1 }
    }
    map.set(key, 'test-value')

    expect(map.get(key)).toBe('test-value')
    expect(map.has(key)).toBe(true)
  })

  it('treats structurally identical keys with different field orders as identical', () => {
    const key1 = { b: 2, a: 1 }
    const key2 = { a: 1, b: 2 } // Different field order

    map.set(key1, 'first-value')

    expect(map.get(key2)).toBe('first-value') // Should resolve correctly
    expect(map.has(key2)).toBe(true)
  })

  it('correctly handles value overwrites for semantically identical keys', () => {
    const key1 = { x: 1, y: 2 }
    const key2 = { y: 2, x: 1 }

    map.set(key1, 'value-1')
    expect(map.get(key2)).toBe('value-1')

    map.set(key2, 'value-2')
    expect(map.get(key1)).toBe('value-2') // Should be updated
  })

  it('supports deletion of object keys regardless of field order', () => {
    const key1 = { id: 10, category: 'A' }
    const key2 = { category: 'A', id: 10 }

    map.set(key1, 'data')
    expect(map.delete(key2)).toBe(true)
    expect(map.has(key1)).toBe(false)
    expect(map.get(key1)).toBeUndefined()
  })

  it('returns false for unknown keys', () => {
    const key = { a: 1, b: 2 }
    expect(map.has(key)).toBe(false)
  })

  it('keys() returns keys in insertion order', () => {
    const keys = [
      { id: 10, category: 'A' },
      { category: 'B', id: 10 },
    ]

    for (const key of keys) map.set(key, 'data' + Math.random())

    expect(Array.from(map.keys())).toStrictEqual(keys)
  })

  it('values() returns values in insertion order', () => {
    const keys = [
      { id: 10, category: 'A' },
      { category: 'B', id: 10 },
    ]
    const values = ['data' + Math.random(), 'data' + Math.random()]

    for (let i = 0; i < keys.length; i++) map.set(keys[i], values[i]!)

    expect(Array.from(map.values())).toStrictEqual(values)
  })

  it('entries() returns keys and values in insertion order', () => {
    const keys = [
      { id: 10, category: 'A' },
      { category: 'B', id: 10 },
    ]
    const values = ['data' + Math.random(), 'data' + Math.random()]

    for (let i = 0; i < keys.length; i++) map.set(keys[i], values[i]!)

    expect(Array.from(map.entries())).toStrictEqual(
      keys.map((key, i) => [key, values[i]!])
    )
  })

  it('forEach calls cb for each entry in insertion order', () => {
    const keys = [
      { id: 10, category: 'A' },
      { category: 'B', id: 10 },
    ]
    const values = ['data' + Math.random(), 'data' + Math.random()]

    for (let i = 0; i < keys.length; i++) map.set(keys[i], values[i]!)

    let i = 0
    map.forEach((value, key) => {
      expect(value).toBe(values[i])
      expect(key).toBe(keys[i])
      i += 1
    })
  })

  it('duplicate keys are avoided', () => {
    const keys = [
      { id: 10, category: 'A' },
      { category: 'A', id: 10 },
    ]

    for (const key of keys) map.set(key, 'data' + Math.random())

    expect(Array.from(map.keys())).toStrictEqual([keys[0]])
  })

  it('clear() clears all keys', () => {
    const keys = [
      { id: 10, category: 'A' },
      { category: 'B', id: 10 },
    ]

    for (const key of keys) map.set(key, 'data' + Math.random())

    map.clear()
    expect(map.size).toStrictEqual(0)
  })

  it('serializes values robustly across diverse nested structures', () => {
    const key1 = {
      nested: {
        arr: [1, 2],
        toParent: {} as object,
        active: true,
        fun: () => {
          return { a: 1 }
        },
      },
    }
    key1.nested.toParent = key1.nested
    const key2 = {
      nested: {
        active: true,
        toParent: {} as object,
        fun: () => {
          return { a: 1 }
        },
        arr: [1, 2],
      },
    }
    key2.nested.toParent = key2.nested

    map.set(key1, 'nested-data')
    expect(map.get(key2)).toBe('nested-data')
  })
})
