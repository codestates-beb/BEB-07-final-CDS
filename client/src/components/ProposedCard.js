import BTHLogo from '../assets/img/BTC_Logo.png';

function ProposedCard(props) {
  function getSymbol(symbol) {
    const symbolURL = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
    return symbolURL;
  }

  const btcSymbol = getSymbol('btc');
  const ethSymbol = getSymbol('eth');
  const dogeSymbol = getSymbol('doge');

  return (
    <div className="card bg-darkGrayColor w-[13rem] h-[17rem] rounded-3xl hover:scale-110 transition-all">
      <div className="mx-[1.5rem] py-[1.5rem]">
        <div className="card-head">
          <div className="cds-image">
            <img
              className="w-10 h-10 bg-white"
              alt="BitcoinLogo"
              src={btcSymbol}
            />
          </div>
          <div className="cds-type my-[0.4rem] font-semibold text-2xl">
            <h2>Bitcoin CDS</h2>
          </div>
        </div>
        <div className="card-body">
          <div className="body-content mb-[5px]">
            <h3 className="content-name text-base font-medium">Premium</h3>
            <p className="content text-sm font-light overflow-hidden">
              {props.premium} (per{' '}
              {Math.floor((props.premiumInterval / 604800) * 100) / 100} weeks)
            </p>
          </div>
          <div className="body-content mb-[5px]">
            <h3 className="content-name text-base font-medium">
              Required Deposit
            </h3>
            <p className="content text-sm font-light">
              {props.requiredDeposit}
            </p>
          </div>
          <div className="body-content">
            <h3 className="content-name text-base font-medium">Expire Date</h3>
            <p className="content text-sm font-light">
              {(Math.floor((props.premiumInterval / 604800) * 100) / 100) *
                props.premiumRounds}{' '}
              weeks later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposedCard;
