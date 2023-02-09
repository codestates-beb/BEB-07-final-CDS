// modules
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import AcceptedCardType2 from '../components/AcceptedCardType2';
import MarketPriceType2 from '../components/MarketPriceType2';

// apis
import { getSwapById } from '../apis/request';

// hooks
import useCDS from '../utils/hooks/useCDS';

// css
import '../assets/css/detail.css';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

// utils
import { calculateTimeRemaining } from '../utils/calendar';

function Detail() {
  const navigate = useNavigate();

  // CDS Info State
  const { swapId } = useParams();
  const userAddress = useSelector((state) => state.auth.user_addr);
  const [swapOnDB, setSwapOnDB] = useState(null);
  const [swapOnChain, setSwapOnChain] = useState(null);
  const [timeRemainingToPay, setTimeRemainingToPay] = useState(null);
  const CDS = useCDS();

  // CDS Availability
  const [isPayablePremium, setIsPayablePremium] = useState(false);
  const [isClaimable, setIsClaimable] = useState(false);

  // CDS pay premium Handler
  const premiumButtonHandler = async () => {
    console.log(swapId);

    try {
      const result = await CDS.payPremium(
        swapId,
        userAddress,
        swapOnChain.premium,
      );

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // CDS Cancel Handler
  const cancelButtonHandler = async () => {
    console.log(swapId);

    try {
      const result = await CDS.cancelSwap(swapId, userAddress);

      console.log(result);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // CDS Claim Handler
  const claimButtonHandler = async () => {
    console.log(swapId);

    try {
      const result = await CDS.claimSwap(swapId, userAddress);

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // CDS Close Handler
  const closeButtonHandler = async () => {
    console.log(swapId);

    try {
      const result = await CDS.closeSwap(swapId, userAddress);

      console.log(result);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSwapById(swapId).then((result) => {
      if (result) setSwapOnDB(result);
      else {
        console.log(result);
        navigate('/NotFound');
      }
    });
  }, []);

  useEffect(() => {
    let intervalId;
    if (CDS) {
      CDS.getNextPayDate(swapId).then((result) => {
        console.log(result);
        intervalId = setInterval(() => {
          const current = parseInt(new Date().getTime() / 1000);
          setTimeRemainingToPay(calculateTimeRemaining(current, result));
        }, 1000);
      });
    }

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
              <p className="detail-issued">Issued on Jan 22, 2023</p>
              <p className="detail-payday">{timeRemainingToPay}</p>
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
              <AcceptedCardType2
                swapId={swapOnDB.swapId}
                InitialPrice={swapOnDB.initialAssetPrice}
                ClaimPrice={swapOnDB.claimPrice}
                Liquidation
                Price={swapOnDB.liquidationPrice}
              />
            ) : (
              <AcceptedCardType2 />
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
                  {swapOnDB ? `$ ${swapOnDB.initialAssetPrice}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">The Amount of Assets</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${swapOnDB.amountOfAssets}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Total Assets</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${swapOnDB.totalAssets}` : ''}
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
                  {swapOnDB ? `$ ${swapOnDB.claimPrice}` : ''}
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
                  {swapOnDB ? `$ ${swapOnDB.premium}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Interval</p>
                <p className="item-figures">
                  {swapOnDB
                    ? `${calculateTimeRemaining(0, swapOnDB.premiumInterval)}`
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
                  {swapOnDB ? `$ ${swapOnDB.sellerDeposit}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Liquidation Price</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${swapOnDB.liquidationPrice}` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Buyer Deposit</p>
                <p className="item-figures">
                  {swapOnDB ? `$ ${swapOnDB.buyerDeposit}` : ''}
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
          <MarketPriceType2 />
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
                  className="button cancel-button"
                  onClick={cancelButtonHandler}
                >
                  Cancel
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
