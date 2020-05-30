import {
  assert,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { delegates, Delegator } from "../mod.ts";

const { test } = Deno;

test(".method(name) should delegate methods", function () {
  const obj: any = {};

  obj.request = {
    foo: function (bar: string): string {
      assert(this == obj.request);
      return bar;
    },
  };

  const d = delegates(obj, "request").method("foo");
  assert(d instanceof Delegator);
  assertEquals(obj.foo("something"), "something");
});

test(".getter(name) should delegate getters", function () {
  const obj: any = {};

  obj.request = {
    get type(): string {
      return "text/html";
    },
  };

  const d = delegates(obj, "request").getter("type");
  assert(d instanceof Delegator);
  assertEquals(obj.type, "text/html");
});

test(".setter(name) should delegate setters", function () {
  const obj: any = {};

  obj.request = {
    get type() {
      return this._type.toUpperCase();
    },

    set type(val) {
      this._type = val;
    },
  };

  const d = delegates(obj, "request").setter("type");
  assert(d instanceof Delegator);

  obj.type = "hey";
  assertEquals(obj.request.type, "HEY");
});

test(".access(name) should delegate getters and setters", function () {
  const obj: any = {};

  obj.request = {
    get type() {
      return this._type.toUpperCase();
    },

    set type(val) {
      this._type = val;
    },
  };

  const d = delegates(obj, "request").access("type");
  assert(d instanceof Delegator);

  obj.type = "hey";
  assertEquals(obj.type, "HEY");
});
