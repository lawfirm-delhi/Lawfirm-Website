require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.REFRESH_SECRET || 'fallback-refresh-secret',
  DB_CLIENT: process.env.DB_CLIENT || 'sqlite3',
  DATABASE_URL: process.env.DATABASE_URL || '',
  DB_PATH: process.env.DB_PATH || process.env.DB_CONNECTION_FILENAME || './lawfirm.sqlite3',
};
