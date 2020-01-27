'use strict'
const app = require('express')()

// LOAD ENV FILE START ==================================================
global.absolutePath = __dirname
if (!process.env.NODE_ENV) require('dotenv').config({ path: absolutePath + '/.env' })
// LOAD ENV FILE END ====================================================

// GLOBAL DEPENDENCIES START ============================================
global.q = require('q')
global._ = require('underscore')
const Validator = require('jsonschema').Validator
global.v = new Validator()
// GLOBAL DEPENDENCIES END ==============================================

// LOCAL DEPENDENCIES START==============================================
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const v1Routes = require('./routes/v1')
const headersManipulator = require('./middlewares/headersManipulator')
const constants = require('./config/constants')
const BASE_URL = constants.BASE_URL
// LOCAL DEPENDENCIES END ===============================================

// APP.USE START ========================================================
// for removing headers in response(security)
app.use(helmet())
app.set('etag', false)
app.use(headersManipulator.removeHeaders)

// for req body
app.use(cors())
app.use(bodyParser.raw({
  limit: '50mb'
}))
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

// PROCESS.ON START ================================================
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
})
process.on('uncaughtException', err => {
  console.log('-----uncaughtException----- ', err)
})
// PROCESS.ON END ================================================

// for error handling
app.use((err, req, res, next) => {
  console.log('-----Something broke!---', err)
  res.status(500).send('Something broke!')
})

// APP.USE END ==========================================================

// ============ SERVING APIs START ============
app.use(v1Routes)
// server up test route
app.get(BASE_URL + '/ping', (req, res) => res.status(200).send('Pong'))
// ON NO ROUTE MATCH
app.get('*', (req, res) => {
  // console.log("no route found,throwing 404 error." + req.url);
  res.status(404).send('404 PAGE not found >' + req.url + '<<')
})
// ============ SERVING APIs END ============

// SERVER PORT SECTION START =======================================
let port = process.env.PORT || 9010
let server = app.listen(port)
let environment = process.env.NODE_ENV
server.timeout = 3600000

module.exports = exports
module.exports = app // for testing

console.log('API is running on port ', '\x1b[34m' + port + '\x1b[0m', ' in', '\x1b[33m' + environment + '\x1b[0m', 'environment')
console.log('try this:\ncurl http://localhost:' + port + BASE_URL + '/ping')
// SERVER PORT SECTION END =======================================
