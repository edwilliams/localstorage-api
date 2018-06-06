'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// http://stackoverflow.com/a/20240290/2102042
var setValue = function setValue(object, path, value) {
  var a = path.split('.');
  var o = object;
  for (var i = 0; i < a.length - 1; i++) {
    var n = a[i];
    if (n in o) {
      o = o[n];
    } else {
      o[n] = {};
      o = o[n];
    }
  }
  o[a[a.length - 1]] = value;
};

// http://stackoverflow.com/a/20240290/2102042
var getValue = function getValue(object, path) {
  var o = object;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  var a = path.split('.');
  while (a.length) {
    var n = a.shift();
    if (n in o) {
      o = o[n];
    } else {
      return;
    }
  }
  return o;
};

var get = function get(path) {

  if (path.indexOf('.') !== -1) {

    var lsPath = path.split('.')[0];

    if (localStorage[lsPath] === undefined) {
      return null;
    } else {
      var obj = JSON.parse(localStorage[lsPath]);
      var objPath = path.split('.').slice(1).join('.');
      return getValue(obj, objPath);
    }
  } else {
    try {
      return JSON.parse(localStorage[path]);
    } catch (err) {
      return localStorage[path];
    }
  }
};

var set = function set(path, value) {

  if (path.indexOf('.') !== -1) {

    var lsPath = path.split('.')[0];
    var obj = {};

    try {
      obj = JSON.parse(localStorage[lsPath]);
    } catch (err) {}

    var objPath = path.split('.').slice(1).join('.');

    setValue(obj, objPath, value);

    localStorage[lsPath] = JSON.stringify(obj);
  } else {
    localStorage[path] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? JSON.stringify(value) : value;
  }
};

var has = function has(str) {
  return !!get(str);
};

var remove = function remove() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (item) {
    localStorage.removeItem(item);
  });
};

var clear = function clear() {
  localStorage.clear();
};

module.exports = {
  get: get,
  set: set,
  has: has,
  remove: remove,
  clear: clear
};
