// modules
import { useState, useEffect } from 'react';

// css
import '../assets/css/marketPrice.css';

//APIs
import { getCoinGeckoAPI } from '../apis/request.js';

function MarketPriceType2() {
  // symbol image를 받아옵니다
  function getSymbol(symbol) {
    const symbolURL = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
    return symbolURL;
  }

  const btcSymbol = getSymbol('btc');
  const ethSymbol = getSymbol('eth');
  const dogeSymbol = getSymbol('doge');

  // market data의 가격을 저장합니다
  const [priceBTC, setPriceBTC] = useState('');
  const [priceETH, setPriceETH] = useState('');
  const [priceDOGE, setPriceDOGE] = useState('');

  // market data의 변화율을 저장합니다
  const [rateOfChangeBTC, setBTCChange] = useState('');
  const [rateOfChangeETH, setETHChange] = useState('');
  const [rateOfChangeDOGE, setDOGEChange] = useState('');

  useEffect(() => {
    const coinGeckoBTCData = getCoinGeckoAPI('bitcoin');
    const coinGeckoETHData = getCoinGeckoAPI('ethereum');
    const coinGeckoDogeData = getCoinGeckoAPI('dogecoin');

    const getBTCData = () => {
      coinGeckoBTCData
        .then((response) => {
          const priceData = Math.round(response.prices[1][1]);
          setPriceBTC(priceData);

          return response;
        })
        .then((data) => {
          const ChangeData =
            Math.floor(
              (data.prices[1][1] / data.prices[0][1] - 1) * 100 * 100,
            ) / 100;

          setBTCChange(ChangeData);
        });
    };

    const getETHData = () => {
      coinGeckoETHData
        .then((response) => {
          const priceData = Math.round(response.prices[1][1]);
          setPriceETH(priceData);

          return response;
        })
        .then((data) => {
          const ChangeData =
            Math.floor(
              (data.prices[1][1] / data.prices[0][1] - 1) * 100 * 100,
            ) / 100;

          setETHChange(ChangeData);
        });
    };

    const getDOGEData = () => {
      coinGeckoDogeData
        .then((response) => {
          const priceData = Math.round(response.prices[1][1] * 100000) / 10000;
          setPriceDOGE(priceData);

          return response;
        })
        .then((data) => {
          const ChangeData =
            Math.floor(
              (data.prices[1][1] / data.prices[0][1] - 1) * 100 * 100,
            ) / 100;

          setDOGEChange(ChangeData);
        });
    };

    getBTCData();
    getETHData();
    getDOGEData();
  }, []);

  // 크립토 자산의 변화율이 음수인지 판단합니다
  const [negativeBTC, setNegativeBTC] = useState(false);
  const [negativeETH, setNegativeETH] = useState(false);
  const [negativeDOGE, setNegativeDOGE] = useState(false);

  if (rateOfChangeBTC < 0) {
    setNegativeBTC(true);
  }

  if (rateOfChangeETH < 0) {
    setNegativeETH(true);
  }

  if (rateOfChangeDOGE < 0) {
    setNegativeDOGE(true);
  }

  return (
    <>
      <div className="flex-col">
        <div className="flex justify-center">
          <div className="flex-col w-[25%] mr-[1.25%]">
            <div className="text-center font-extrabold text-3xl my-[2rem]">
              Database
            </div>

            <div className="marketPriceCard p-[1rem] rounded-2xl mb-[0.5rem]">
              <div className="flex">
                <img
                  src={btcSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Bitcoin</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm">$ {priceBTC}</div>
                  <div>
                    {negativeBTC === false ? (
                      <div className="font-medium text-green text-sm">
                        +{rateOfChangeBTC}%
                      </div>
                    ) : (
                      <div className="font-medium text-red text-sm">
                        {rateOfChangeBTC}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="marketPriceCard p-[1rem] rounded-2xl mb-[0.5rem]">
              <div className="flex">
                <img
                  src={ethSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Ethereum</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm">$ {priceETH}</div>
                  <div>
                    {negativeBTC === false ? (
                      <div className="font-medium text-green text-sm">
                        +{rateOfChangeETH}%
                      </div>
                    ) : (
                      <div className="font-medium text-red text-sm">
                        {rateOfChangeETH}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="marketPriceCard p-[1rem] rounded-2xl">
              <div className="flex">
                <img
                  src={dogeSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Doge</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm">$ {priceDOGE}</div>
                  <div>
                    {negativeBTC === false ? (
                      <div className="font-medium text-green text-sm">
                        +{rateOfChangeDOGE}%
                      </div>
                    ) : (
                      <div className="font-medium text-red text-sm">
                        {rateOfChangeDOGE}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col w-[25%] ml-[1.25%]">
            <div className="text-center font-extrabold text-3xl my-[2rem]">
              ChainLink
            </div>

            <div className="marketPriceCard p-[1rem] rounded-2xl mb-[0.5rem]">
              <div className="flex">
                <img
                  src={btcSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Bitcoin</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm">$ ---</div>
                  <div className="font-medium text-green text-sm">+ ---%</div>
                </div>
              </div>
            </div>
            <div className="marketPriceCard p-[1rem] rounded-2xl mb-[0.5rem]">
              <div className="flex">
                <img
                  src={ethSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Ethereum</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm">$ ---</div>
                  <div className="font-medium text-green text-sm">+ ---%</div>
                </div>
              </div>
            </div>
            <div className="marketPriceCard p-[1rem] rounded-2xl">
              <div className="flex">
                <img
                  src={dogeSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Doge</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm">$ ---</div>
                  <div className="font-medium text-green text-sm">+ ---%</div>
                </div>
              </div>
            </div>
            <div className="text-lightGray text-[8px] text-right my-[1rem]">
              <p>Our contract operation refers to ChainLink.</p>
              <p>
                The price of ChainLink may differ from general market price.
              </p>
              <p>Slippage may occur when requesting CDS claim</p>
              <p>We are not responsible for this matter.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketPriceType2;
