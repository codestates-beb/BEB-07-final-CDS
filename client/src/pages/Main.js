// modules
import { Link } from 'react-router-dom';

//image
import MainLogo from '../img/CDS_Symbol_bright_removebg.png';

// components
import MarketPrice from '../components/MarketPrice.js';
import Card from '../components/Card.js';
import Footer from '../components/Footer.js';

function Main() {
  return (
    <div className="">
      <div className="MainTextBox flex w-screen mx-auto mt-24 justify-center">
        <div className="mr-80 w-[33.5rem] h-[29rem]">
          <div className="text-7xl">
            <h1 className="mb-[1.5rem]">Crypto</h1>
            <h1 className="mb-[1.5rem]">Default Swap</h1>
          </div>
          <div className="text-xl">
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
            <Link to="/createTest">
              <button className="mt-10 rounded-2xl w-80 h-12 text-lg font-semibold bg-primaryColor hover:scale-105 transition-all">
                Create Crypto Default Swap (CDS)
              </button>
            </Link>
          </div>
        </div>
        <img
          className="logoImg w-[28.5rem] h-[28.5rem] hover:scale-110 transition-all"
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
        <div className="mt-[2.5rem] w-[50rem] h-[10rem] text-center font-medium text-xl">
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
        <div className="mt-64 font-bold text-4xl mb-[2rem] mr-[60rem] text-center">
          Proposed CDSs
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-y-8 gap-x-[6.25rem] justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Main;
