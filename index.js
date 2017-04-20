function IsJsonObj(str) {
  try { JSON.parse(str) } catch (e) { return false }
  return true
}

function get(str) {

  var arr, strOne, strTwo

  arr = str.split('.')

  strOne = arr[0]

  if ( arr.length === 1 ) {
    if ( IsJsonObj( localStorage[strOne] ) ) {
      return JSON.parse(localStorage[strOne])
    } else {
      return localStorage[strOne]
    }
  }

  strTwo = arr.splice(1).join('.')

  try {
    return strTwo.split('.').reduce(function(a, b) {
      return a[b]
    }, JSON.parse(localStorage[strOne]))
  } catch (err) {
    console.warn('invalid key passed to localStorage')
  }

}

function set(key, val) {

  var val = ( typeof val === 'object' || Array.isArray(val) )
          ? JSON.stringify(val)
          : val

  localStorage.setItem( key, val )

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

export default {
  get: get,
  set: set,
  has: has,
  remove: remove,
  clear: clear
}
