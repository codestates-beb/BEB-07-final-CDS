// modules
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

//image
import BTCCard from '../assets/img/BTC_Card_bg.jpeg';
import ETHCard from '../assets/img/ETH_Card_bg.jpg';
import LINKCard from '../assets/img/LINK_Card_bg.png';

// css
import '../assets/css/cdsCard.css';

// utils
import { calculateRemainingPeriod } from '../utils/calendar';

function AcceptedCard(props) {
  // 자산 종류에 따라 다른 이름과 image를 보여줍니다
  const [CardName, setCardName] = useState('');

  const [BTCPic, setBTCPic] = useState(false);
  const [ETHPic, setETHPic] = useState(false);
  const [LINKPic, setLINKPic] = useState(false);

  useEffect(() => {
    if (props.assetType === 'bitcoin') {
      setCardName('Bitcoin');
      setBTCPic(true);
    } else if (props.assetType === 'ether') {
      setCardName('Ether');
      setETHPic(true);
    } else {
      setCardName('Chainlink');
      setLINKPic(true);
    }
  }, [props.assetType]);

  return (
    <>
      <div className="card my-[4rem] w-[15rem] h-[25rem] rounded-2xl border-color-white drop-shadow-md">
        {BTCPic ? (
          <img
            className="cardImg w-[85%] h-[35%] mx-[7%] mt-[7%] mb-[5%] object-cover opacity-100 rounded-2xl"
            alt="BitcoinLogo"
            src={BTCCard}
          />
        ) : ETHPic ? (
          <img
            className="cardImg w-[85%] h-[35%] mx-[7%] mt-[7%] mb-[5%] object-cover opacity-100 rounded-2xl"
            alt="BitcoinLogo"
            src={ETHCard}
          />
        ) : (
          <img
            className="cardImg w-[85%] h-[35%] mx-[7%] mt-[7%] mb-[5%] object-cover opacity-100 rounded-2xl"
            alt="BitcoinLogo"
            src={LINKCard}
          />
        )}
        <div className="mx-[10%]">
          <div className="text-2xl font-extrabold">{CardName} CDS</div>
          <div className="mb-[4%] flex font-semibold text-[9px]">
            <p>Remaining Period to Pay:</p>
            <p className="text-mint text-[9px]">&nbsp;</p>
            <p className="text-mint text-[10px]">{props.timeRemainingToPay}</p>
          </div>

          <div className="mb-[2%]">
            <div className="font-medium text-sm">Initial Price</div>
            <div className="font-light text-xs">$ {props.InitialPrice}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-sm">Claim Price</div>
            <div className="font-light text-xs">$ {props.ClaimPrice}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-sm">Liquidation Price</div>
            <div className="font-light text-xs">$ {props.Price}</div>
          </div>
        </div>
        <Link to={`/detail/${props.swapId}`} className="text-sm font-bold">
          <button className="w-[80%] h-[6%] my-[4%] mx-[10%] rounded-3xl bg-primaryColor content-center drop-shadow-md hover:bg-mintHover transition delay-100">
            More Details
          </button>
        </Link>
      </div>
    </>
  );
}

export default AcceptedCard;
