module.exports = {
  'PORT': process.env.PORT,
  'AUTH_TOKENS': process.env.AUTH_TOKENS ? process.env.AUTH_TOKENS.split(',') : []
}
