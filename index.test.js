import test from 'ava'
import ls from './index'

test('set / get an object', t => {
  ls.set('one', 123)
  t.is( ls.get('one'), 123 )
})

test('deep set an object - 1 level deep', t => {
  ls.set('zero.one', 123)
  var obj = ls.get('zero')
  t.is( typeof obj, 'object' )
  t.is( obj.one, 123 )
})

test('deep set an object - 2 levels deep', t => {
  ls.set('zero.one.two', 123)
  var obj = ls.get('zero')
  t.is( typeof obj, 'object' )
  t.is( typeof obj.one, 'object' )
  t.is( obj.one.two, 123 )
})

test('deep set an existing object - 1 level deep', t => {
  ls.set('zero.one', 123)
  ls.set('zero.one', 456)
  var zero = ls.get('zero')
  t.is( zero.one, 456 )
})

// NB cannot currently deep set an existing object - 2 levels deep
// PASS: ls.set('zero.one', 123)       => { one: 123 }
// PASS: ls.set('zero.one.two', 123)   => { one: { two: 123 } }
// FAIL: ls.set('zero.one.three', 123) => { one: { two: 123, three: 123 } }
