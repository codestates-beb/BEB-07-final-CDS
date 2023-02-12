// modules
import { Link } from 'react-router-dom';

function Footer() {
  const gihub = 'https://github.com/codestates-beb/BEB-07-final-CDS';

  return (
    <div className="w-screen bg-ligthGrayColor h-[22rem] mt-[10rem]">
      <div className="px-[10rem] pt-[2rem]">
        <div to="/" className="logo-link flex">
          <img
            className="service-logo  w-[4rem] h-[4rem]"
            alt="service-logo"
            src={process.env.PUBLIC_URL + '/img/CDS_Symbol-removebg.png'}
          />
          <div className="service-name ml-[1rem] text-2xl font-extrabold">
            <p className="text-black">Crypto</p>
            <p className="text-black">Default Swap</p>
          </div>
        </div>
        <div className="w-[35rem] h-[3.5rem] mt-[1rem] mb-[2.5rem] text-black">
          <p>We provide blockchain-based decentralized derivatives.</p>
          <p>
            Our team is innovative, challenging and towards decentralization.
          </p>
          <p>Hedge and protect your crypto asset from here.</p>
        </div>
        <div className="flex text-black">
          <div>
            <div className="font-semibold pb-[0.55rem]">Join</div>
            <button
              onClick={() => {
                window.open(gihub);
              }}
            >
              GitHub
            </button>
          </div>
          <div className="ml-[40rem]">
            <div className="font-semibold mr-[3rem] pb-[0.5rem]">About</div>
            <div className="flex">
              <Link to="/cds">
                <div className="mr-[2rem]">Understanding CDS</div>
              </Link>
              <Link to="/risks">
                <div className="mr-[2rem]">Risks</div>
              </Link>
              <Link to="/teams">
                <div>Teams</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[2px] bg-black mt-[1.5rem]"></div>
        <div className="mt-[1rem] text-black text-xs font-medium">
          © 2023 Crypto Default Swap Labs, Inc.
        </div>
      </div>
    </div>
  );
}

export default Footer;
