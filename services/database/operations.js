class ClientProvider {
  constructor (poolManager) {
    this.pm = poolManager
    this.client = {}
  }

  getClient () {
    const client = q.defer()
    if (this.pm.pool.ending) this.pm.createPool()
    this.pm.pool.connect()
      .then(fetchedClient => { this.client = fetchedClient; client.resolve(true) })
      .catch(err => client.reject(err))
    return client.promise
  }

  releaseClient () {
    this.client.release()
  }
}

class DbOperations {
  constructor (poolManager) {
    this.pm = poolManager
  }

  find (query) {
    const cp = new ClientProvider(this.pm)
    const queryResult = q.defer()
    if (!query) return queryResult.reject()
    cp.getClient()
      .then(() => cp.client.query("SET statement_timeout = '1800s';"))
      .then(() => cp.client.query(query))
      .then(res => {
        cp.releaseClient()
        queryResult.resolve(res.rows)
      })
      .catch(err => queryResult.reject(err))
    return queryResult.promise
  }
}
module.exports = DbOperations
