<h1 align="center">
ts-strict-utils
</h1>

<p align="center">
Utilities for TypeScript. Includes stricter built-ins, map that accepts objects as keys, etc...
</p>

## 🚀 Features

- **TypedObjKeyedMap** - A typed Map data structure that accepts objects as keys, where keys are compared based on deep structural equality.
- **StrictOmit** - An Utility type that enforces omitted keys to exist on the original type, with full IDE auto-completion support.
- **StrictExtract** - An Utility type that enforces extracted keys to exist on the original type, with full IDE auto-completion support.
- **typedObjectEntries** - A strongly typed version of Object.entries.
- **typedObjectFromEntries** - A strongly typed version of Object.fromEntries.

## 📦 Installation

```sh
npm install ts-strict-utils
```

## 💻 Usage Examples

### TypedObjKeyedMap

A typed Map data structure that accepts objects as keys, where keys are compared based on deep structural equality. This allows objects with different key ordering to be considered the same, and it also supports objects containing circular references. Internally, it uses [serialize-javascript](https://www.npmjs.com/package/serialize-javascript) to handle objects containing Dates, RegExp, functions, etc...

```ts
import { TypedObjKeyedMap } from 'ts-strict-utils';

type ObjKeyType = {
  a: string
  b: number
  c: {
    d: string
  }
}

const key1 = { a: 'a', b: 1, c: { d: 'd' } }
const key2 = { a: 'different', b: 2, c: { d: 'random' } }
const key3 = { b: 1, a: 'a', c: { d: 'd' } }
// key3 is structurally the same as key1.
//  But they don't share the same reference.

// Outputs: false
console.log(Object.is(key1, key3))

const map = new TypedObjKeyedMap<ObjKeyType, string>(),

map.set(key1, 'value1')
map.set(key2, 'value2')
map.set(key3, 'value3')
// key3 overwrites key1's entry. Because they are structurally equal.

console.log(map.get(key1)) // Outputs: 'value3'
console.log(
  map.get(key2)
) // Outputs: 'value2'
```

### StrictOmit

An Utility type that enforces omitted keys to exist on the original type, with full IDE auto-completion support.

```ts
import { StrictOmit } from 'ts-strict-utils'

type Original = 'strict' | 'utils' | 'type'

//   Doesn't throw even if 'stryct' is spelled incorrectly.
//      Also doesn't provide autocompletion.
type WithNormalOmit = Omit<Original, 'utils' | 'stryct'>

//   Throws: Type '"stryct"' does not satisfy the constraint 'strict' | 'utils' | 'type'.
//        Provides autocompletion.
type WithStrictOmit = StrictOmit<Original, 'utils' | 'stryct'>
```

### StrictExtract

An Utility type that enforces extracted keys to exist on the original type, with full IDE auto-completion support.

```ts
import { StrictExtract } from 'ts-strict-utils'

type Original = 'strict' | 'utils' | 'type'

//  Doesn't throw even if 'stryct' is spelled incorrectly.
//  Also doesn't provide autocompletion.
type WithNormalExtract = Extract<Original, 'utils' | 'stryct'>

//  Throws: Type '"stryct"' does not satisfy the constraint 'strict' | 'utils' | 'type'.
//  Provides autocompletion.
type WithStrictExtract = StrictExtract<Original, 'utils' | 'stryct'>
```

## 👥 Community & Support

- 💬 _**Have an idea?**_ Suggest new features in [GitHub Discussions](../..//discussions).

- 🚀 _**Support me or my projects**_ through [donations](https://buymeacoffee.com/stevenx.dev).

- 💼 _**Need custom work or consultation?**_ I am available for hire! Reach out via [email](mailto:stevexdev@zohomail.in).
