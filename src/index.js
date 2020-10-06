const get = key => {
  if (key.indexOf('.') < 0) {
    return localStorage[key] ? JSON.parse(localStorage[key]) : null
  } else {
    const keys = key.split('.')

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
          `localstorage-api unable to get localStorage at ${keys.length} levels deep. limited to 5`
        )
        break
    }
  }
}

const set = (key, val) => {
  if (!key.includes('.')) {
    localStorage[key] = JSON.stringify(val)
  } else {
    const keys = key.split('.')

    const currVal = localStorage[keys[0]] ? JSON.parse(localStorage[keys[0]]) : {}

    switch (keys.length) {
      case 2:
        localStorage[keys[0]] = JSON.stringify({
          ...currVal,
          ...{ [keys[1]]: val }
        })
        break
      case 3:
        localStorage[keys[0]] = JSON.stringify({
          ...currVal,
          ...{ [keys[1]]: { [keys[2]]: val } }
        })
        break
      case 4:
        localStorage[keys[0]] = JSON.stringify({
          ...currVal,
          ...{ [keys[1]]: { [keys[2]]: { [keys[3]]: val } } }
        })
        break
      case 5:
        localStorage[keys[0]] = JSON.stringify({
          ...currVal,
          ...{ [keys[1]]: { [keys[2]]: { [keys[3]]: { [keys[4]]: val } } } }
        })
        break
      case 6:
        localStorage[keys[0]] = JSON.stringify({
          ...currVal,
          ...{
            [keys[1]]: {
              [keys[2]]: { [keys[3]]: { [keys[4]]: { [keys[5]]: val } } }
            }
          }
        })
        break
      default:
        throw new Error(
          `localstorage-api unable to get localStorage at ${keys.length} levels deep. limited to 5`
        )
        break
    }
  }
}

const remove = (...args) => {
  if (args.some(str => str.indexOf('.') >= 0)) {
    console.warn('localstorage-api ignores dot notation and removes entire row from localStorage')
  } else {
    args.forEach(item => {
      localStorage.removeItem(item)
    })
  }
}

const has = str => (get(str) ? true : false)

const clear = () => {
  localStorage.clear()
}

module.exports = { get, set, has, remove, clear }
