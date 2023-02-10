// modules
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// css
import '../assets/css/marketPrice.css';

function MarketPriceType2() {
  // symbol image를 받아옵니다
  function getSymbol(symbol) {
    const symbolURL = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
    return symbolURL;
  }
  const btcSymbol = getSymbol('btc');
  const ethSymbol = getSymbol('eth');
  const linkSymbol = getSymbol('link');

  // coinGecko data의 price를 저장합니다
  const priceBTCGecko = useSelector(state=> state.priceByGecko.priceBTCGecko);
  const priceETHGecko = useSelector(state=> state.priceByGecko.priceETHGecko);
  const priceLINKGecko = useSelector(state=> state.priceByGecko.priceLINKGecko);

  // coinGecko market data의 24 hours change rate을 저장합니다
  const changeRateBTCGecko = useSelector(state => state.priceByGecko.changeRateBTCGecko);
  const changeRateETHGecko = useSelector(state => state.priceByGecko.changeRateETHGecko);
  const changeRateLINKGecko = useSelector(state => state.priceByGecko.changeRateLINKGecko);

  // chainlink data의 price를 저장합니다
  const priceBTCLink = useSelector(state=> state.priceByLink.priceBTCLink);
  const priceETHLink = useSelector(state=> state.priceByLink.priceETHLink);
  const priceLINKLink = useSelector(state=> state.priceByLink.priceLINKLink);

  // market data의 updated timed을 저장합니다
  const updatedTimeGecko = useSelector(state => state.priceByGecko.updatedTimeGecko);
  const updatedTimeLink = useSelector(state => state.priceByGecko.updatedTimeLink);;

  // 크립토 자산의 변화율이 음수인지 판단합니다
  const [negativeBTC, setNegativeBTC] = useState(false);
  const [negativeETH, setNegativeETH] = useState(false);
  const [negativeLINK, setNegativeLINK] = useState(false);

  // coingecko price 데이터와 chainlink price 데이터 차이의 변화율을 저장합니다
  const [rateOfDifferentBTC, setRateOfDifferentBTC] = useState('');
  const [rateOfDifferentETH, setRateOfDifferentETH] = useState('');
  const [rateOfDifferentLINK, setRateOfDifferentLINK] = useState('');

  // coingecko price 데이터와 chainlink price 데이터 차이의 변화율의 음수와 양수를 판단합니다
  const [negativeBTCDiffer, setNegativeBTCDiffer] = useState(false);
  const [negativeETHDiffer, setNegativeETHDiffer] = useState(false);
  const [negativeLINKDiffer, setNegativeLINKDiffer] = useState(false);

  useEffect(() => {
    // coingecko price 데이터와 chainlink price 데이터 차이의 변화율을 계산합니다
    const calcDifferentBTC =
      Math.round(((priceBTCLink / priceBTCGecko) * 100 - 100) * 1000) / 1000;
    setRateOfDifferentBTC(calcDifferentBTC);

    const calcDifferentETH =
      Math.round(((priceETHLink / priceETHGecko) * 100 - 100) * 1000) / 1000;
    setRateOfDifferentETH(calcDifferentETH);

    const calcDifferentLINK =
      Math.round(((priceLINKLink / priceLINKGecko) * 100 - 100) * 1000) / 1000;
    setRateOfDifferentLINK(calcDifferentLINK);

    if (changeRateBTCGecko < 0) setNegativeBTC(true);
    if (changeRateETHGecko < 0) setNegativeETH(true);
    if (changeRateLINKGecko < 0) setNegativeLINK(true);

    if (rateOfDifferentBTC < 0) {
      setNegativeBTCDiffer(true);
    }

    if (rateOfDifferentETH < 0) {
      setNegativeETHDiffer(true);
    }

    if (rateOfDifferentLINK < 0) {
      setNegativeLINKDiffer(true);
    }
  });

  return (
    <>
      <div className="flex-col bg-backgroundColor">
        <div className="flex justify-center">
          <div className="flex-col w-[25%] mr-[1.25%]">
            <div className="text-center font-extrabold text-3xl my-[2rem]">
              CoinGecko
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
                  <div className="font-semibold text-sm text-right">
                    $ {priceBTCGecko}
                  </div>
                  <div>
                    {negativeBTC === false ? (
                      <div className="font-medium text-green text-sm text-right">
                        +{changeRateBTCGecko}%
                      </div>
                    ) : (
                      <div className="font-medium text-red text-sm text-right">
                        {changeRateBTCGecko}%
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
                  <div className="font-semibold text-sm text-right">
                    $ {priceETHGecko}
                  </div>
                  <div>
                    {negativeETH === false ? (
                      <div className="font-medium text-green text-sm text-right">
                        +{changeRateETHGecko}%
                      </div>
                    ) : (
                      <div className="font-medium text-red text-sm text-right">
                        {changeRateETHGecko}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="marketPriceCard p-[1rem] rounded-2xl">
              <div className="flex">
                <img
                  src={linkSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Chainlink</div>
                  <div className="font-normal text-lightGray text-xs">
                    24 Hours Variation
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm text-right">
                    $ {priceLINKGecko}
                  </div>
                  <div>
                    {negativeLINK === false ? (
                      <div className="font-medium text-green text-sm text-right">
                        +{changeRateLINKGecko}%
                      </div>
                    ) : (
                      <div className="font-medium text-red text-sm text-right">
                        {changeRateLINKGecko}%
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
                    Price Difference From CoinGecko
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm text-right">
                    $ {priceBTCLink}
                  </div>

                  <div>
                    {negativeBTCDiffer === false ? (
                      <div className="font-medium text-greenLight text-sm text-right">
                        +{rateOfDifferentBTC}%
                      </div>
                    ) : (
                      <div className="font-medium text-redLight text-sm text-right">
                        {rateOfDifferentBTC}%
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
                    Price Difference From CoinGecko
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm text-right">
                    $ {priceETHLink}
                  </div>
                  <div>
                    {negativeETHDiffer === false ? (
                      <div className="font-medium text-greenLight text-sm text-right">
                        +{rateOfDifferentETH}%
                      </div>
                    ) : (
                      <div className="font-medium text-redLight text-sm text-right">
                        {rateOfDifferentETH}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="marketPriceCard p-[1rem] rounded-2xl">
              <div className="flex">
                <img
                  src={linkSymbol}
                  alt="btcSymbol"
                  className="w-[3rem] h-[3rem]"
                />
                <div className="flex-col ml-[1rem] grow">
                  <div className="font-extrabold text-xl">Chainlink</div>
                  <div className="font-normal text-lightGray text-xs">
                    Price Difference From CoinGecko
                  </div>
                </div>
                <div className="flex-col m-auto p-auto">
                  <div className="font-semibold text-sm text-right">
                    $ {priceLINKLink}
                  </div>
                  <div>
                    {negativeLINKDiffer === false ? (
                      <div className="font-medium text-greenLight text-sm text-right">
                        +{rateOfDifferentLINK}%
                      </div>
                    ) : (
                      <div className="font-medium text-redLight text-sm text-right">
                        {rateOfDifferentLINK}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lightGray text-[8px] text-right mt-[1rem]">
              <p>CoinGecko Prices Updated at : {updatedTimeGecko}</p>
            </div>
            <div className="text-lightGray text-[8px] text-right mb-[1rem]">
              <p>Chainlink Prices Updated at : {updatedTimeLink}</p>
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
