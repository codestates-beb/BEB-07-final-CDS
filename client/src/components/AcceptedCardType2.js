// modules
import { Link } from 'react-router-dom';

//image
import ETHCard from '../assets/img/ETH_Card_bg.jpg';

// css
import '../assets/css/proposed_type2.css';

function AcceptedCard_type2(props) {
  return (
    <>
      <div className="card m-[4rem] w-[15rem] h-[25rem] rounded-2xl border-color-white">
        <img
          className="cardImg w-[85%] h-[35%] m-[7.5%] object-cover opacity-100 rounded-2xl"
          alt="EtherLogo"
          src={ETHCard}
        />
        <div className="mx-[10%]">
          <div className="mb-[4%] text-2xl font-extrabold">Ether CDS</div>
          <div className="mb-[2%]">
            <div className="font-medium text-base">Initial Price</div>
            <div className="font-light text-xs">{props.InitialPrice}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-base">Claim Price</div>
            <div className="font-light text-xs">{props.ClaimPrice}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-base">Liquidation Price</div>
            <div className="font-light text-xs">{props.Price}</div>
          </div>
        </div>
        <button className="w-[80%] h-[6%] my-[4%] mx-[10%] rounded-3xl bg-primaryColor content-center">
          <Link to={`/detail/${props.swapId}`} className="text-sm font-bold">
            More Details
          </Link>
        </button>
      </div>
    </>
  );
}

export default AcceptedCard_type2;
