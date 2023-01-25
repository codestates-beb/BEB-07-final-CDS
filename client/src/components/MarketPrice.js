//image
import BTHLogo from '../img/BTC_Logo.png';
import ETHLogo from '../img/ETH_Logo.png';
import DOGELogo from '../img/DOGE_Logo.png';

function MarketPrice() {
  return (
    <div className="">
      <div className="px-3 py-6 font-bold text-4xl">Market Price</div>
      <div className="w-[81rem] bg-blackColor rounded-3xl">
        <div className="py-7 px-24">
          <div className="flex font-semibold text-2xl">
            <div className="w-44">Name</div>
            <div className="w-44 ml-80">Price</div>
            <div className="w-44 ml-80">Date</div>
          </div>
          <div className="flex pt-5">
            <div className="w-44 flex">
              <img
                className="w-8 h-8 bg-white"
                alt="BitcoinLogo"
                src={BTHLogo}
              />
              <div className="ml-2 font-medium text-2xl text-center">BTC</div>
            </div>
            <div className="w-44 ml-80">$ 20,964.20</div>
            <div className="w-44 ml-80">Fri, 20 Jan 2023</div>
          </div>
          <div className="flex pt-5">
            <div className="w-44 flex">
              <img className="w-8 h-8" alt="BitcoinLogo" src={ETHLogo} />
              <div className="ml-2 font-medium text-2xl text-center">ETH</div>
            </div>
            <div className="w-44 ml-80">$ 20,964.20</div>
            <div className="w-44 ml-80">Thu, 19 Jan 2023</div>
          </div>
          <div className="flex pt-5">
            <div className="w-44 flex">
              <img className="w-8 h-8" alt="BitcoinLogo" src={DOGELogo} />
              <div className="ml-2 font-medium text-2xl text-center">DOGE</div>
            </div>
            <div className="w-44 ml-80">$ 20,964.20</div>
            <div className="w-44 ml-80">Wed, 18 Jan 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPrice;
