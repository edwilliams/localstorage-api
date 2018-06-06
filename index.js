// http://stackoverflow.com/a/20240290/2102042
var setValue = (object, path, value) => {
  var a = path.split('.')
  var o = object
  for (var i = 0; i < a.length - 1; i++) {
    var n = a[i]
    if (n in o) {
      o = o[n]
    } else {
      o[n] = {}
      o = o[n]
    }
  }
  o[a[a.length - 1]] = value
}

// http://stackoverflow.com/a/20240290/2102042
var getValue = (object, path) => {
  var o = object
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')
  var a = path.split('.')
  while (a.length) {
    var n = a.shift()
    if (n in o) {
      o = o[n]
    } else {
      return
    }
  }
  return o
}

var get = path => {

  if ( path.indexOf('.') !== -1 ) {

    var lsPath = path.split('.')[0]

    if ( localStorage[lsPath] === undefined ) {
      return null
    } else {
      let obj = JSON.parse(localStorage[lsPath])
      let objPath = path.split('.').slice(1).join('.')
      return getValue( obj, objPath )
    }

  } else {
    try {
      return JSON.parse(localStorage[path])
    } catch (err) {
      return localStorage[path]
    }
  }

}

var set = (path, value) => {

  if ( path.indexOf('.') !== -1 ) {

    var lsPath = path.split('.')[0]
    var obj = {}

    try {
      obj = JSON.parse(localStorage[lsPath])
    } catch (err) {}

    var objPath = path.split('.').slice(1).join('.')

    setValue(obj, objPath, value)

    localStorage[lsPath] = JSON.stringify(obj)

  } else {
    localStorage[path] = (typeof value === 'object') ? JSON.stringify(value) : value
  }

}

var has = str => !!get(str)

var remove = (...args) => { args.forEach(item => { localStorage.removeItem(item) }) }

var clear = () => { localStorage.clear() }

module.exports = {
  get: get,
  set: set,
  has: has,
  remove: remove,
  clear: clear
}
