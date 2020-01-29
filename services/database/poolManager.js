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

module.exports = new PoolManager(dbConfig)
