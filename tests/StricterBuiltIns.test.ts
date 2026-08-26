import type { StrictExtract, StrictOmit } from '@ts-strict-utils'
import { describe, expectTypeOf, it, test } from 'vitest'

interface User {
  id: number
  name: string
  email: string
}
describe('StrictOmit', () => {
  test('StrictOmit removes specified keys correctly', () => {
    type Result = StrictOmit<User, 'email'>

    expectTypeOf<Result>().toEqualTypeOf<{ id: number; name: string }>()
  })

  test('StrictOmit removes multiple specified keys correctly', () => {
    type Result = StrictOmit<User, 'name' | 'email'>

    expectTypeOf<Result>().toEqualTypeOf<{ id: number }>()
  })

  test('StrictOmit prevents omitting non-existent keys', () => {
    // @ts-expect-error: 'age' does not exist in User
    type InvalidOmit = StrictOmit<User, 'age'>

    // @ts-expect-error: 'invalidKey' does not exist in User
    type InvalidMixedOmit = StrictOmit<User, 'id' | 'invalidKey'>
  })
})

describe('StrictExtract', () => {
  it('should extract matching types correctly', () => {
    // Both strings match, should equal 'a' | 'b'
    expectTypeOf<StrictExtract<'a' | 'b' | 'c', 'a' | 'b'>>().toEqualTypeOf<
      'a' | 'b'
    >()
  })

  it('should exclude types that are not in U', () => {
    // Extracts numbers that are multiples of 2, excluding strings
    type Original = number | 'a' | 'b'
    expectTypeOf<StrictExtract<Original, number>>().toEqualTypeOf<number>()
  })

  it('should evaluate to never when nothing matches', () => {
    // @ts-expect-error - This causes a type error since extracted type is not in original type
    expectTypeOf<StrictExtract<'a' | 'b', 'c'>>().toEqualTypeOf<never>()
  })
  it('should guarantee U extends T at the type-level', () => {
    // @ts-expect-error - This causes a type error since 'number' does not extend 'string'
    type InvalidUsage = StrictExtract<string, number>
  })
})
