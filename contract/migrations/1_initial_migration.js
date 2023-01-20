// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PriceOracleMock, 10000);
  const priceOracleMock = await PriceOracleMock.deployed();
  let price = await priceOracleMock.getPrice();
  console.log(price.toNumber());
  await priceOracleMock.setPrice(20000);
  price = await priceOracleMock.getPrice();
  console.log(price.toNumber());

  await deployer.deploy(CDS);
  const cds = await CDS.deployed();
  console.log(accounts[0]);
  await cds.setOracle(priceOracleMock.address);
  await cds.makeSwap(accounts[0], 15000, 10000, 100000, 3000, 60 * 10, 12);
  //   above makeSwap's inputs are calcuated upon conditions below
  //   IPA 20000
  //   amount 10
  //   claimPrice 15000
  //   liquidationPrice 10000
  //   sellerDeposit 9000
  //   premium 3000
  //   premiumInterval 1hour
  //   totalPremiumRounds 12
  console.log(await cds.getSwap(1));
  await cds.acceptSwap(accounts[1], 1);
  console.log(await cds.getSwap(1));
};

/*
function makeSwap(
    address addr,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint256 premiumInterval,
    uint256 totalPremiumRounds
  ) public returns (uint256)
*/
