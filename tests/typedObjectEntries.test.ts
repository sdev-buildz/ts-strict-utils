import { describe, expect, expectTypeOf, it } from 'vitest'
import { typedObjectEntries } from '../src/typedObjectEntries'

describe('typedObjectEntries', () => {
  it('provides same result as Object.entries', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(typedObjectEntries(obj)).toEqual(Object.entries(obj))
  })

  it('strictly enforces types from generic arguments', () => {
    const obj = { isActive: true, score: 100 }

    // @ts-expect-error - should throw type error.
    typedObjectEntries<Record<string, string>>(obj)
  })

  it('infers correct tuple types for keys and values', () => {
    const obj = { isActive: true, score: 100 }

    expectTypeOf(typedObjectEntries(obj)).toEqualTypeOf<
      NonNullable<['isActive', boolean] | ['score', number]>[]
    >()
  })
})
