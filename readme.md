# localStorage API

> Access local storage with a dot notation (e.g. `ls.get('some.object.here')`)

## Install

```
$ npm install localstorage-api --save
```

## Usage

#### Install

`import ls from 'localstorage-api'` or `var ls = require('localstorage-api')`

#### Set

To set a simple key / value in localStorage:

`ls.set('some', { object: 123 })`

If you check the browsers localStorage you will now see

| key    | value                |
|--------|----------------------|
| `some` | `{ "object": 123 }`  |

#### Get

To retrive this value:

```
ls.get('some')        // => { object: 123 }
ls.get('some.object') // => 123`
```

#### Has

To check a value:
```
ls.has('some')        // => true
ls.has('some.object') // => true
ls.has('some.thing')  // => false
```

#### Remove

To remove the key / value pair from localStorage:

`ls.remove('some')`

#### Clear

To clear all localStorage:

`ls.clear()`

## License

MIT © [Ed Williams](http://edwilliams.github.io)
