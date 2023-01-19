const Sequelize = require('sequelize');
const User = require('./user');
const Swap = require('./swap');
const Transaction = require('./transaction');

const getEnv = require('../utils/getEnv');

const env = getEnv('NODE_ENV', 'development');
const config = require('../config/dbconfig')[env];

const sequelize = new Sequelize(
  config.database,
  config.usename,
  config.password,
  config,
);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Swap = Swap;
db.Transaction = Transaction;

User.init(sequelize);
Swap.init(sequelize);
Transaction.init(sequelize);

User.associate(db);
Swap.associate(db);
Transaction.associate(db);

module.exports = db;
