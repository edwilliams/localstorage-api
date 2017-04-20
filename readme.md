# localStorage API

> Access local storage with a dot notation (e.g. `ls.get('some.object.here')`)

## Install

```
$ npm install localstorage-api --save
```

## Usage

`import ls from 'localstorage-api'`
`ls.set('some', { object: 123 }) // stores: { some: { object: 123 }}`
`ls.get('some.object') // retreives 123`
`ls.has('some.object') // true`


## License

MIT © [Ed Williams](http://edwilliams.github.io)
