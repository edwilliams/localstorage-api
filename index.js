'use strict'

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
      })
    }
  }
  return target
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}

var get = function get(key) {
  if (key.indexOf('.') < 0) {
    return localStorage[key] ? JSON.parse(localStorage[key]) : null
  } else {
    var keys = key.split('.')

    switch (keys.length) {
      case 2:
        try {
          return JSON.parse(localStorage[keys[0]])[keys[1]]
        } catch (err) {
          return null
        }

        break

      case 3:
        try {
          return JSON.parse(localStorage[keys[0]])[keys[1]][keys[2]]
        } catch (err) {
          return null
        }

        break

      case 4:
        try {
          return JSON.parse(localStorage[keys[0]])[keys[1]][keys[2]][keys[3]]
        } catch (err) {
          return null
        }

        break

      case 5:
        try {
          return JSON.parse(localStorage[keys[0]])[keys[1]][keys[2]][keys[3]][keys[4]]
        } catch (err) {
          return null
        }

        break

      case 6:
        try {
          return JSON.parse(localStorage[keys[0]])[keys[1]][keys[2]][keys[3]][keys[4]][keys[5]]
        } catch (err) {
          return null
        }

        break

      default:
        throw new Error(
          'localstorage-api unable to get localStorage at '.concat(
            keys.length,
            ' levels deep. limited to 5'
          )
        )
        break
    }
  }
}

var set = function set(key, val) {
  if (!key.includes('.')) {
    localStorage[key] = JSON.stringify(val)
  } else {
    var keys = key.split('.')
    var currVal = localStorage[keys[0]] ? JSON.parse(localStorage[keys[0]]) : {}

    switch (keys.length) {
      case 2:
        localStorage[keys[0]] = JSON.stringify(
          _objectSpread(_objectSpread({}, currVal), _defineProperty({}, keys[1], val))
        )
        break

      case 3:
        localStorage[keys[0]] = JSON.stringify(
          _objectSpread(
            _objectSpread({}, currVal),
            _defineProperty({}, keys[1], _defineProperty({}, keys[2], val))
          )
        )
        break

      case 4:
        localStorage[keys[0]] = JSON.stringify(
          _objectSpread(
            _objectSpread({}, currVal),
            _defineProperty(
              {},
              keys[1],
              _defineProperty({}, keys[2], _defineProperty({}, keys[3], val))
            )
          )
        )
        break

      case 5:
        localStorage[keys[0]] = JSON.stringify(
          _objectSpread(
            _objectSpread({}, currVal),
            _defineProperty(
              {},
              keys[1],
              _defineProperty(
                {},
                keys[2],
                _defineProperty({}, keys[3], _defineProperty({}, keys[4], val))
              )
            )
          )
        )
        break

      case 6:
        localStorage[keys[0]] = JSON.stringify(
          _objectSpread(
            _objectSpread({}, currVal),
            _defineProperty(
              {},
              keys[1],
              _defineProperty(
                {},
                keys[2],
                _defineProperty(
                  {},
                  keys[3],
                  _defineProperty({}, keys[4], _defineProperty({}, keys[5], val))
                )
              )
            )
          )
        )
        break

      default:
        throw new Error(
          'localstorage-api unable to get localStorage at '.concat(
            keys.length,
            ' levels deep. limited to 5'
          )
        )
        break
    }
  }
}

var remove = function remove() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key]
  }

  if (
    args.some(function (str) {
      return str.indexOf('.') >= 0
    })
  ) {
    console.warn('localstorage-api ignores dot notation and removes entire row from localStorage')
  } else {
    args.forEach(function (item) {
      localStorage.removeItem(item)
    })
  }
}

var has = function has(str) {
  return get(str) ? true : false
}

var clear = function clear() {
  localStorage.clear()
}

module.exports = {
  get: get,
  set: set,
  has: has,
  remove: remove,
  clear: clear
}
