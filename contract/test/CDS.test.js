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
  const defaultHostSetting = true;
  const defaultInitAssetPrice = 100;
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
    it('should throw error when invalid input', async () => {
      await truffleAssert.fails(
        cds.createSwap(true, 20000, 15000, 10000, 100000, -3000, 60 * 10, 10, {
          from: accounts[2],
          value: defaultBuyerDeposit,
        }),
      );
      await truffleAssert.fails(
        cds.createSwap(true, 20000, 15000, 10000, 100000, -3000, 60 * 10, 10, {
          from: accounts[2],
          value: defaultBuyerDeposit,
        }),
      );
    });

    it('should throw error when invalid deposit provided', async () => {
      await truffleAssert.fails(
        cds.createSwap(
          defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[2], value: defaultSellerDeposit },
        ),
      );
      await truffleAssert.fails(
        cds.createSwap(
          !defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[1], value: defaultBuyerDeposit },
        ),
      );
    });

    it('should be able to create Swap as BUYER when valid input provided and check it from mapping', async () => {
      await truffleAssert.passes(
        cds.createSwap(
          defaultHostSetting,
          defaultInitAssetPrice,
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
      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const deposits = await cds.getDeposits(currentSwapId);
      const totalRounds = await cds.getRoundsLeft(currentSwapId);

      const {
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      } = currentSwap;
      const [buyerDepositDetail, sellerDepositDetail] = deposits;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);
      await assert.strictEqual(defaultPremium, +premium);

      await assert.strictEqual(buyer, accounts[2]);
      await assert.strictEqual(
        +buyerDepositDetail.deposit,
        defaultBuyerDeposit,
      );
      await assert.strictEqual(buyerDepositDetail.isPaid, true);

      await assert.strictEqual(
        seller,
        '0x0000000000000000000000000000000000000000',
      );
      await assert.strictEqual(+sellerDepositDetail.deposit, 0);
      await assert.strictEqual(sellerDepositDetail.isPaid, false);

      await assert.strictEqual(defaultPremiumRounds, +totalRounds);
    });

    it('should be able to create Swap as SELLER when valid input provided and check it from mapping', async () => {
      await truffleAssert.passes(
        cds.createSwap(
          !defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[1], value: defaultSellerDeposit },
        ),
      );
      const [currentSwapId] = await cds.getSwapId();
      const currentSwap = await cds.getSwap(currentSwapId);
      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const deposits = await cds.getDeposits(currentSwapId);
      const totalRounds = await cds.getRoundsLeft(currentSwapId);

      const {
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      } = currentSwap;
      const [buyerDepositDetail, sellerDepositDetail] = deposits;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);
      await assert.strictEqual(defaultPremium, +premium);

      await assert.strictEqual(seller, accounts[1]);
      await assert.strictEqual(
        +sellerDepositDetail.deposit,
        defaultSellerDeposit,
      );
      await assert.strictEqual(sellerDepositDetail.isPaid, true);

      await assert.strictEqual(
        buyer,
        '0x0000000000000000000000000000000000000000',
      );
      await assert.strictEqual(+buyerDepositDetail.deposit, 0);
      await assert.strictEqual(buyerDepositDetail.isPaid, false);

      await assert.strictEqual(defaultPremiumRounds, +totalRounds);
    });

    it('should throw error when owner calls createSwap', async () => {
      await truffleAssert.fails(
        cds.createSwap(
          defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[0], value: defaultBuyerDeposit },
        ),
      );
      await truffleAssert.fails(
        cds.createSwap(
          !defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumInterval,
          defaultPremiumRounds,
          { from: accounts[0], value: defaultSellerDeposit },
        ),
      );
    });

    it('should have decreased ETH amount of buyer after creating swap as BUYER', async () => {
      const before = await web3.eth.getBalance(accounts[2]);
      const receipt = await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
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
      const after = await web3.eth.getBalance(accounts[2]);

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

    it('should have decreased ETH amount of buyer after creating swap as SELLER', async () => {
      const before = await web3.eth.getBalance(accounts[1]);
      const receipt = await cds.createSwap(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[1], value: defaultSellerDeposit },
      );
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice, value } = tx;
      const gasCost = gasUsed * gasPrice;
      const after = await web3.eth.getBalance(accounts[1]);

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
    it('should be able to accept Swap as SELLER when valid deposit provided and check it from mapping', async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
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
        cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
          from: accounts[1],
          value: defaultSellerDeposit,
        }),
      );

      const currentSwap = await cds.getSwap(currentSwapId);
      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const deposits = await cds.getDeposits(currentSwapId);
      const totalRounds = await cds.getRoundsLeft(currentSwapId);

      const {
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      } = currentSwap;
      const [buyerDepositDetail, sellerDepositDetail] = deposits;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultPremium, +premium);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);

      await assert.strictEqual(buyer, accounts[2]);
      await assert.strictEqual(
        +buyerDepositDetail.deposit,
        defaultBuyerDeposit,
      );
      await assert.strictEqual(buyerDepositDetail.isPaid, true);

      await assert.strictEqual(seller, accounts[1]);
      await assert.strictEqual(
        +sellerDepositDetail.deposit,
        defaultSellerDeposit,
      );
      await assert.strictEqual(sellerDepositDetail.isPaid, true);

      await assert.strictEqual(defaultPremiumRounds, +totalRounds);
    });

    it('should be able to accept Swap as BUYER when valid deposit provided and check it from mapping', async () => {
      await cds.createSwap(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[1], value: defaultSellerDeposit },
      );

      const [currentSwapId] = await cds.getSwapId();

      await truffleAssert.passes(
        cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
          from: accounts[2],
          value: defaultBuyerDeposit,
        }),
      );

      const currentSwap = await cds.getSwap(currentSwapId);
      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const deposits = await cds.getDeposits(currentSwapId);
      const totalRounds = await cds.getRoundsLeft(currentSwapId);

      const {
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      } = currentSwap;
      const [buyerDepositDetail, sellerDepositDetail] = deposits;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultPremium, +premium);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);

      await assert.strictEqual(buyer, accounts[2]);
      await assert.strictEqual(
        +buyerDepositDetail.deposit,
        defaultBuyerDeposit,
      );
      await assert.strictEqual(buyerDepositDetail.isPaid, true);

      await assert.strictEqual(seller, accounts[1]);
      await assert.strictEqual(
        +sellerDepositDetail.deposit,
        defaultSellerDeposit,
      );
      await assert.strictEqual(sellerDepositDetail.isPaid, true);

      await assert.strictEqual(defaultPremiumRounds, +totalRounds);
    });

    it('should throw error if the seller provides invalid deposit', async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
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
        cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
          from: accounts[1],
          value: defaultSellerDeposit + 1,
        }),
      );
    });

    it('should throw error if the buyer provides invalid deposit', async () => {
      await cds.createSwap(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[1], value: defaultSellerDeposit },
      );
      const [currentSwapId] = await cds.getSwapId();

      await truffleAssert.fails(
        cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
          from: accounts[2],
          value: defaultBuyerDeposit + 1,
        }),
      );
    });

    it('should throw error if the host accepts the swap', async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      let [currentSwapId] = await cds.getSwapId();

      await truffleAssert.fails(
        cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
          from: accounts[2],
          value: defaultSellerDeposit,
        }),
      );

      await cds.createSwap(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[1], value: defaultSellerDeposit },
      );
      [currentSwapId] = await cds.getSwapId();

      await truffleAssert.fails(
        cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
          from: accounts[1],
          value: defaultBuyerDeposit,
        }),
      );
    });

    it('should have right ETH amount of seller after accepting swap as SELLER', async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      const [currentSwapId] = await cds.getSwapId();

      const before = await web3.eth.getBalance(accounts[1]);
      const receipt = await cds.acceptSwap(
        defaultInitAssetPrice,
        currentSwapId,
        {
          from: accounts[1],
          value: defaultSellerDeposit,
        },
      );

      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice } = tx;
      const gasCost = gasUsed * gasPrice;
      const after = await web3.eth.getBalance(accounts[1]);

      assert.equal(
        +before,
        +after + +gasCost + defaultSellerDeposit,
        'Sum of gas cost, msg.value, after balance should be equal to Before Balance',
      );
    });

    it('should have right ETH amount of buyer after accepting swap as BUYER', async () => {
      await cds.createSwap(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[1], value: defaultSellerDeposit },
      );
      const [currentSwapId] = await cds.getSwapId();

      const before = await web3.eth.getBalance(accounts[2]);
      const receipt = await cds.acceptSwap(
        defaultInitAssetPrice,
        currentSwapId,
        {
          from: accounts[2],
          value: defaultBuyerDeposit,
        },
      );

      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice } = tx;
      const gasCost = gasUsed * gasPrice;
      const after = await web3.eth.getBalance(accounts[2]);

      assert.equal(
        +before,
        +after + +gasCost + defaultSellerDeposit,
        'Sum of gas cost, msg.value, after balance should be equal to Before Balance',
      );
    });
  });

  describe('Cancel Swap', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
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
      const depositDetail = await cds.getDeposits(currentSwapId);
      const [buyerDepositDetail, sellerDepositDetail] = depositDetail;
      const swapStatus = await cds.getSwapStatus(currentSwapId);

      await assert.strictEqual(+buyerDepositDetail.deposit, 0);
      await assert.strictEqual(buyerDepositDetail.isPaid, false);

      await assert.strictEqual(+sellerDepositDetail.deposit, 0);
      await assert.strictEqual(sellerDepositDetail.isPaid, false);

      await assert.strictEqual(0, +swapStatus);
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
      const { gasPrice } = tx;
      const gasCost = gasUsed * gasPrice;
      const after = await web3.eth.getBalance(accounts[2]);
      assert.equal(
        +before - +gasCost + defaultBuyerDeposit,
        +after,
        'result of "BEFORE - defaultBuyerDeposit + value" should be equal to AFTER Balance',
      );
    });
  });

  describe('Close Swap', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
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

      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });

      await truffleAssert.fails(
        cds.closeSwap(currentSwapId, { from: accounts[1] }),
      );
    });

    it('should be able to close if the buyer calls closeSwap and check the state of the swap', async () => {
      const [currentSwapId] = await cds.getSwapId();

      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });

      await truffleAssert.passes(
        cds.closeSwap(currentSwapId, { from: accounts[2] }),
      );

      const depositDetail = await cds.getDeposits(currentSwapId);
      const [buyerDepositDetail, sellerDepositDetail] = depositDetail;
      const swapStatus = await cds.getSwapStatus(currentSwapId);

      await assert.strictEqual(+buyerDepositDetail.deposit, 0);
      await assert.strictEqual(buyerDepositDetail.isPaid, false);

      await assert.strictEqual(+sellerDepositDetail.deposit, 0);
      await assert.strictEqual(sellerDepositDetail.isPaid, false);

      await assert.strictEqual(0, +swapStatus);
    });

    it('should have proper amount of balance after closeSwap is called', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });

      const contractBalance = await cds.getContractBalance();
      const buyerBalance = await web3.eth.getBalance(accounts[2]);
      const sellerBalance = await web3.eth.getBalance(accounts[1]);

      const receipt = await cds.closeSwap(currentSwapId, { from: accounts[2] });
      const tx = await web3.eth.getTransaction(receipt.tx);
      const { gasUsed } = receipt.receipt;
      const { gasPrice } = tx;
      const gasCost = gasUsed * gasPrice;
      // contract
      assert.equal(
        contractBalance.toNumber() - defaultBuyerDeposit - defaultSellerDeposit,
        (await cds.getContractBalance()).toNumber(),
      );
      // buyer
      assert.equal(
        +buyerBalance + defaultBuyerDeposit - +gasCost,
        +(await web3.eth.getBalance(accounts[2])),
      );
      // seller
      assert.equal(
        +sellerBalance + defaultSellerDeposit,
        await web3.eth.getBalance(accounts[1]),
      );
    });
  });

  describe('Claim Swap', async () => {
    beforeEach(async () => {
      await cds.createSwap(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      );
      await cds.setOracle(priceOracle.address);
    });

    it('should throw error if the status of the swap is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.claimSwap(currentSwapId, { from: accounts[2] }),
      );
    });

    it('should throw error if the method is not called by the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      const { gasPrice } = tx;
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      const { gasPrice } = tx;
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
        defaultHostSetting,
        defaultInitAssetPrice,
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
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
      const { gasPrice } = tx;
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
      await cds.acceptSwap(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
        value: defaultSellerDeposit,
      });

      const beforePayPremium = await cds.getRoundsLeft(currentSwapId);

      await truffleAssert.passes(
        cds.payPremium(currentSwapId, {
          from: accounts[2],
          value: defaultPremium,
        }),
      );

      const afterPayPremium = await cds.getRoundsLeft(currentSwapId);
      assert.equal(beforePayPremium - 1, afterPayPremium);
    });
  });
});
