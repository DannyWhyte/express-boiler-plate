const pg = require('pg')
const dbConfig = require('../../config/config').DB

class PoolManager {
  constructor (config) {
    this.pool = {}
    this.createPool(config)
  }

  createPool (config) {
    this.pool = new pg.Pool(config)
  }

  reloadPool () {
    try {
      this.pool.end()
    } catch (error) {
      console.log('pool already closed')
    } finally {
      this.createPool()
    }
  }
}

const poolManager = new PoolManager(dbConfig)

class DbOperations {
  get () {
    const queryResult = q.defer()
    if (!query) return queryResult.reject()
    return queryResult.resolve
  }
}

const query = qry => {
  const deferred = q.defer()
  if (qry === null) {
    return deferred.reject('No Query Found')
  }
  if (poolManager.pool.ending) poolManager.createPool()
  poolManager.pool.connect()
    .then(client => {
      client.query("SET statement_timeout = '1800s';")
      client.query(qry)
        .then(res => {
          console.log('got db response')
          client.release()
          deferred.resolve(res.rows)
        })
        .catch(e => {
          client.release()
          // console.error('query error in', e.code, 'dwedfrfqfqf', e.message, e.stack)
          if (e.code === '42P01') {
            // console.log("inside if", err)
            deferred.reject({
              code: e.code,
              message: 'idle client error'
            })
          } else {
            deferred.reject('idle client error', e.message, e.stack)
          }
        })
    }).catch(e => {
      console.error('query error out', e.message, e.stack)
      poolManager.reloadPool()
      deferred.reject(e)
    })
  return deferred.promise
}

function insertQuery (qry) {
  const deferred = q.defer()
  if (qry === null) {
    return deferred.reject('No Query Found')
  }
  if (poolManager.pool.ending) poolManager.createPool()
  poolManager.pool.connect()
    .then(client => {
      client.query(qry)
        .then(res => {
          client.release()
          deferred.resolve(res)
        })
        .catch(e => {
          client.release()
          console.error('query error in', e.message, e.stack)
          deferred.reject(e.message)
        })
    }).catch(e => {
      poolManager.reloadPool()
      console.error('query error out', e.message, e.stack)
      deferred.reject(e.message)
    })
  return deferred.promise
}

module.exports.query = query
module.exports.insertQuery = insertQuery
