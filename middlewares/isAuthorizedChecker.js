const tokens = require('../config/config').AUTH_TOKENS
const isAuthorized = (req, res, next) => {
  if (_.contains(tokens, req.headers.authorization)) {
    next()
  } else {
    res.status(401).send({
      code: 'E0001',
      message: 'Unauthorized access!'
    })
  }
}

module.exports = isAuthorized
