// modules
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//image
import MainLogo from '../assets/img/CDS_Symbol_bright_removebg.png';

// components
import InfoSlide from '../components/swiper/infoSlide.js';
import MarketPriceType2 from '../components/MarketPriceType2.js';
import ProposedCardScroll from '../components/swiper/ProposedCardScroll.js';
import AcceptedCardScroll from '../components/swiper/AcceptedCardScroll.js';
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

//APIs
import { getSwaps } from '../apis/request.js';

function Main() {
  // database에서 swap구조체에 대한 정보를 받아옵니다
  const [swapResponse, setResponse] = useState([]);

  useEffect(() => {
    const APIdata = getSwaps();
    const getData = () => {
      APIdata.then((response) => {
        setResponse(response);
        console.log(response);
      });
    };
    getData();
  }, []);

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
        <InfoSlide />
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
      <div className="my-[10rem]">
        <MarketPriceType2 />
      </div>
      <div className="flex-col">
        <div className="mt-32 font-bold text-2xl text-center">
          Proposed CDSs
        </div>
        <div className="mt-4 font-regular text-base text-center text-lightGray">
          <p>Check the proposed CDSs and protect your crypto assets !</p>
          <div className="flex justify-center">
            <p>The contract proposed by</p>
            <p className="text-green"> &nbsp;Buyer&nbsp;</p>
            <p>is displayed in</p>
            <p className="text-green">&nbsp;green</p>
            <p>,</p>
            <p>&nbsp;and the contract proposed by</p>
            <p className="text-red">&nbsp;Seller&nbsp;</p>
            <p>is displayed in</p>
            <p className="text-red">&nbsp;red</p>
            <p>.</p>
          </div>
        </div>
        <div className="">
          <ProposedCardScroll response={swapResponse} />
        </div>
      </div>
      <div className="flex-col">
        <div className="mt-32 font-bold text-2xl text-center">
          Accepted CDSs
        </div>
        <div className="mt-4 font-regular text-base text-center text-lightGray">
          <p>Please check the contract we issued below.</p>
          <p>
            Many customers are already protecting their assets through our
            products.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-screen">
            <AcceptedCardScroll response={swapResponse} />
          </div>
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
