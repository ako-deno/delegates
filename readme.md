# delegates

[![tag](https://img.shields.io/github/tag/ako-deno/delegates.svg)](https://github.com/ako-deno/delegates/tags)
![delegates-ci](https://github.com/ako-deno/delegates/workflows/delegates-ci/badge.svg)

Method and accessor delegation utilty for Deno. Based on `https://github.com/tj/node-delegates`.

# Usage

```js
import { delegates, Delegator } from "https://raw.githubusercontent.com/ako-deno/delegates/master/mod.ts";
```

## Example

```js
import { delegates } from "https://raw.githubusercontent.com/ako-deno/delegates/master/mod.ts";

const obj: any = {
  request: {
    get type() {
      return this._type.toUpperCase();
    },

    set type(val) {
      this._type = val;
    },
  }
};

delegates(obj, "request").setter("type").getter("type");

obj.type = "hey";
obj.type // "HEY"
```

## API

### delegates(proto: any, target: string): Delegator

Delegates getters, setters, values, and methods from targetProto to proto.
Assumes that targetProto objects will exist under proto objects with the key targetProp.

### Delegate#method(name)

Allows the given method `name` to be accessed on the host.

### Delegate#getter(name)

Creates a "getter" for the property with the given `name` on the delegated
object.

### Delegate#setter(name)

Creates a "setter" for the property with the given `name` on the delegated
object.

### Delegate#access(name)

Creates an "accessor" (ie: both getter *and* setter) for the property with the
given `name` on the delegated object.

# License

[MIT](./LICENSE)
