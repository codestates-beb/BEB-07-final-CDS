// Calculating Total Assets function // 전체 자산 계산 함수
function calculateTotalAssets(initialPriceOfAsset, amount) {
  if (!initialPriceOfAsset || !amount) return 0;
  return initialPriceOfAsset * amount;
}

// Calculating Drop Rate function // 하락률 계산함수
function calculateDropRate(initialPriceOfAsset, claimPrice) {
  if (!initialPriceOfAsset || !claimPrice) return 100;
  return 100 - (claimPrice / initialPriceOfAsset) * 100;
}

// Calculating Claim Price function(Ceiling) // 보상 요구가능 시점 가격 계산 함수(반올림)
function calculateClaimPrice(initialPriceOfAsset, dropRate) {
  return Math.ceil(initialPriceOfAsset * (1 - dropRate / 100));
}

// Calculating Premium Price function(Ceiling) // 프리미엄 가격 계산 함수(반올림)
function calculatePremiumPrice(
  initialPriceOfAsset,
  amountOfAssets,
  dropRate,
  premiumRate,
) {
  return Math.ceil(
    initialPriceOfAsset *
      amountOfAssets *
      (dropRate / 100) *
      (premiumRate / 100),
  );
}

// Calculating Liquidation Price function(Ceiling) // 청산 시점 가격 계산 함수(반올림)
function calculateLiquidationPrice(initialPriceOfAsset, amount, sellerDeposit) {
  if (!initialPriceOfAsset || !amount || !sellerDeposit) return Infinity;

  return Math.ceil((initialPriceOfAsset * amount - sellerDeposit) / amount);
}

// Calculating Seller Depost fuction // 구매자 보증금 계산 함수
function calculateSellerDeposit(initialPriceOfAsset, amount, liquidationPrice) {
  if (!initialPriceOfAsset || !amount || !liquidationPrice) return 0;

  return (initialPriceOfAsset - liquidationPrice) * amount;
}

module.exports = {
  calculateTotalAssets,
  calculateDropRate,
  calculateClaimPrice,
  calculatePremiumPrice,
  calculateLiquidationPrice,
  calculateSellerDeposit,
};
