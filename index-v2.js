var localStorage = {}

// http://stackoverflow.com/a/20240290/2102042
function setValue(object, path, value) {
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
}

// http://stackoverflow.com/a/20240290/2102042
function getValue(object, path) {
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
}

function set(path, value) {
  if ( path.indexOf('.') !== -1 ) {
    var obj = {}
    var firstKey = path.split('.')[0]
    setValue(obj, path, value)
    localStorage[firstKey] = JSON.stringify(obj[firstKey])
  } else {
    localStorage[path] = value
  }
}

function get(path) {
  if ( path.indexOf('.') !== -1 ) {
    var obj = JSON.parse(localStorage[path.split('.')[0]])
    var path = path.split('.').slice(1).join('.')
    return JSON.parse(getValue( obj, path ))
  } else {
    return JSON.parse(getValue( localStorage, path))
  }
}

function has(str) {
  return ( get(str) ) ? true : false
}

function remove() {
  var args = Array.prototype.slice.call(arguments)
  args.forEach(function(item) { localStorage.removeItem(item) })
}

function clear() {
  localStorage.clear()
}

module.exports = {
  localStorage: localStorage,
  get: get,
  set: set,
  has: has,
  remove: remove,
  clear: clear
}

