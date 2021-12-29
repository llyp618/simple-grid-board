"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isObject = function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

var isArray = function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};

var canClone = function canClone(value) {
  return isObject(value) || isArray(value);
};

var cloneArray = function cloneArray(value) {
  var array = [];
  value.forEach(function (item, index) {
    if (canClone(item)) {
      array[index] = deepClone(item);
    } else {
      array[index] = item;
    }
  });
  return array;
};

var cloneObject = function cloneObject(value) {
  var obj = {};

  for (var item in value) {
    if (canClone(value[item])) {
      obj[item] = deepClone(value[item]);
    } else {
      if (value.hasOwnProperty(item)) {
        obj[item] = value[item];
      }
    }
  }

  return obj;
};

var deepClone = function deepClone(value) {
  if (!canClone(value)) {
    return value;
  }

  if (isArray(value)) {
    return cloneArray(value);
  } else if (isObject(value)) {
    return cloneObject(value);
  }

  return undefined;
};

var _default = deepClone;
exports.default = _default;