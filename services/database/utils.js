const DbOperations = require('./operations')
const pm = require('./poolManager')
const dbOperations = new DbOperations(pm)

class DbInformation {
  version () {
    const version = q.defer()
    dbOperations.find('select version()')
      .then(data => version.resolve(data))
      .catch(err => version.reject(err))
    return version.promise
  }
}

module.exports = { DbInformation }
