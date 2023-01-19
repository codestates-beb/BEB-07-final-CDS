// address	string	PK, NOT NULL
// lastBought	DATE		마지막으로 CDS를 구매한 날짜
// lastSold	DATE		마지막으로 CDS를 판매한 날짜
// sellerCount	INT	0부터 시작
// buyerCount	INT	0부터 시작
// createdAt	DATE	NOT NULL
// updatedAt	DATE	NOT NULL
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: 'unnamed',
        },
        soldCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        boughtCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        lastSold: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        lastBought: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Swap, {
      foreignKey: 'seller',
      sourceKey: 'address',
    });
    db.User.hasMany(db.Transaction, {
      foreignKey: 'seller',
      sourceKey: 'address',
    });
    db.User.hasMany(db.Transaction, {
      foreignKey: 'buyer',
      sourceKey: 'address',
    });
  }
};
