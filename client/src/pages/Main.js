//image
import MainLogo from '../img/CDS_Symbol_bright_removebg.png';

// components
import MarketPrice from '../components/MarketPrice.js';

function Main() {
  return (
    <div className="">
      <div className="MainTextBox flex w-screennt mx-auto mt-24 justify-center">
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
            <button className="mt-10 rounded-2xl w-80 h-12 text-lg font-semibold bg-primaryColor">
              Create Crypto Default Swap (CDS)
            </button>
          </div>
        </div>
        <img
          className="logoImg w-[28.5rem] h-[28.5rem]"
          alt="MainLogo"
          src={MainLogo}
        />
      </div>
      <div className="w-screennt mx-auto mt-52 flex justify-center">
        <MarketPrice />
      </div>
    </div>
  );
}

export default Main;
