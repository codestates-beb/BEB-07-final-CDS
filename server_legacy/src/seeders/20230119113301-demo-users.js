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
    await queryInterface.bulkInsert('users', [
      {
        address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
        nickname: 'admin',
        soldCount: 0,
        boughtCount: 0,
        lastSold: null,
        lastBought: null,
      },
      {
        address: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        nickname: 'kang',
        soldCount: 0,
        boughtCount: 0,
        lastSold: null,
        lastBought: null,
      },
      {
        address: '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
        nickname: 'kim',
        soldCount: 0,
        boughtCount: 0,
        lastSold: null,
        lastBought: null,
      },
      {
        address: '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d',
        nickname: 'seol',
        soldCount: 0,
        boughtCount: 0,
        lastSold: null,
        lastBought: null,
      },
      {
        address: '0xd03ea8624C8C5987235048901fB614fDcA89b117',
        nickname: 'hong',
        soldCount: 0,
        boughtCount: 0,
        lastSold: null,
        lastBought: null,
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
