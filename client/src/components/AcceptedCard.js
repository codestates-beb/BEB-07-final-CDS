// modules
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//image
import ETHCard from '../assets/img/ETH_Card_bg.jpg';

// css
import '../assets/css/cdsCard.css';

// hooks
import useCDS from '../utils/hooks/useCDS';

// utils
import { calculateRemainingPeriod } from '../utils/calendar';

function AcceptedCard(props) {
  // accepted card component의 remaining perioid를 계산합니다
  const CDS = useCDS();

  const [timeRemainingToPay, setTimeRemainingToPay] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  // Set Inveravl to get Remaining Time for Paying Premium
  useEffect(() => {
    let intervalId;
    if (CDS) {
      CDS.getRounds(props.swapId).then((rounds) => {
        if (rounds <= 0) setIsExpired(true);
      });

      CDS.getNextPayDate(props.swapId).then((result) => {
        const nextPayDate = Number(result);
        intervalId = setInterval(() => {
          const current = parseInt(new Date().getTime() / 1000);
          setTimeRemainingToPay(calculateRemainingPeriod(current, nextPayDate));
        }, 1000);
      });
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [CDS]);

  return (
    <>
      <div className="card my-[4rem] w-[15rem] h-[25rem] rounded-2xl border-color-white drop-shadow-md">
        <img
          className="cardImg w-[85%] h-[35%] mx-[7%] mt-[7%] mb-[5%] object-cover opacity-100 rounded-2xl"
          alt="EtherLogo"
          src={ETHCard}
        />
        <div className="mx-[10%]">
          <div className="text-2xl font-extrabold">Ether CDS</div>
          <div className="mb-[4%] flex font-semibold text-[9px]">
            <p>Remaining Period to Pay:</p>
            <p className="text-mint text-[9px]">&nbsp;</p>
            <p className="text-mint text-[10px]">{timeRemainingToPay}</p>
          </div>

          <div className="mb-[2%]">
            <div className="font-medium text-sm">Initial Price</div>
            <div className="font-light text-xs">{props.InitialPrice}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-sm">Claim Price</div>
            <div className="font-light text-xs">{props.ClaimPrice}</div>
          </div>
          <div className="mb-[2%]">
            <div className="font-medium text-sm">Liquidation Price</div>
            <div className="font-light text-xs">{props.Price}</div>
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
