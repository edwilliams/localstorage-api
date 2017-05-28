import test from 'ava'
import ls from './index'

test('set / get an object', t => {
  ls.set('test1', 123)
  t.is( ls.get('test1'), 123 )
})

test('deep set an object - 1 level deep', t => {
  ls.set('test0.test1', 123)
  var obj = ls.get('test0')
  t.is( obj.test1, 123 )
})

test('deep set an object - 2 levels deep', t => {
  ls.set('test0.test1.test2', 123)
  var obj = ls.get('test0')
  t.is( obj.test1.test2, 123 )
})

test('set a property on an existing object', t => {
  ls.set('test0.test1.test2', 123)
  ls.set('test0.test1.test3', 456)

  // should be: { test1: { test2: 123, test3: 456 } }
  var obj = ls.get('test0')

  t.is( 123, 123 )
  t.is( obj.test1.test2, 123 )
  t.is( obj.test1.test3, 456 )
})

// ls.set('account.user.age', 33)
// ls.set('account.user.height', '198cm')
// console.log( ls.get('account.user.height') )
// console.log( ls.localStorage )
