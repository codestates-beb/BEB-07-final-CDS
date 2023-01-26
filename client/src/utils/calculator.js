// Calculating Total Assets function // 전체 자산 계산 함수
export function calculateTotalAssets( initialPriceOfAsset, amount ) {
    if ( !initialPriceOfAsset || !amount) return 0;
    return initialPriceOfAsset * amount ;
}

// Calculating Drop Rate function // 하락률 계산함수 
export function calculateDropRate( initialPriceOfAsset, claimPrice ) {
    if (!initialPriceOfAsset || !claimPrice) return 100;
    return 100 - ( claimPrice / initialPriceOfAsset ) * 100;
}

// Calculating Claim Price function(Ceiling) // 보상 요구가능 시점 가격 계산 함수(반올림)
export function calculateClaimPrice( initialPriceOfAsset, dropRate ) {
    return Math.ceil( initialPriceOfAsset * (dropRate / 100) );
}

// Calculating Premium Price function(Ceiling) // 프리미엄 가격 계산 함수(반올림)
export function calculatePremiumPrice( initialPriceOfAsset, amountOfAssets, dropRate, premiumRate ) {
    return Math.ceil( initialPriceOfAsset * amountOfAssets * ( dropRate / 100 ) * ( premiumRate / 100) );
}

// Calculating Liquidation Price function(Ceiling) // 청산 시점 가격 계산 함수(반올림)
export function calculateLiquidationPrice( initialPriceOfAsset, amount, sellerDeposit ) {
    if(!initialPriceOfAsset || !amount || !sellerDeposit) return Infinity;

    return Math.ceil( ( ( initialPriceOfAsset * amount ) - sellerDeposit ) / amount );
}