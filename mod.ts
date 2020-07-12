/*!
 * Based on https://github.com/tj/node-delegates/blob/master/index.js
 * Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright (c) 2020 Henry Zhuang
 * MIT Licensed
 */

export function delegates(proto: any, target: string): Delegator {
  return new Delegator(proto, target);
}

export class Delegator {
  private proto: any;
  private target: string;

  private methods: string[] = [];
  private getters: string[] = [];
  private setters: string[] = [];

  constructor(proto: any, target: string) {
    this.proto = proto;
    this.target = target;
  }

  /**
   * Delegate method `name`.
   *
   * @param {String} name
   * @return {Delegator} self
   * @api public
   */

  method(name: string): Delegator {
    const proto = this.proto as any;
    const target = this.target;
    this.methods.push(name);

    proto[name] = function (...argv: any) {
      return this[target][name].apply(this[target], argv);
    };

    return this;
  }

  /**
   * Delegator accessor `name`.
   *
   * @param {String} name
   * @return {Delegator} self
   * @api public
   */

  access(name: string) {
    return this.getter(name).setter(name);
  }

  /**
   * Delegator getter `name`.
   *
   * @param {String} name
   * @return {Delegator} self
   * @api public
   */

  getter(name: string): Delegator {
    const proto = this.proto as any;
    const target = this.target;
    this.getters.push(name);

    // https://github.com/Microsoft/TypeScript/issues/16016
    proto.__defineGetter__(name, function (this: any) {
      return this[target] ? this[target][name] : undefined;
    });

    return this;
  }

  /**
   * Delegator setter `name`.
   *
   * @param {String} name
   * @return {Delegator} self
   * @api public
   */

  setter(name: string): Delegator {
    const proto = this.proto as any;
    const target = this.target;
    this.setters.push(name);

    proto.__defineSetter__(name, function (this: any, val: any) {
      return this[target][name] = val;
    });

    return this;
  }
}
