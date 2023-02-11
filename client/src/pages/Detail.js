// modules
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// components
import AcceptedCard from '../components/AcceptedCard';
import MarketPrice from '../components/MarketPrice';

// actions
import { 
  openModal, 
  closeModal, 
  setWaiting, 
  setProcessing, 
  setSuccess, 
  setFail  
} from '../features/modalSlice';

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
  calculateRemainingPeriod,
  calculatePeriodByInterval,
  parseUnixtimeToDate
} from '../utils/calendar';

import {
  firstLetterToCapital
} from '../utils/CDS';

// Constant Number
const DAY = 60 * 60 * 24;

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CDS = useCDS();
  const ERC20 = useERC20();

  // CDS Info State
  const { swapId } = useParams();
  const userAddress = useSelector((state) => state.auth.user_addr);
  const [assetType, setAssetType] = useState('bitcoin');
  const [swapOnDB, setSwapOnDB] = useState(null);
  const [timeRemainingToPay, setTimeRemainingToPay] = useState(null);

  // CDS Availability
  const [isPayablePremium, setIsPayablePremium] = useState(false);
  const [isClaimable, setIsClaimable] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Market Price
  const prices = useSelector(state=>state.priceByGecko);
  const priceBTCGecko = useSelector(state=>state.priceByGecko.priceBTCGecko);
  const priceETHGecko = useSelector(state=>state.priceByGecko.priceETHGecko);
  const priceLINKGecko = useSelector(state=>state.priceByGecko.priceLINKGecko);

  // Returninig function for Callback
  const closeNotice = (isRedirect)=>{
    if (isRedirect) return ()=>{
      navigate('/')
      dispatch( closeModal() );
      dispatch( setWaiting() );
    }
    else return ()=>{
      dispatch( closeModal() );
      dispatch( setWaiting() );
    }
  }

  /********************/
  //     Handler      //
  /********************/

  // CDS pay premium Handler
  const premiumButtonHandler = async () => {
    console.log(swapId);

    if (!isPayablePremium) return new Error('Not Payable!');

    try {
      dispatch( openModal() );
      dispatch( setProcessing() );

      const premium = await CDS.getPremium(swapId);
      console.log(premium);

      const approved = await ERC20.approve(premium, userAddress);
      console.log(approved)

      const result = await CDS.payPremium(swapId, userAddress);
      
      console.log(result);

      dispatch( setSuccess() );
      setTimeout(closeNotice(true), 3000);
    } catch (err) {
      dispatch( setFail() );
      console.log(err);

      setTimeout(closeNotice(false) ,3000);
    }
  };

  // CDS Claim Handler
  const claimButtonHandler = async () => {
    console.log(swapId);

    if (!isClaimable) return new Error('Not Claimable!');

    try {
      dispatch( openModal() );
      dispatch( setProcessing() );

      const result = await CDS.claim(
        swapId,
        userAddress,
      );   

      console.log(result);

      dispatch( setSuccess() );
      setTimeout(closeNotice(true), 3000);
    } catch (err) {
      dispatch( setFail() );
      console.log(err);

      setTimeout(closeNotice(false) ,3000);
    }
  };

  // CDS Close Handler
  const closeButtonHandler = async () => {
    console.log(swapId);

    try{
      dispatch( openModal() );
      dispatch( setProcessing() );

      const result = await CDS.close(
        swapId,
        userAddress,
      );

      console.log(result);
      
      dispatch( setSuccess() );
      setTimeout(closeNotice(true), 3000);
    } catch (err) {
      dispatch( setFail() );
      console.log(err);

      setTimeout(closeNotice(false) ,3000);
    }
  };

  // CDS expire Handler
  const expireButtonHandler = async() => {
    if (!isExpired) return new Error('Not Expried');

    try{
      dispatch( openModal() );
      dispatch( setProcessing() );

      const result = await CDS.expire(
        swapId,
        userAddress,
      );

      console.log(result);
      
      dispatch( setSuccess() );
      setTimeout(closeNotice(true), 3000)
    } catch (err) {
      dispatch( setFail() );
      console.log(err);

      setTimeout(closeNotice(false) ,3000);
    }
  }

  // go to User Info Handler
  const addressClickHandler = (address)=>{
    return ()=>{
      navigate(`/user/${address}`);
    }
  };

  // load Server Data for CDS
  useEffect(() => {
    getSwapById(swapId).then((result) => {
      if (result) {
        if(result.status === 'pending') navigate(`/`);
        console.log(result);
        setSwapOnDB(result);
        setAssetType(result.assetType);
      }
      else {
        console.log(result);
        navigate('/NotFound');
      }
    }).catch(err=>{
      console.log(err);
      navigate('/');
    })
    ;
  }, []);

  // Set Inveravl to get Remaining Time for Paying Premium
  useEffect(() => {
    let intervalId;
    if(CDS){
      CDS.getRounds(swapId).then((rounds)=>{
        console.log(`rounds: ${rounds}`);
        if(rounds <= 0) setIsExpired(true);
      });

      CDS.getNextPayDate(swapId).then((result) => {
        const nextPayDate = Number(result);
        intervalId = setInterval(() => {
          const current = parseInt(new Date().getTime() / 1000);
          console.log(`Remaining Period: ${nextPayDate-current}`);
          setTimeRemainingToPay( calculateRemainingPeriod(current, nextPayDate) );
        }, 1000);
      });
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [CDS]);

  // Check current status available to claim
  useEffect(()=>{
    if( CDS ){
      CDS.getPrices(swapId).then(([,claimPrice,liquidationPrice,])=>{
        console.log(`claimPrice: ${claimPrice}`);

        switch(assetType){
          case 'bitcoin':
            console.log(`Market Price: ${prices.priceBTCGecko}`);
            if ( prices.priceBTCGecko < claimPrice) {
              setIsClaimable(true);
              break;
            };
            setIsClaimable(false);
            break;
          case 'ether': 
            console.log(`Market Price: ${prices.priceETHGecko}`);
            if ( prices.priceETHGecko < claimPrice){ 
              setIsClaimable(true);
              break;
            };
            setIsClaimable(false);
            break;
          case 'link': 
            console.log(`Market Price: ${prices.priceLINKGecko}`);
            if ( prices.priceLINKGecko < claimPrice){ 
              setIsClaimable(true);
              break;
            };
            setIsClaimable(false);
            break;
          default :
            setIsClaimable(false);
        }
      })
    }
  }, [CDS, priceBTCGecko])

  // Check current status available to paying premium
  useEffect(()=>{
    if(timeRemainingToPay < DAY * 3) setIsPayablePremium(true);
    else setIsPayablePremium(false);
  }, [timeRemainingToPay])

  useEffect(()=>{
    console.log(prices);
  }, [prices])

  return (
    <>
      <div className="container container-detail">
        <div className="detail-head">
          <div className="detail-head-section">
            <div className="detail-title-group">
              <h1 className="detail-title">{firstLetterToCapital(assetType)} Crypto Default Swap</h1>
              <p className="detail-issued">Issued on {swapOnDB? parseUnixtimeToDate(swapOnDB.createdAt) : null}</p>
              <p className="detail-period">Remaining Period to Pay: { timeRemainingToPay }</p>
            </div>
            <div className="detail-party">
              <div className="party-item">
                <p className="party-role">Buyer Address</p>
                <p className="party-address" onClick={addressClickHandler(swapOnDB && swapOnDB.buyer)}>
                  {swapOnDB ? swapOnDB.buyer : ''}
                </p>
              </div>
              <div className="party-item">
                <p className="party-role">Seller Address</p>
                <p className="party-address" onClick={addressClickHandler(swapOnDB && swapOnDB.seller)}>
                  {swapOnDB ? swapOnDB.seller : ''}
                </p>
              </div>
              <div className="party-item">
                <p className="party-role">Status</p>
                <p className="party-address">
                  {swapOnDB ? swapOnDB.status : ''}
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
                <p className="item-name">Total Rounds</p>
                <p className="item-figures">
                  {swapOnDB ? `${swapOnDB.totalPremiumRounds} rounds` : ''}
                </p>
              </div>
              <div className="content-item">
                <p className="item-name">Remaining Rounds</p>
                <p className="item-figures">
                  {swapOnDB ? `${swapOnDB.remainPremiumRounds} rounds` : ''}
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
                disabled={!isExpired}
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
