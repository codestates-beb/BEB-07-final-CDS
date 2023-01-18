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
    await queryInterface.createTable('transactions', {
      txHash: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      blockHash: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 0,
      },
      swapId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      blockNum: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('transactions');
  },
};
