import { describe, it, expect, expectTypeOf } from 'vitest'
import { typedObjectFromEntries } from '../src/typedObjectFromEntries'

describe('objectFromEntries', () => {
  it('should convert a Map into an object', () => {
    const map = new Map<string, string | number>([
      ['name', 'Alice'],
      ['age', 30],
    ])
    const result = typedObjectFromEntries(map)
    expect(result).toEqual({ name: 'Alice', age: 30 })
  })

  it('should convert an array of tuples into an object', () => {
    const tupleArray: readonly (readonly [string, number])[] = [
      ['a', 1],
      ['b', 2],
    ]
    const result = typedObjectFromEntries(tupleArray)
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle duplicate keys by keeping the last value', () => {
    const entries: [string, string][] = [
      ['status', 'pending'],
      ['status', 'completed'],
    ]
    const result = typedObjectFromEntries(entries)
    expect(result).toEqual({ status: 'completed' })
  })

  it('should return an empty object for an empty iterable', () => {
    const result = typedObjectFromEntries([])
    expect(result).toEqual({})
  })

  it('should strictly enforce string keys (TypeScript behavior)', () => {
    const entries = [
      ['key1', 1],
      [2, 'two'],
    ]

    // @ts-expect-error - number keys should throw type errors if function is strict
    const result = typedObjectFromEntries<string, string | number>(entries)
    expect(result).toHaveProperty('2')
  })

  it('infers type from parameters.', () => {
    const entries: Array<[string, string | number]> = [
      ['key1', 1],
      ['2', 'two'],
    ]
    const result = typedObjectFromEntries(entries)
    expectTypeOf(result).toEqualTypeOf<Record<string, string | number>>()
  })
})
