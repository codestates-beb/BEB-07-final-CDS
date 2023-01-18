// id	int	notnull, autoincrement, pk
// swapId	int	notnull, pk	컨트랙트의 id
// initialAssetPrice	int	notnull	계약 생성당시 준거자산의 가격
// premium	int	not null
// seller	string	FK
// buyer	string	FK
// sellerCollateral	int	not null
// buyerCollateral	int 	not null
// claimPrice	int	not null	권리행사가능기준
// liquidationPrice	int 	not null	청산
// swapExpiration	UTC timestamp	not null	계약만기
// proposalExpiration	timestamp	not null	바이어의 제한 유효기간
// status	enum	not null
// address	string	PK, NOT NULL
// lastBought	DATE		마지막으로 CDS를 구매한 날짜
// lastSold	DATE		마지막으로 CDS를 판매한 날짜
// sellerCount	INT	0부터 시작
// buyerCount	INT	0부터 시작
// createdAt	DATE	NOT NULL
// updatedAt	DATE	NOT NULL
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
        seller: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        buyer: {
          type: Sequelize.STRING(50),
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
        status: {
          type: Sequelize.ENUM(
            'pending',
            'active',
            'expired',
            'overdue',
            'liquidated',
          ),
          allowNull: false,
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
