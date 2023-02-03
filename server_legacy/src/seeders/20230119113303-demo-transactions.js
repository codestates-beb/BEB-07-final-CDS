'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('transactions', [
      {
        txHash:
          '0x76f23526bdc2c087a0e38b1e12776a82f242cafa4e24b353570ee4d0ce4815c9',
        swapId: 1,
        blockNum: 8336073,
      },
      {
        txHash:
          '0xa61492b85953db58f223f115da6757472850c71d3601c28ef18dea3d27a95134',
        swapId: 2,
        blockNum: 8336021,
      },
      {
        txHash:
          '0x93339ed5d299b5aeece7c0deeb26ad1763ff42b0a84d65974fb4847c4d75bef6',
        swapId: 4,
        blockNum: 8336077,
      },
      {
        txHash:
          '0xd0b61d3758766629ffa893a1cc6619b3c6f586e8ec59fc4db2bda0c57c1c8e07',
        swapId: 2,
        blockNum: 8336079,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
