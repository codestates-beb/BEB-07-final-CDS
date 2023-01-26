const Sequelize = require('sequelize');
const User = require('./user');

module.exports = class Swap extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        swapId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        initialAssetPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        premium: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        premiumInterval: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        totalPremiumRounds: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        seller: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        buyer: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        sellerDeposit: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        buyerDeposit: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        claimPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        liquidationPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(
            'pending',
            'active',
            'claimable',
            'expired',
            'overdue',
            'liquidated',
            'inactive',
          ),
          allowNull: false,
        },
        updatableStatus: {
          type: Sequelize.ENUM(
            'pending',
            'active',
            'expired',
            'overdue',
            'liquidated',
            'inactive',
          ),
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Swap',
        tableName: 'swaps',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Swap.belongsTo(db.User, { foreignKey: 'seller', targetKey: 'address' });
    db.Swap.belongsTo(db.User, { foreignKey: 'buyer', targetKey: 'address' });
    db.Swap.hasMany(db.Transaction, {
      foreignKey: 'swapId',
      sourceKey: 'swapId',
    });
  }
};
