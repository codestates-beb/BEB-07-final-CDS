import ETHLogo from '../img/ETH_Logo.png';

function Card() {
  return (
    <div className="card bg-darkGrayColor w-[13rem] h-[17rem] rounded-3xl hover:scale-110 transition-all">
      <div className="mx-[1.5rem] py-[1.5rem]">
        <div className="card-head">
          <div className="cds-image">
            <img
              className="w-10 h-10 bg-white"
              alt="BitcoinLogo"
              src={ETHLogo}
            />
          </div>
          <div className="cds-type my-[0.4rem] font-semibold text-2xl">
            <h2>Ether CDS</h2>
          </div>
        </div>
        <div className="card-body">
          <div className="body-content mb-[5px]">
            <h3 className="content-name text-base font-medium">
              Initial Price
            </h3>
            <p className="content text-sm font-light">$ 20,964.20</p>
          </div>
          <div className="body-content mb-[5px]">
            <h3 className="content-name text-base font-medium">Claim Price</h3>
            <p className="content text-sm font-light">$ 15,201.50</p>
          </div>
          <div className="body-content">
            <h3 className="content-name text-base font-medium">
              Liquidation Price
            </h3>
            <p className="content text-sm font-light">$ 10,121.80</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
