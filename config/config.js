module.exports = {
  PORT: process.env.PORT,
  AUTH_TOKENS: process.env.AUTH_TOKENS ? process.env.AUTH_TOKENS.split(',') : [],
  DB: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: process.env.DB_MAX_CONNECTIONS,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT
  }
}
