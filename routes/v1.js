const express = require('express')
const router = express.Router()
const isAuthorized = require('../middlewares/isAuthorizedChecker')
const constants = require('../config/constants')
const BASE_URL_V1 = constants.BASE_URL + constants.V1
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../api/swagger/swagger.json')

// Swagger route
router.use(BASE_URL_V1 + '/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// TEST APIs
// placed here to demonstrate how seprate route file works
router.get(BASE_URL_V1 + '/checkAuthenticate', isAuthorized, (req, res) => res.status(200).send({ code: 'S0001', message: 'Authentication Successful' }))

module.exports = router
