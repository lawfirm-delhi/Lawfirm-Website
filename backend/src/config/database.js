const knex = require('knex');
const env = require('./env');
const path = require('path');

const isPostgres = env.DB_CLIENT === 'pg' || env.DB_CLIENT === 'postgresql';

const dbConfig = {
  client: isPostgres ? 'pg' : 'sqlite3',
  connection: isPostgres 
    ? { 
        connectionString: env.DATABASE_URL, 
        ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false 
      }
    : { filename: path.resolve(__dirname, '../../', env.DB_PATH) },
  useNullAsDefault: !isPostgres,
  migrations: {
    directory: path.resolve(__dirname, '../db/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '../db/seeds'),
  }
};

const db = knex(dbConfig);

module.exports = {
  db,
  dbConfig
};
