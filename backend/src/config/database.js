const knex = require('knex');
const env = require('./env');
const path = require('path');

const isPostgres = env.DB_CLIENT === 'pg' || env.DB_CLIENT === 'postgresql';
const isMysql = env.DB_CLIENT === 'mysql2' || env.DB_CLIENT === 'mysql';
const isSqlite = !isPostgres && !isMysql;

let connectionConfig;
if (isPostgres) {
  connectionConfig = {
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else if (isMysql) {
  // mysql2 accepts the URI string directly
  connectionConfig = env.DATABASE_URL;
} else {
  connectionConfig = { filename: path.resolve(__dirname, '../../', env.DB_PATH) };
}

const dbConfig = {
  client: env.DB_CLIENT,
  connection: connectionConfig,
  useNullAsDefault: isSqlite,
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
