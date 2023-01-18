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
