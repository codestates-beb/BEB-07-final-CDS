// modules
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import AcceptedCard from '../components/AcceptedCard';
import MarketPrice from '../components/MarketPrice';

// apis
import { getSwapById } from '../apis/request';

// hooks
import useCDS from '../utils/hooks/useCDS';
import useERC20 from '../utils/hooks/useERC20';

// css
import '../assets/css/detail.css';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

// utils
import { 
  calculatePeriodByInterval,
  parseUnixtimeToDate
} from '../utils/calendar';

// Constant Number
const DAY = 60 * 60 * 24;

function Detail() {
  const navigate = useNavigate();
  const CDS = useCDS();
  const ERC20 = useERC20();

  // CDS Info State
  const { swapId } = useParams();
  const userAddress = useSelector((state) => state.auth.user_addr);
  const [swapOnDB, setSwapOnDB] = useState(null);
  const [timeRemainingToPay, setTimeRemainingToPay] = useState(null);
  

  // CDS Availability
  const [isPayablePremium, setIsPayablePremium] = useState(false);
  const [isClaimable, setIsClaimable] = useState(false);

  // CDS pay premium Handler
  const premiumButtonHandler = async () => {
    console.log(swapId);

    if (!isPayablePremium) return new Error('Not Payable!');

    try {
      const premium = await CDS.getPremium(swapId);
      console.log(premium);

      const approved = await ERC20.approve(premium, userAddress);
      console.log(approved)

      const result = await CDS.payPremium(swapId, userAddress);
      
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // CDS Claim Handler
  const claimButtonHandler = async () => {
    console.log(swapId);

    if (!isClaimable) return new Error('Not Claimable!');

    try {
      const result = await CDS.claim(
        swapId,
        userAddress,
      );   

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // CDS Close Handler
  const closeButtonHandler = async () => {
    console.log(swapId);

    try{
      const result = await CDS.close(
        swapId,
        userAddress,
      );
      
      console.log(result);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // CDS expire Handler
  const expireButtonHandler = async() => {
    console.log(swapId);

    try{
      const result = await CDS.expire(
        swapId,
        userAddress,
      );

      console.log(result);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSwapById(swapId).then((result) => {
      if (result) setSwapOnDB(result);
      else {
        console.log(result);
        navigate('/NotFound');
      }
    });
  }, []);

  useEffect(()=>{
    if(timeRemainingToPay < DAY) setIsPayablePremium(true);
  }, [timeRemainingToPay])

  useEffect(() => {
    let intervalId;
    const nextTimeDummy = parseInt(new Date().getTime() / 1000) + 3600;
    const current = parseInt(new Date().getTime() / 1000);

    setTimeRemainingToPay( nextTimeDummy - current );

    // if (CDS) {
    //   CDS.getNextPayDate(swapId).then((result) => {
    //     // console.log(result);
    //     intervalId = setInterval(() => {
    //       const current = parseInt(new Date().getTime() / 1000);
    //       setTimeRemainingToPay(calculateTimeRemaining(current, result));
    //     }, 1000);
    //   });
    // }

    return () => {
      clearInterval(intervalId);
    };
  }, [CDS]);

  return (
    <>
      <div className="container container-detail">
        <div className="detail-head">
          <div className="detail-head-section">
            <div className="detail-title-group">
              <h1 className="detail-title">Bitcoin Crypto Default Swap</h1>
              <p className="detail-issued">Issued on {swapOnDB? parseUnixtimeToDate(swapOnDB.createdAt) : null}</p>
              <p className="detail-issued">Remaining Period to Pay: { calculatePeriodByInterval( timeRemainingToPay ) }</p>
            </div>
            <div className="detail-party">
              <div className="party-item">
                <p className="party-role">Buyer Address</p>
                <p className="party-address">
                  {swapOnDB ? swapOnDB.buyer : ''}
                </p>
              </div>
              <div className="party-item">
                <p className="party-role">Seller Address</p>
                <p className="party-address">
                  {swapOnDB ? swapOnDB.seller : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="detail-head-card">
            {swapOnDB ? (
              <AcceptedCard
                swapId={swapOnDB.swapId}
                InitialPrice={swapOnDB.initialAssetPrice}
                ClaimPrice={swapOnDB.claimPrice}
                Liquidation
                Price={swapOnDB.liquidationPrice}
              />
            ) : (
              <AcceptedCard />
            )}
          </div>
        </div>
        {/* head */}
        <div className="detail-content">
          <div className="detail-content-section">
            <h2 className="content-section-title">Assets</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Initial Price of Assets</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.initialAssetPrice ).toLocaleString()}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">The Amount of Assets</p>
                <p className="item-figures">
                  {swapOnDB ? `${Number( swapOnDB.amountOfAssets ).toLocaleString()}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Total Assets</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.totalAssets ).toLocaleString()}` : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="detail-content-section">
            <h2 className="content-section-title">Claim</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Claim Price</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.claimPrice ).toLocaleString()}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Drop Rate</p>
                <p className="item-figures">
                  {swapOnDB ? `${swapOnDB.dropRate * 100} %` : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="detail-content-section">
            <h2 className="content-section-title">Premium</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Premium Rate</p>
                <p className="item-figures">
                  {swapOnDB ? `${swapOnDB.premiumRate} %` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Price</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.premium ).toLocaleString()}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Interval</p>
                <p className="item-figures">
                  {swapOnDB
                    ? `${calculatePeriodByInterval(swapOnDB.premiumInterval)}`
                    : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Rounds</p>
                <p className="item-figures">
                  {swapOnDB ? `${swapOnDB.totalPremiumRounds} rounds` : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="detail-content-section">
            <h2 className="content-section-title">Liquidation</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Seller Deposit</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.sellerDeposit ).toLocaleString()}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Liquidation Price</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.liquidationPrice ).toLocaleString()}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Buyer Deposit</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${Number( swapOnDB.buyerDeposit ).toLocaleString()}` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="fixed bottom-11 right-11">
          <ScrollButton />
        </div>
      </div>
      <div className="flex justify-center py-[8rem]">
        <hr className="line w-[320px] border-b-2 border-primaryColor" />
      </div>
      <div className="detail-tail">
        <div className="detail-price">
          <MarketPrice />
          <div className="button-group">
            {swapOnDB && swapOnDB.buyer.toLowerCase() === userAddress ? (
              <>
                <button
                  className="button pay-button"
                  onClick={premiumButtonHandler}
                  disabled={!isPayablePremium}
                >
                  Pay Premium
                </button>
                <button
                  className="button claim-button"
                  onClick={claimButtonHandler}
                  disabled={!isClaimable}
                >
                  Claim
                </button>
                <button
                  className="button close-button"
                  onClick={closeButtonHandler}
                >
                  Close
                </button>
              </>
            ) : (
              <></>
            )}
            {swapOnDB && swapOnDB.seller.toLowerCase() === userAddress ? 
              <button
                className="button close-button"
                onClick={expireButtonHandler}
              >
                Expire
              </button>
            :
              <></>
            }
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Detail;
