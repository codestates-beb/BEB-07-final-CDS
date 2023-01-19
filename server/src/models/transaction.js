// txhash	string	pk, not null
// blockHash	string	not null
// seller	string	FK
// buyer	string	FK
// blockNumber	int	not null
// address	string	PK, NOT NULL
// lastBought	DATE		마지막으로 CDS를 구매한 날짜
// lastSold	DATE		마지막으로 CDS를 판매한 날짜
// sellerCount	INT	0부터 시작
// buyerCount	INT	0부터 시작
// createdAt	DATE	NOT NULL
// updatedAt	DATE	NOT NULL
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
