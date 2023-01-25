import BTHLogo from '../img/BTC_Logo.png';

function Card() {
  return (
    <div className="card bg-darkGrayColor w-60 h-80 rounded-3xl hover:scale-110 transition-all">
      <div className="mx-[1.5rem] py-[2.2rem]">
        <div className="card-head">
          <div className="cds-image">
            <img
              className="w-12 h-12 bg-white"
              alt="BitcoinLogo"
              src={BTHLogo}
            />
          </div>
          <div className="cds-type my-[0.7rem] font-semibold text-3xl">
            <h2>Bitcoin CDS</h2>
          </div>
        </div>
        <div className="card-body">
          <div className="body-content mb-[10px]">
            <h3 className="content-name text-base font-medium">Premium</h3>
            <p className="content text-sm font-light">2 ETH (per 4 weeks)</p>
          </div>
          <div className="body-content mb-[10px]">
            <h3 className="content-name text-base font-medium">
              Requested Seller Deposit
            </h3>
            <p className="content text-sm font-light">100 ETH</p>
          </div>
          <div className="body-content">
            <h3 className="content-name text-base font-medium">Premium</h3>
            <p className="content text-sm font-light">
              16 weeks later from sign
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
