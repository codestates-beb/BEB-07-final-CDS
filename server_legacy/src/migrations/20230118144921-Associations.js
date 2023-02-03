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
    await queryInterface.addColumn('swaps', 'seller', {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: 'users',
        key: 'address',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('swaps', 'buyer', {
      type: Sequelize.STRING(100),
      allowNull: true,
      references: {
        model: 'users',
        key: 'address',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('transactions', 'swapId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'swaps',
        key: 'swapId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('swaps', 'seller');

    await queryInterface.removeColumn('swaps', 'buyer');

    await queryInterface.removeColumn('transactions', 'swapId');
  },
};
