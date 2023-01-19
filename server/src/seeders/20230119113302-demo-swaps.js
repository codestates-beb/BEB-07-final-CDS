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
    await queryInterface.bulkInsert('swaps', [
      {
        swapId: 1,
        initialAssetPrice: 20000,
        premium: 2,
        buyer: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        buyerDeposit: null,
        seller: null,
        sellerDeposit: null,
        claimPrice: 15000,
        liquidationPrice: 10000,
        status: 'pending',
        updatableStatus: null,
      },
      {
        swapId: 2,
        initialAssetPrice: 30000,
        premium: 2,
        buyer: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        buyerDeposit: null,
        seller: '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
        sellerDeposit: null,
        claimPrice: 20000,
        liquidationPrice: 15000,
        status: 'active',
        updatableStatus: 'cliamed',
      },
      {
        swapId: 3,
        initialAssetPrice: 40000,
        premium: 2,
        buyer: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        buyerDeposit: null,
        seller: '0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d',
        sellerDeposit: null,
        claimPrice: 25000,
        liquidationPrice: 20000,
        status: 'liquidated',
        updatableStatus: null,
      },
      {
        swapId: 4,
        initialAssetPrice: 20000,
        premium: 2,
        buyer: '0xd03ea8624C8C5987235048901fB614fDcA89b117',
        buyerDeposit: null,
        seller: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        sellerDeposit: null,
        claimPrice: 15000,
        liquidationPrice: 10000,
        status: 'active',
        updatableStatus: 'overdue',
      },
      {
        swapId: 5,
        initialAssetPrice: 20000,
        premium: 2,
        buyer: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
        buyerDeposit: null,
        seller: '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b',
        sellerDeposit: null,
        claimPrice: 15000,
        liquidationPrice: 10000,
        status: 'expired',
        updatableStatus: null,
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
