//image
import diamond1 from '../assets/img/diamonds/diamond_1.png';
import diamond2 from '../assets/img/diamonds/diamond_2.png';
import diamond3 from '../assets/img/diamonds/diamond_3.png';
import diamond4 from '../assets/img/diamonds/diamond_4.png';
import diamond5 from '../assets/img/diamonds/diamond_5.png';
import diamond6 from '../assets/img/diamonds/diamond_6.png';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

// css
import '../assets/css/risks.css';

function Risks() {
  return (
    <>
      <div className="w-[60%] text-center mx-auto mt-[7rem] mb-[5rem]">
        <div className="text-7xl font-bold mb-[2.5rem] flex justify-center ">
          <p className="text-primaryColor">DeFi</p>
          <p>&nbsp;Risks</p>
        </div>
        <div className="text-xl font-semibold mb-[1rem]">
          DeFi is a short for Decentralized Finance and is a new alternative to
          traditional finance (TradFi).
        </div>
        <div className="text-lg text-darkGrayColor">
          <p>
            {' '}
            Traditional finance is based on trust in the government or banks.
          </p>
          <p>
            {' '}
            However, blockchain supports transactions that allow you to see
            everything in real time in a decentralized distributed ledger.
          </p>
          <p>
            {' '}
            Like TradiFi, there’re financial risks in DeFi that you can lose
            your valuable assets at one moment.
          </p>
        </div>
      </div>
      <div className="w-[60%] flex mx-auto">
        <img src={diamond1} alt="diamond1"></img>
        <div className="riskText p-[2rem] bg-moreDarkGrayColor rounded-2xl ml-[3rem]">
          <div className="text-3xl font-bold mb-[1rem]">
            Exploits of Smart Contract Bugs
          </div>
          <div className="text-lg text-grayForText">
            This is a DeFi risk that could be encountered due to the discovery
            of a serious defect in the smart contact itself distributed like The
            DAO hacking incident.
          </div>
        </div>
      </div>
      <div className="w-[60%] flex mx-auto my-[3.5rem]">
        <img src={diamond2} alt="diamond1"></img>
        <div className="riskText p-[2rem] bg-moreDarkGrayColor rounded-2xl ml-[3rem]">
          <div className="text-3xl font-bold mb-[1rem]">
            Oracle Manipulation
          </div>
          <div className=" text-lg text-grayForText">
            If the data provided by Oracle Node contains malicious content, it
            could have a fatal impact on all connected DeFi projects. Fake data
            could lead to unfair liquidation prices or malicious arbitrage.
          </div>
        </div>
      </div>
      <div className="w-[60%] flex mx-auto my-[3.5rem]">
        <img src={diamond3} alt="diamond1"></img>
        <div className="riskText p-[2rem] bg-moreDarkGrayColor rounded-2xl ml-[3rem]">
          <div className="text-3xl font-bold mb-[1rem]">Rug Pulls</div>
          <div className=" text-lg text-grayForText">
            Some DeFi projects leverage social media and marketing capabilities
            to lure investors, pocket huge sums of money, and then disappear.
          </div>
        </div>
      </div>
      <div className="w-[60%] flex mx-auto my-[3.5rem]">
        <img src={diamond4} alt="diamond1"></img>
        <div className="riskText p-[2rem] bg-moreDarkGrayColor rounded-2xl ml-[3rem]">
          <div className="text-3xl font-bold mb-[1rem]">Flash Loan Attack</div>
          <div className="text-lg text-grayForText">
            Flash Loan allows you to temporarily set up collateral and take out
            loans in a single transaction, and then use the borrowed
            cryptocurrency to manipulate the market price of crypto assets and
            take profits. Sometimes these attacks cause DEX liquidity pools and
            DeFi to collapse.
          </div>
        </div>
      </div>
      <div className="w-[60%] flex mx-auto my-[3.5rem]">
        <img src={diamond5} alt="diamond1"></img>
        <div className="riskText p-[2rem] bg-moreDarkGrayColor rounded-2xl ml-[3rem]">
          <div className="text-3xl font-bold mb-[1rem]">Legal Issues</div>
          <div className=" text-lg text-grayForText">
            Cryptocurrency is a new type of assets that have yet to operate
            stably within the institutional sphere. As a result, sudden
            government regulatory risks could have a fatal impact on the price
            of crypto assets and DeFi projects.
          </div>
        </div>
      </div>
      <div className="w-[60%] flex mx-auto my-[3.5rem]">
        <img src={diamond6} alt="diamond1"></img>
        <div className="riskText p-[2rem] bg-moreDarkGrayColor rounded-2xl ml-[3rem]">
          <div className="text-3xl font-bold mb-[1rem]">
            Macroeconomic Events Affect Crypto Currency
          </div>
          <div className=" text-lg text-grayForText">
            The world economy's rapid inflation and quantitative easing policies
            to cope with recession, such as the 2008 financial crisis and the
            pandemic, have a significant impact on the volatility and prices of
            cryptocurrencies and DeFi projects.
          </div>
        </div>
      </div>
      <div className="text-center text-sm font-bold my-[10rem] text-darkGrayColor">
        <p className="my-[1rem]">
          Cryptocurrency prices and DeFi projects are exposed to various risks.{' '}
        </p>
        <p>With CDS implemented on Smart Contract,</p>
        <p>
          you can respond to the rapid price drop of crypto assets resulting
          from these events.
        </p>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Risks;
