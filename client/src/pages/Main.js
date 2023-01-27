// modules
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//image
import MainLogo from '../img/CDS_Symbol_bright_removebg.png';

// components
import MarketPrice from '../components/MarketPrice.js';
import ProposedCard from '../components/ProposedCard.js';
import ConfirmedCard from '../components/ConfirmedCard.js';
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

function Main() {
  const [confirmedSwaps, setConfirmedSwaps] = useState([]);
  const [proposedSwaps, setProposedSwaps] = useState([]);

  useEffect(() => {
    fetch(
      'https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com/dev/swaps',
    )
      .then((response) => response.json())
      .then((data) => {
        const confirmed = data.filter((swap) => swap.status === 'active');
        const proposed = data.filter((swap) => swap.status === 'inactive');
        setConfirmedSwaps(confirmed);
        setProposedSwaps(proposed);
      });
  }, []);

  console.log(proposedSwaps);

  return (
    <div className="">
      <div className="MainTextBox flex w-screen mx-auto mt-24 justify-center">
        <div className="mr-[10%] w-[33.5rem] h-[29rem]">
          <div className="text-6xl font-semibold">
            <h1 className="mb-[1.5rem]">Crypto</h1>
            <h1 className="mb-[1.5rem]">Default Swap</h1>
          </div>
          <div className="text-lg">
            <h1>
              Crypto Default Swap(CDS) project provides a peer-to-peer DeFi
              service that allows users to hedge risks in crypto financial
              markets. Users can purchase CDS to escape downside risks, event
              risks. Buyer pays Seller a premium for a period of time and
              obtains principal guarantees. Crypto Default Swap's contracts are
              transparently stored on a decentralized blockchain. Give safety to
              your crypto assets exposed to risk.
            </h1>
          </div>
          <div>
            <Link to="/create">
              <button className="mt-10 rounded-2xl w-64 h-10 text-sm font-semibold bg-primaryColor hover:scale-105 transition-all">
                Create Crypto Default Swap (CDS)
              </button>
            </Link>
          </div>
        </div>
        <img
          className="logoImg w-[22rem] h-[22rem] hover:scale-110 transition-all"
          alt="MainLogo"
          src={MainLogo}
        />
      </div>
      <div className="w-screen mx-auto mt-52 flex justify-center">
        <MarketPrice />
      </div>
      <div className="flex justify-center w-screen mx-auto">
        <div className="mt-52 font-bold text-4xl">
          Understanding Our Product
        </div>
      </div>
      <div className="flex justify-center w-screen mx-auto">
        <div className="w-[18.5rem] h-[3px] bg-primaryColor mt-[2.5rem]"></div>
      </div>
      <div className="flex justify-center w-screen mx-auto">
        <div className="mt-[2.5rem] w-[50rem] h-[10rem] text-center font-medium text-base">
          Crypto Default Swap(CDS) project provides a peer-to-peer DeFi service
          that allows users to hedge risks in crypto financial markets. Users
          can purchase CDS to escape downside risks, event risks. Buyer pays
          Seller a premium for a period of time and obtains principal
          guarantees. Crypto Default Swap's contracts are transparently stored
          on a decentralized blockchain. Give safety to your crypto assets
          exposed to risk.
        </div>
      </div>
      <div className="flex-col">
        <div className="mt-64 font-bold text-3xl mb-[2rem] mr-[43rem] text-center">
          Proposed CDSs
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-y-7 gap-x-[4rem] justify-center">
          {proposedSwaps.map((swap) => {
            return (
              <div key={swap.swapId}>
                <ProposedCard
                  premium={swap.premium}
                  premiumInterval={swap.premiumInterval}
                  requiredDeposit={swap.sellerDeposit}
                  premiumRounds={swap.totalPremiumRounds}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-col">
        <div className="mt-64 font-bold text-3xl mb-[2rem] mr-[43rem] text-center">
          Accepted CDSs
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-y-7 gap-x-[4rem] justify-center">
          {confirmedSwaps.map((swap) => {
            return (
              <div key={swap.swapId}>
                <ConfirmedCard
                  InitialPrice={swap.initialAssetPrice}
                  ClaimPrice={swap.claimPrice}
                  Liquidation
                  Price={swap.liquidationPrice}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Main;
