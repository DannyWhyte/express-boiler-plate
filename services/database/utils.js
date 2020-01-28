const dbConnectionProvider = require('./handler')

class DbInformation {
  version () {
    const version = q.defer()
    dbConnectionProvider.query('select version()')
      .then(data => version.resolve(data))
      .catch(err => version.reject(err))
    return version.promise
  }
}

module.exports = { DbInformation }
