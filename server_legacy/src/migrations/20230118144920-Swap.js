'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('swaps', {
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
      amountOfAssets: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalAssets: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      premium: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      premiumRate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dropRate: {
        type: Sequelize.DECIMAL(10, 4),
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
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      updatableStatus: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('swaps');
  },
};
