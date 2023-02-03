require('dotenv').config();
const getEnv = require('../utils/getEnv');

module.exports = {
  development: {
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: 'cds_dev2',
    host: getEnv('DB_HOST'),
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: 'cds-production1',
    host: getEnv('DB_HOST'),
    dialect: 'mysql',
  },
};
