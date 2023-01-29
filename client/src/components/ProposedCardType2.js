// modules
import { Link } from 'react-router-dom';

//image
import BTCCard from '../assets/img/BTC_Card_bg.jpg';

// css
import '../assets/css/proposed_advanced.css';

function ProposedCard_type2(props) {
  return (
    <>
      <div className="card m-[4rem] w-[15rem] h-[25rem] rounded-2xl border-color-white">
        <img
          className="cardImg w-[85%] h-[35%] m-[7.5%] object-cover opacity-100 rounded-2xl"
          alt="BitcoinLogo"
          src={BTCCard}
        />
        <div className="mx-[10%]">
          <div className="mb-[4%] text-2xl font-extrabold">Bitcoin CDS</div>
          <div className="mb-[2%]">
            <div className="font-medium text-base">Premium</div>
            <div className="font-light text-xs">
              {props.premium} (per{' '}
              {Math.floor((props.premiumInterval / 604800) * 100) / 100} weeks)
            </div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-base">Required Deposit</div>
            <div className="font-light text-xs">{props.requiredDeposit}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-base">Expire Date</div>
            <div className="font-light text-xs">
              {' '}
              {(Math.floor((props.premiumInterval / 604800) * 100) / 100) *
                props.premiumRounds}{' '}
              weeks later
            </div>
          </div>
        </div>
        <button className="w-[80%] h-[6%] my-[4%] mx-[10%] rounded-3xl bg-primaryColor content-center">
          <Link to={`/accept/${props.swapId}`} className="text-sm font-bold">More Details</Link>
        </button>
      </div>
    </>
  );
}

export default ProposedCard_type2;
