'use strict';

const { Aigle } = require('./aigle');
const { AigleEachArray, AigleEachObject } = require('./internal/aigleEach');

class MapValuesArray extends AigleEachArray {

  constructor(array, iterator) {
    super(array, iterator);
    if (this._rest === 0) {
      this._value = {};
    } else {
      this._result = {};
    }
  }

  _callResolve(value, index) {
    this._result[index] = value;
    if (--this._rest === 0) {
      this._resolve(this._result);
    }
  }
}

class MapValuesObject extends AigleEachObject {

  constructor(object, iterator) {
    super(object, iterator);
    if (this._rest === 0) {
      this._value = {};
    } else {
      this._result = {};
    }
  }

  _callResolve(value, index) {
    this._result[this._keys[index]] = value;
    if (--this._rest === 0) {
      this._resolve(this._result);
    }
  }
}

module.exports = mapValues;

function mapValues(collection, iterator) {
  if (Array.isArray(collection)) {
    return new MapValuesArray(collection, iterator)._iterate();
  }
  if (collection && typeof collection === 'object') {
    return new MapValuesObject(collection, iterator)._iterate();
  }
  return Aigle.resolve({});
}