const Sequelize = require('sequelize');

module.exports = class Transaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        txHash: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        swapId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        blockNum: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Transaction',
        tableName: 'transactions',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Transaction.belongsTo(db.Swap, {
      foreignKey: 'swapId',
      sourceKey: 'swapId',
    });
  }
};
