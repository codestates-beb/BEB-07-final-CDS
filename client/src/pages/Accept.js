// modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// components
import Footer from '../components/Footer';
import ScrollButton from '../components/ScrollButton';

// actions
import {
  openModal,
  closeModal,
  setProcessing,
  setSuccess,
  setFail,
  setWaiting,
} from '../features/modalSlice';

// hooks
import useCDS from '../utils/hooks/useCDS';
import useERC20 from '../utils/hooks/useERC20';

// apis
import { getSwapById } from '../apis/request';

// utils
import { calculatePeriodByInterval } from '../utils/calendar';

// css
import '../assets/css/negotiate.css';

// imgage
import acceptBackGround from '../assets/img/acceptPage_bg.jpg';

function Accept() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CDS = useCDS();
  const ERC20 = useERC20();

  const { swapId } = useParams();
  const [swapOnChain, setSwapOnChain] = useState(null);
  const [swapOnDB, setSwapOnDB] = useState(null);

  const [isBuyer, setIsBuyer] = useState(null);
  const [proposer, setProposer] = useState(null);
  const [premiumOnChain, setPremiumOnChain] = useState(null);
  const [sellerDepositOnChain, setSellerDepositOnchain] = useState(null);

  const userAddress = useSelector((state) => state.auth.user_addr);

  // Accept CDS Handler
  const acceptButtonHandler = async () => {
    console.log(
      swapOnDB.initialAssetPrice,
      swapId,
      swapOnDB.buyerDeposit,
      swapOnDB.sellerDeposit,
      swapOnDB.buyer,
      swapOnDB.seller,
    );

    try {
      // Notice Modal open
      dispatch(openModal());
      dispatch(setProcessing());

      // Calculate User's Deposit
      const deposit = isBuyer ? sellerDepositOnChain : premiumOnChain * 4;
      console.log(deposit);

      // Approve token amount to Contract
      const approved = await ERC20.approve(deposit, userAddress);
      console.log(approved);

      // Accept Swap
      const result = await CDS.accept(
        swapOnDB.initialAssetPrice,
        swapId,
        userAddress,
      );

      console.log(result);
      dispatch(setSuccess(swapId));

      setTimeout(() => {
        dispatch(closeModal());
        dispatch(setWaiting());
        navigate('/');
      }, 3000);
    } catch (err) {
      console.log(err);

      const timeoutId = setTimeout(() => {
        dispatch(closeModal());
        dispatch(setWaiting());
        navigate('/');
      }, 3000);

      dispatch( setFail(timeoutId) );
    }
  };

  // Cancel CDS Handler
  const cancelButtonHandler = async () => {
    console.log(swapId);

    try {
      dispatch(openModal());
      dispatch(setProcessing());

      const result = await CDS.cancel(swapId, userAddress);
      console.log(result);
      dispatch(setSuccess(swapId));

      setTimeout(() => {
        dispatch(closeModal());
        dispatch(setWaiting());
        navigate('/');
      }, 3000);
    } catch (err) {
      console.log(err);

      const timeoutId = setTimeout(() => {
        dispatch(closeModal());
        dispatch(setWaiting());
        navigate('/');
      }, 3000);

      dispatch(setFail(timeoutId));
    }
  };

  useEffect(() => {
    getSwapById(swapId).then((result) => {
      if (result === null) navigate('/NotFound');
      setSwapOnDB(result);

      if (result.buyer) {
        setIsBuyer(true);
        setProposer(result.buyer);
      } else {
        setIsBuyer(false);
        setProposer(result.seller);
      }
    });
  }, []);

  useEffect(() => {
    if (CDS) {
      CDS.getSwap(swapId).then((result) => {
        console.log(`Swap OnChain: ${result}`);
        setSwapOnChain(result);
      });

      CDS.getPremium(swapId).then((result) =>{
        console.log(`Premium OnChain: ${result}`);
        setPremiumOnChain(result);
      })

      CDS.getSellerDeposit(swapId).then(result=>{
        console.log(`Deposits OnChain: ${result}`);
        setSellerDepositOnchain(result);
      })
    }
  }, [CDS]);

  useEffect(() => {
    if (swapOnDB) {
      console.log(`Address Logined : ${userAddress}`);
      console.log(`Address's Propsoer : ${proposer.toLowerCase()}`);
      console.log(
        `Address Logined === Address's Proposer ${
          userAddress === proposer.toLowerCase()
        }`,
      );
    }
  }, [swapOnDB, userAddress]);

  return (
    <>
      <div className="negotiate-banner">
        <img src={acceptBackGround} alt="acceptBackGround" />
      </div>
      <div className="container container-negotiate accpet">
        <div className="negotiate-head">
          <h1 className="negotiate-head-title">
            Check Crypto Default Swap proposed by
            { isBuyer ? 
              <span className="text-green ml-2">Buyer</span> 
              : <span className="text-red ml-2">Seller</span>
            }
          </h1>
          <p className="negotiate-head-notice text-xl font-semibold py-2">
            Check Your Crypto Default Swap Contract in detail and sign it!
          </p>
          <hr className="line w-[150px] color-[var(--primary-color)]" />
        </div>
        <div className="negotiate-form">
          <div className="form-section">
            <h2 className="section-title">Proposer Address</h2>
            <div className="input-group">
              <div className="input-wrapper">
                {isBuyer ? (
                  <>
                    <input
                      value={swapOnDB ? proposer : ''}
                      disabled
                    />
                  </>
                ) : (
                  <>
                    <input
                      value={swapOnDB ? proposer : ''}
                      disabled
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Assets</h2>
            <div className="input-group">
              <div className='input-wrapper'>
                <div className='input-label'>Initial Price of Assets</div>
                <input
                  value={ swapOnDB
                    ? `$ ${Number( swapOnDB.initialAssetPrice ).toLocaleString()}`
                    : ''
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <div className='input-label'>The Amount of Assets</div>
                <input
                  value={ swapOnDB 
                    ? `# ${Number( swapOnDB.amountOfAssets ).toLocaleString()}`
                    : ''}
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <div className='input-label'>Total Assets</div>
                <input
                  value={swapOnDB 
                    ? `$ ${Number(swapOnDB.totalAssets).toLocaleString()}`
                    : ''
                  }
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Claim</h2>
            <div className="input-group">
              <div className='input-wrapper'>
                <div className='input-label'>Claim Price</div>
                <input
                  value={swapOnDB ? `$ ${Number(swapOnDB.claimPrice).toLocaleString()}` : ''}
                  disabled
                />
              </div>
              <div className="input-range">
                <input
                  placeholder="Drop Rate"
                  value={
                    swapOnDB ? `Drop Rate: ${swapOnDB.dropRate * 100} %` : ''
                  }
                  disabled
                />
                <input
                  className="range"
                  type="range"
                  min="0"
                  max="100"
                  value={swapOnDB ? swapOnDB.dropRate * 100 : 0}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Premium</h2>
            <div className="input-group">
              <div className='input-wrapper'>
                <input
                  placeholder="Premium Rate"
                  value={
                    swapOnDB ? `Premium Rate: ${swapOnDB.premiumRate} %` : ''
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <div className='input-label'>Premium Price</div>
                <input
                  value={swapOnDB ? `$ ${Number(swapOnDB.premium).toLocaleString()}` : ''}
                  disabled
                />
              </div>
              <div className="input-select">
                <input
                  placeholder="Premium Interval"
                  value={
                    swapOnDB
                      ? `Premium Interval: ${calculatePeriodByInterval(swapOnDB.premiumInterval)}`
                      : ''
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <div className='input-label'>Premium Rounds</div>
                <input
                  value={
                    swapOnDB
                      ? Number(swapOnDB.totalPremiumRounds).toLocaleString()
                      : ''
                  }
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Liquidation</h2>
            <div className="input-group">
              <div className='input-wrapper'>
                <div className='input-label'>Seller Deposit</div>
                <input
                  value={
                    swapOnDB ? `$ ${Number( swapOnDB.sellerDeposit ).toLocaleString()}` : ''
                  }
                  disabled
                />
              </div>
              <div className="input-range">
                <input
                  placeholder="Liquidated Price"
                  value={
                    swapOnDB
                      ? `Liquidated Price: ${Number( swapOnDB.liquidationPrice ).toLocaleString()}`
                      : ''
                  }
                  disabled
                />
                <input
                  className="range"
                  type="range"
                  value={swapOnDB ? swapOnDB.liquidationPrice : 0}
                  max={swapOnDB ? swapOnDB.initialAssetPrice : 0}
                  min={0}
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <div className='input-label'>Buyer Deposit</div>
                <input
                  value={
                    swapOnDB ? `$ ${Number( swapOnDB.buyerDeposit ).toLocaleString()}` : ''
                  }
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <div className="button-group">
              {swapOnDB && proposer.toLowerCase() === userAddress ? (
                <button
                  className="cancel-button hover:bg-mintHover transition delay-80"
                  onClick={cancelButtonHandler}
                >
                  Cancel CDS
                </button>
              ) : (
                <></>
              )}
              <button
                className="negotiate-button hover:bg-mintHover transition delay-80"
                onClick={acceptButtonHandler}
              >
                Accept CDS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-11 right-11">
        <ScrollButton />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Accept;
