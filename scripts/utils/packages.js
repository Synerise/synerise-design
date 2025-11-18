const { smush, validateIsString } = require('./string')

const npmScope = '@synerise'
const packagePrefix = 'ds-'

const toPackageName = str => {
  validateIsString(str)
  return `${npmScope}/${packagePrefix}${smush(str)}`
}


module.exports = {
  toPackageName,
}
