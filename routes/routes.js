const express = require('express')
const router = express.Router()
const isAuthorized = require('../middlewares/isAuthorizedChecker')
const constants = require('../config/constants')
const BASE_URL = constants.BASE_URL
const v1Routes = require('./v1')

// Other routing files
router.use(v1Routes)

// server up test route
router.get(BASE_URL + '/ping', (req, res) => res.status(200).send('Pong'))
// db connection check API
router.get(BASE_URL + '/db/version', isAuthorized, require('../api/controllers/dbInformation/version'))
// ON NO ROUTE MATCH
router.get('*', (req, res) => {
  // console.log("no route found,throwing 404 error." + req.url);
  res.status(404).send('404 PAGE not found >' + req.url + '<<')
})
module.exports = router
