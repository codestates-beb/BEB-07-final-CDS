function MarketPrice() {
  function getSymbol(symbol) {
    const symbolURL = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
    return symbolURL;
  }

  const btcSymbol = getSymbol('btc');
  const ethSymbol = getSymbol('eth');
  const dogeSymbol = getSymbol('doge');

  return (
    <div className="">
      <div className="px-3 py-6 font-bold text-3xl">Market Price</div>
      <div className="w-[68rem] bg-blackColor rounded-3xl">
        <div className="py-[2%] px-[7%]">
          <div className="flex font-semibold text-2xl">
            <div className="w-44">Name</div>
            <div className="w-44 ml-60">Price</div>
            <div className="w-44 ml-60">Date</div>
          </div>
          <div className="flex pt-5">
            <div className="w-44 flex">
              <img
                className="w-8 h-8 bg-white"
                alt="BitcoinLogo"
                src={btcSymbol}
              />
              <div className="ml-2 font-medium text-xl text-center">BTC</div>
            </div>
            <div className="w-44 ml-60">$ 20,964.20</div>
            <div className="w-44 ml-60">Fri, 20 Jan 2023</div>
          </div>
          <div className="flex pt-5">
            <div className="w-44 flex">
              <img className="w-8 h-8" alt="BitcoinLogo" src={ethSymbol} />
              <div className="ml-2 font-medium text-xl text-center">ETH</div>
            </div>
            <div className="w-44 ml-60">$ 20,964.20</div>
            <div className="w-44 ml-60">Thu, 19 Jan 2023</div>
          </div>
          <div className="flex pt-5">
            <div className="w-44 flex">
              <img className="w-8 h-8" alt="BitcoinLogo" src={dogeSymbol} />
              <div className="ml-2 font-medium text-xl text-center">DOGE</div>
            </div>
            <div className="w-44 ml-60">$ 20,964.20</div>
            <div className="w-44 ml-60">Wed, 18 Jan 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPrice;
