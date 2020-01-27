// some header for request logging
const someHeaderMw = (req, res, next) => {
  // code to log into some file or logging app
  next()
}

// for removing headers for security purpose
const removeHeaders = (req, res, next) => {
  res.removeHeader('Transfer-Encoding')
  res.removeHeader('X-Powered-By')
  next()
}

module.exports = { someHeaderMw, removeHeaders }
