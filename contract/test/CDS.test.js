/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');
const CDS = artifacts.require('CDS');

contract('CDS', (accounts) => {
  let priceOracle;
  let cds;
  const defaultInitAssetPrice = 100;
  const defaultAmountOfAssets = 10;
  const defaultClaimPrice = 80;
  const defaultLiquidationPrice = 60;
  const defaultSellerDeposit = 400;
  const defaultPremium = 4;
  const defaultPremiumInterval = 60 * 10; // 10 minutes
  const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs

  const defaultBuyerDeposit = defaultPremium * 3;

  beforeEach(async () => {
    priceOracle = await PriceOracleMock.new(defaultInitAssetPrice, {
      from: accounts[0],
    });
    cds = await CDS.new({ from: accounts[0] });
  });

  describe('Price Oracle', () => {
    it('should throw error if priceOracle is not set', async () => {
      await truffleAssert.fails(cds.getPriceFromOracle());
    });

    it('should be able to set priceOracle and get value from it', async () => {
      await truffleAssert.passes(cds.setOracle(priceOracle.address));
      const currentPrice = await cds.getPriceFromOracle();
      await assert.strictEqual(defaultInitAssetPrice, currentPrice.toNumber());
    });
  });

  describe('Owner Check', () => {
    it('should throw error if owner is different', async () => {
      const ownerAddr = await cds.owner();
      await assert.strictEqual(accounts[0], ownerAddr);
    });
  });

  describe('Create Swap', () => {
    it('should throw error when invalid input or deposit provided to create swap', async () => {
      await truffleAssert.fails(
        cds.createSwap(
          accounts[2],
          20000,
          10,
          15000,
          10000,
          100000,
          -3000,
          60 * 10,
          12,
          { from: accounts[2], value: defaultBuyerDeposit },
        ),
      );
      await truffleAssert.fails(
        cds.createSwap(
          accounts[2],
          20000,
          10,
          15000,
          10000,
          100000,
          -3000,
          60 * 10,
          -12,
          { from: accounts[2], value: defaultBuyerDeposit },
        ),
      );
      await truffleAssert.fails(
        cds.createSwap(
          accounts[2],
          defaultInitAssetPrice,
          defaultAmountOfAssets,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[2], value: (defaultPremium + 1) * 3 },
        ),
      );
    });

    it('should be able to create Swap when valid input provided and check it from mapping', async () => {
      await truffleAssert.passes(
        cds.createSwap(
          accounts[2],
          defaultInitAssetPrice,
          defaultAmountOfAssets,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[2], value: defaultBuyerDeposit },
        ),
      );
      const [currentSwapId] = await cds.getSwapId();
      const currentSwap = await cds.getSwap(currentSwapId);
      const {
        buyer,
        seller,
        initAssetPrice,
        amountOfAssets,
        claimPrice,
        liquidationPrice,
        premium,
        premiumInterval,
        totalPremiumRounds,
      } = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultAmountOfAssets, +amountOfAssets);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultPremium, +premium);
      await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
      await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

      await assert.strictEqual(buyer.addr, accounts[2]);
      await assert.strictEqual(
        seller.addr,
        '0x0000000000000000000000000000000000000000',
      );
    });

    it('should throw error when owner calls createSwap', async () => {
      await truffleAssert.fails(
        cds.createSwap(
          accounts[0],
          defaultInitAssetPrice,
          defaultAmountOfAssets,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[0], value: defaultBuyerDeposit },
        ),
      );
    });

    it('should have decreased ETH amount of buyer after creating swap', async () => {
      const before = await web3.eth.getBalance(accounts[2]);
      const receipt = await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;
      // Obtain gasPrice from the transaction
      const after = await web3.eth.getBalance(accounts[2]);

      // const expectedBalance = web3.utils.toWei('3', 'ether');
      // console.log({ expectedBalance });
      assert.isBelow(
        +after,
        +before,
        'After Balance should be lower than Before',
      );
      assert.equal(
        +before,
        +after + +gasCost + +value,
        'Sum of gas cost, msg.value, after balance should be equal to Before Balance',
      );
    });
  });

  describe('Accept Swap', () => {
    it('should be able to accept Swap when valid deposit provided and check it from mapping', async () => {
      await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      const [currentSwapId] = await cds.getSwapId();

      await truffleAssert.passes(
        cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
          from: accounts[1],
          value: defaultSellerDeposit,
        }),
      );

      const currentSwap = await cds.getSwap(currentSwapId);
      const {
        buyer,
        seller,
        initAssetPrice,
        amountOfAssets,
        claimPrice,
        liquidationPrice,
        premium,
        premiumInterval,
        totalPremiumRounds,
      } = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultAmountOfAssets, +amountOfAssets);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultPremium, +premium);
      await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
      await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

      await assert.strictEqual(buyer.addr, accounts[2]);
      await assert.notStrictEqual(
        seller.addr,
        '0x0000000000000000000000000000000000000000',
      );
      await assert.strictEqual(seller.addr, accounts[1]);
    });

    it('should throw error if the seller provides invalid deposit', async () => {
      await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      const [currentSwapId] = await cds.getSwapId();

      await truffleAssert.fails(
        cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
          from: accounts[1],
          value: defaultSellerDeposit + 1,
        }),
      );
    });
  });

  describe('Cancel Swap', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
    });

    it('should throw error if the caller of cancelSwap is not the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.cancelSwap(currentSwapId, { from: accounts[1] }),
      );
    });

    it('should be able to cancel if the buyer calls cancelSwap and check the swap', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.passes(
        cds.cancelSwap(currentSwapId, { from: accounts[2] }),
      );
      const currentSwap = await cds.getSwap(currentSwapId);

      const {
        buyer,
        seller,
        initAssetPrice,
        amountOfAssets,
        claimPrice,
        liquidationPrice,
        premium,
        premiumInterval,
        totalPremiumRounds,
        status,
      } = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultAmountOfAssets, +amountOfAssets);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultPremium, +premium);
      await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
      await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

      await assert.strictEqual(buyer.addr, accounts[2]);
      await assert.strictEqual(0, +status);
    });

    it('should have decreased amount of contract balance after successful cancel swap call', async () => {
      const beforeContract = await cds.getContractBalance();
      const [currentSwapId] = await cds.getSwapId();
      const receipt = await cds.cancelSwap(currentSwapId, {
        from: accounts[2],
      });
      const afterContractBalance = await cds.getContractBalance();
      assert.equal(
        beforeContract.toNumber() - defaultBuyerDeposit,
        afterContractBalance.toNumber(),
      );
    });

    it('should return proper amount of ETH to buyer after successful cancel swap call', async () => {
      const before = await web3.eth.getBalance(accounts[2]);
      const [currentSwapId] = await cds.getSwapId();
      const receipt = await cds.cancelSwap(currentSwapId, {
        from: accounts[2],
      });
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;
      const after = await web3.eth.getBalance(accounts[2]);
      // console.log({ before, gasCost, defaultBuyerDeposit, after });
      assert.equal(
        +before - +gasCost + +defaultBuyerDeposit,
        +after, // HARDCODED TO PASS TEST
        'result of "BEFORE - defaultBuyerDeposit + value" should be equal to AFTER Balance',
      );
    });
  });

  describe('Close Swap', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
    });
    it('should throw error if the status is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.closeSwap(currentSwapId, { from: accounts[2] }),
      );
    });
    it('should throw error if the caller of cancelSwap is not the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await truffleAssert.fails(
        cds.closeSwap(currentSwapId, { from: accounts[1] }),
      );
    });
    it('should be able to close if the buyer calls closeSwap and check the state of the swap', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await truffleAssert.passes(
        cds.closeSwap(currentSwapId, { from: accounts[2] }),
      );

      const currentSwap = await cds.getSwap(currentSwapId);
      const {
        buyer,
        seller,
        initAssetPrice,
        amountOfAssets,
        claimPrice,
        liquidationPrice,
        premium,
        premiumInterval,
        totalPremiumRounds,
        status,
      } = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultAmountOfAssets, +amountOfAssets);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultPremium, +premium);
      await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
      await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

      await assert.strictEqual(buyer.addr, accounts[2]);
      await assert.strictEqual(0, +status);
    });

    it('should have proper amount of balance after closeSwap is called', async () => {
      const contractBalance = await cds.getContractBalance();
      const buyerBalance = await web3.eth.getBalance(accounts[2]);
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      const sellerBalance = await web3.eth.getBalance(accounts[1]);

      const receipt = await cds.closeSwap(currentSwapId, { from: accounts[2] });
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;
      // contract
      assert.equal(
        contractBalance.toNumber() - defaultBuyerDeposit,
        (await cds.getContractBalance()).toNumber(),
      );
      // buyer
      assert.equal(
        +buyerBalance - +gasCost + +defaultBuyerDeposit,
        +(await web3.eth.getBalance(accounts[2])),
      );
      // seller
      assert.equal(
        +sellerBalance + +defaultSellerDeposit,
        await web3.eth.getBalance(accounts[1]),
      );
    });
  });

  describe('Claim Swap', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      cds.setOracle(priceOracle.address);
    });

    it('should throw error if the status of the swap is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.claimSwap(currentSwapId, { from: accounts[2] }),
      );
    });

    // 사실 이거 하기 전에 가격을 claim price 밑으로 바꿔주는 게 맞다. => 70
    it('should throw error if the method is not called by the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      const currPrice = 70;
      await priceOracle.setPrice(currPrice);
      await truffleAssert.fails(
        cds.claimSwap(currentSwapId, { from: accounts[1] }),
      );
    });

    // check proper return
    // claim when currPrice is above CP => 100
    it('should throw error if the current price of the asset is above the claim price', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await truffleAssert.fails(
        cds.claimSwap(currentSwapId, { from: accounts[2] }),
      );
    });

    // claim when currPrice is btwn CP~LP => 70, claimReward should be 300
    it('should pass and return proper reward if the current price of the asset is below claim price ', async () => {
      const changedPrice = 70;
      const claimRewardIntended = 300;

      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await priceOracle.setPrice(changedPrice);

      const balanceBeforeClaim = {
        contract: (await cds.getContractBalance()).toNumber(),
        buyer: +(await web3.eth.getBalance(accounts[2])),
        seller: +(await web3.eth.getBalance(accounts[1])),
      };

      const receipt = await cds.claimSwap(currentSwapId, { from: accounts[2] });
      const { claimReward } = receipt.logs[0].args;
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;

      // claimReward
      assert.equal(+claimReward, claimRewardIntended);

      // contract
      assert.equal(
        balanceBeforeClaim.contract -
          defaultBuyerDeposit -
          defaultSellerDeposit,
        (await cds.getContractBalance()).toNumber(),
      );
      // buyer
      assert.equal(
        balanceBeforeClaim.buyer - +gasCost + +claimReward,
        +(await web3.eth.getBalance(accounts[2])),
      );
      // seller
      assert.equal(
        balanceBeforeClaim.seller + +defaultSellerDeposit - +claimReward,
        await web3.eth.getBalance(accounts[1]),
      );
    });

    // claim when currPrice is below LP => 50
    it('should pass and reward seller deposit to buyer if the current price of the asset is below liquidation price ', async () => {
      const changedPrice = 50;

      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await priceOracle.setPrice(changedPrice);

      const balanceBeforeClaim = {
        contract: (await cds.getContractBalance()).toNumber(),
        buyer: +(await web3.eth.getBalance(accounts[2])),
        seller: +(await web3.eth.getBalance(accounts[1])),
      };

      const receipt = await cds.claimSwap(currentSwapId, { from: accounts[2] });
      const { claimReward } = receipt.logs[0].args;
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;

      // claimReward
      assert.equal(+claimReward, defaultSellerDeposit);

      // contract
      assert.equal(
        balanceBeforeClaim.contract -
          defaultBuyerDeposit -
          defaultSellerDeposit,
        (await cds.getContractBalance()).toNumber(),
      );
      // buyer
      assert.equal(
        balanceBeforeClaim.buyer + +claimReward - gasCost, // gas 10000
        +(await web3.eth.getBalance(accounts[2])),
      );
      // seller
      assert.equal(
        balanceBeforeClaim.seller,
        await web3.eth.getBalance(accounts[1]),
      );
    });
  });

  describe('Pay Premium', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultAmountOfAssets,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
    });

    it('should throw error if the status of the swap is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, {
          from: accounts[2],
          value: defaultPremium,
        }),
      );
    });

    it('should throw error if the method is not called by the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, {
          from: accounts[1],
          value: defaultPremium,
        }),
      );
    });

    it('should throw error if the buyer paid invalid amount of premium', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, {
          from: accounts[2],
          value: defaultPremium + 1,
        }),
      );
    });

    // after payPremium passes
    it('should pass if proper premium paid, and check the balance of the participants', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });

      const balanceBeforePremium = {
        buyer: +(await web3.eth.getBalance(accounts[2])),
        seller: +(await web3.eth.getBalance(accounts[1])),
      };

      const receipt = await cds.payPremium(currentSwapId, {
        from: accounts[2],
        value: defaultPremium,
      });
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;

      // buyer
      assert.equal(
        balanceBeforePremium.buyer - defaultPremium - gasCost,
        +(await web3.eth.getBalance(accounts[2])),
      );
      // seller
      assert.equal(
        balanceBeforePremium.seller + defaultPremium,
        await web3.eth.getBalance(accounts[1]),
      );
    });

    // total round check
    it('should pass if totalPremiumRounds changed properly', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });
      const beforePayPremium = await cds.getSwap(currentSwapId);

      await truffleAssert.passes(
        cds.payPremium(currentSwapId, {
          from: accounts[2],
          value: defaultPremium,
        }),
      );

      const afterPayPremium = await cds.getSwap(currentSwapId);
      assert.equal(
        beforePayPremium.totalPremiumRounds - 1,
        afterPayPremium.totalPremiumRounds,
      );
    });
  });
});
