import BTHLogo from '../img/BTC_Logo.png';

function ProposedCard() {
  return (
    <div className="card bg-darkGrayColor w-[13rem] h-[17rem] rounded-3xl hover:scale-110 transition-all">
      <div className="mx-[1.5rem] py-[1.5rem]">
        <div className="card-head">
          <div className="cds-image">
            <img
              className="w-10 h-10 bg-white"
              alt="BitcoinLogo"
              src={BTHLogo}
            />
          </div>
          <div className="cds-type my-[0.4rem] font-semibold text-2xl">
            <h2>Bitcoin CDS</h2>
          </div>
        </div>
        <div className="card-body">
          <div className="body-content mb-[5px]">
            <h3 className="content-name text-base font-medium">Premium</h3>
            <p className="content text-sm font-light">2 ETH (per 4 weeks)</p>
          </div>
          <div className="body-content mb-[5px]">
            <h3 className="content-name text-base font-medium">
              Required Deposit
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

export default ProposedCard;
