import { gte } from 'ember-compatibility-helpers';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import Ember from 'ember';

const NEEDS_CUSTOM_ORDERED_SET = gte('3.5.0-alpha.1');

let OrderedSet;

if (NEEDS_CUSTOM_ORDERED_SET) {
  /**
  @class OrderedSet
  @constructor
  */
  OrderedSet = class OrderedSet {
    constructor() {
      this.clear();
    }

    /**
    @method create
    @static
    @return {OrderedSet}
    */
    static create() {
      let Constructor = this;
      return new Constructor();
    }

    /**
    @method clear
    */
    clear() {
      this.presenceSet = Object.create(null);
      this.list = [];
      this.size = 0;
    }

    /**
    @method add
    @param {*} obj
    @param {string} [_guid] (for internal use)
    @return {OrderedSet}
    */
    add(obj, _guid) {
      let guid = _guid || guidFor(obj);
      let presenceSet = this.presenceSet;
      let list = this.list;

      if (presenceSet[guid] !== true) {
        presenceSet[guid] = true;
        this.size = list.push(obj);
      }

      return this;
    }

    /**
    @method delete
    @param {*} obj
    @param {string} [_guid] (for internal use)
    @return {Boolean}
    */
    delete(obj, _guid) {
      let guid = _guid || guidFor(obj);
      let presenceSet = this.presenceSet;
      let list = this.list;

      if (presenceSet[guid] === true) {
        delete presenceSet[guid];
        let index = list.indexOf(obj);
        if (index > -1) {
          list.splice(index, 1);
        }
        this.size = list.length;
        return true;
      } else {
        return false;
      }
    }

    /**
    @method isEmpty
    @return {Boolean}
    */
    isEmpty() {
      return this.size === 0;
    }

    /**
    @method has
    @param {*} obj
    @return {Boolean}
    */
    has(obj) {
      if (this.size === 0) { return false; }

      let guid = guidFor(obj);
      let presenceSet = this.presenceSet;

      return presenceSet[guid] === true;
    }

    /**
    @method forEach
    @param {Function} fn
    @param self
    */
    forEach(fn /*, ...thisArg*/) {
      assert(`${Object.prototype.toString.call(fn)} is not a function`, typeof fn === 'function')

      if (this.size === 0) { return; }

      let list = this.list;

      if (arguments.length === 2) {
        for (let i = 0; i < list.length; i++) {
          fn.call(arguments[1], list[i]);
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          fn(list[i]);
        }
      }
    }

    /**
    @method toArray
    @return {Array}
    */
    toArray() {
      return this.list.slice();
    }

    /**
    @method copy
    @return {OrderedSet}
    */
    copy() {
      let Constructor = this.constructor;
      let set = new Constructor();

      set.presenceSet = Object.create(null);

      for (let prop in this.presenceSet) {
        // hasOwnPropery is not needed because obj is Object.create(null);
        set.presenceSet[prop] = this.presenceSet[prop];
      }

      set.list = this.toArray();
      set.size = this.size;

      return set;
    }
  }
} else {
  OrderedSet = Ember.OrderedSet;
}

export default OrderedSet;
