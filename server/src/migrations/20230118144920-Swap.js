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
          'claimable',
          'expired',
          'overdue',
          'liquidated',
          'inactive',
        ),
        allowNull: false,
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
