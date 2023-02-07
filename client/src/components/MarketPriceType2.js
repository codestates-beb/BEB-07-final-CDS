// modules
import { useState, useEffect, useRef } from 'react';

// css
import '../assets/css/marketPrice.css';

//APIs
import { getCoinGeckoAPI, getChainLinkAPI } from '../apis/request.js';

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
  const [priceBTCGecko, setPriceBTCGecko] = useState('');
  const [priceETHGecko, setPriceETHGecko] = useState('');
  const [priceLINKGecko, setPriceLINKGecko] = useState('');

  // coinGecko market data의 24 hours change rate을 저장합니다
  const [changeRateBTCGecko, setChangeRateBTCGecko] = useState('');
  const [changeRateETHGecko, setChangeRateETHGecko] = useState('');
  const [changeRateLINKGecko, setChangeRateLINKGecko] = useState('');

  // chainlink data의 price를 저장합니다
  const [priceBTCLink, setPriceBTCLink] = useState('');
  const [priceETHLink, setPriceETHLink] = useState('');
  const [priceLINKLink, setPriceLINKLink] = useState('');

  // market data의 updated timed을 저장합니다
  const [updatedTimeGecko, setTimeGecko] = useState('');
  const [updatedTimeLink, setTimeLink] = useState('');

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

  // setInterval custom hook
  function useInterval(callback, delay) {
    const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

    useEffect(() => {
      savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
      callback(); // 첫번째 랜더링 시 market data를 가져오기 위해 입력받은 callback을 실행한다.
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
      }
      if (delay !== null) {
        // 만약 delay가 null이 아니라면
        let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
        // return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
      }
    }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
  }

  useInterval(() => {
    // CoinGecko와 Chinlink에서 market data를 api로 가져옵니다.
    const coinGeckoData = getCoinGeckoAPI();
    const chainLinkData = getChainLinkAPI();

    const getCoinGeckoData = () => {
      coinGeckoData
        .then((response) => {
          setPriceBTCGecko(response.bitcoin.usd);
          setPriceETHGecko(response.ethereum.usd);
          setPriceLINKGecko(response.chainlink.usd);

          const btcChange = response.bitcoin.usd_24h_change;
          const ethChange = response.ethereum.usd_24h_change;
          const linkChange = response.chainlink.usd_24h_change;
          setChangeRateBTCGecko(btcChange);
          setChangeRateETHGecko(ethChange);
          setChangeRateLINKGecko(linkChange);

          let geckoTimestamp = response.bitcoin.last_updated_at;
          let geckoTime = new Date(geckoTimestamp * 1000);
          let geckoTimeToString = geckoTime.toString();
          setTimeGecko(geckoTimeToString);

          const changes = [btcChange, ethChange, linkChange];

          return changes;
        })
        .then((changes) => {
          if (changes[0] < 0) {
            setNegativeBTC(true);
          }
          if (changes[1] < 0) {
            setNegativeETH(true);
          }
          if (changes[2] < 0) {
            setNegativeLINK(true);
          }
        });
    };

    const getChainLinkData = () => {
      chainLinkData.then((response) => {
        setPriceBTCLink(response.bitcoin.usd);
        setPriceETHLink(response.ethereum.usd);
        setPriceLINKLink(response.chainlink.usd);

        let linkTimestamp = response.bitcoin.last_updated_at;
        let numToString = linkTimestamp.toString();
        let sliceNum = numToString.slice(0, 10);
        let StringToNum = Number(sliceNum);
        let linkTime = new Date(StringToNum * 1000);
        let linkTimeToString = linkTime.toString();
        setTimeLink(linkTimeToString);

        return response;
      });
    };

    getCoinGeckoData();
    getChainLinkData();
  }, 20000); // 20초마다 갱신됩니다.

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
      <div className="flex-col">
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
