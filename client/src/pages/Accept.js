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

// apis
import { getSwapById } from '../apis/request';

// utils
import { calculateTimeRemaining } from '../utils/calendar';

// css
import '../assets/css/negotiate.css';

// imgage
import acceptBackGround from '../assets/img/acceptPage_bg.jpg';

function Accept() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { swapId } = useParams();
  const [swapOnChain, setSwapOnChain] = useState(null);
  const [swapOnDB, setSwapOnDB] = useState(null);

  const [isBuyer, setIsBuyer] = useState(null);
  const [proposer, setProposer] = useState(null);

  const userAddress = useSelector((state) => state.auth.user_addr);
  const CDS = useCDS();

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

    const deposits = await CDS.getDeposits(swapId);
    console.log(deposits);

    const deposit = isBuyer ? swapOnDB.sellerDeposit : swapOnDB.buyerDeposit;
    console.log(deposit);

    try {
      dispatch(openModal());
      dispatch(setProcessing());

      const result = await CDS.acceptSwap(
        swapOnDB.initialAssetPrice,
        swapId,
        deposit,
        userAddress,
      );

      console.log(result);
      dispatch(setSuccess());

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

  // Cancel CDS Handler
  const cancelButtonHandler = async () => {
    console.log(swapId);

    try {
      dispatch(openModal());
      dispatch(setProcessing());

      const result = await CDS.cancelSwap(swapId, userAddress);
      console.log(result);
      dispatch(setSuccess());

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
        setSwapOnChain(result);
      });
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
      <div className="container container-negotiate">
        <div className="negotiate-head">
          <h1 className="negotiate-head-title">Check Crypto Default Swap</h1>
          <p className="negotiate-head-notice text-xl font-semibold py-2">
            Check Your Crypto Default Swap Contract in detail and sign it!
          </p>
          <hr className="line w-[150px] color-[var(--primary-color)]" />
        </div>
        <div className="negotiate-form">
          <div className="form-section">
            <h2 className="section-title">Address</h2>
            <div className="input-group">
              <div className="input-button">
                {isBuyer ? (
                  <input
                    value={swapOnDB ? `Buyer Address: ${proposer}` : null}
                    disabled
                  />
                ) : (
                  <input
                    value={swapOnDB ? `Seller Address: ${proposer}` : null}
                    disabled
                  />
                )}
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Assets</h2>
            <div className="input-group">
              <div className='input-wrapper'>
                <input
                  placeholder="Initial Price of Assets"
                  value={
                    swapOnDB
                      ? `Initial Price of Assets: ${swapOnDB.initialAssetPrice}`
                      : null
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <input
                  placeholder="The Amount of Assets"
                  value={
                    swapOnDB
                      ? `The Amount of Assets: ${swapOnDB.amountOfAssets}`
                      : null
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <input
                  placeholder="Total Assets"
                  value={
                    swapOnDB ? `Total Assets: ${swapOnDB.totalAssets}` : null
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
                <input
                  placeholder="Claim Price"
                  value={swapOnDB ? `Claim Price: ${swapOnDB.claimPrice}` : null}
                  disabled
                />
              </div>
              <div className="input-range">
                <input
                  placeholder="Drop Rate"
                  value={
                    swapOnDB ? `Drop Rate: ${swapOnDB.dropRate * 100} %` : null
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
                    swapOnDB ? `Premium Rate: ${swapOnDB.premiumRate}` : null
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <input
                  placeholder="Premium Price"
                  value={swapOnDB ? `Premium Price: ${swapOnDB.premium}` : null}
                  disabled
                />
              </div>
              <div className="input-select">
                <input
                  placeholder="Premium Interval"
                  value={
                    swapOnDB
                      ? `Premium Interval: ${calculateTimeRemaining(
                          0,
                          swapOnDB.premiumInterval,
                        )}`
                      : null
                  }
                  disabled
                />
              </div>
              <div className='input-wrapper'>
                <input
                  placeholder="Premium Rounds"
                  value={
                    swapOnDB
                      ? `Premium Rounds: ${swapOnDB.totalPremiumRounds}`
                      : null
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
                <input
                  placeholder="Seller Deposit"
                  value={
                    swapOnDB ? `Seller Deposit: ${swapOnDB.sellerDeposit}` : null
                  }
                  disabled
                />
              </div>
              <div className="input-range">
                <input
                  placeholder="Liquidated Price"
                  value={
                    swapOnDB
                      ? `Liquidated Price: ${swapOnDB.liquidationPrice}`
                      : null
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
                <input
                  placeholder="Buyer Deposit"
                  value={
                    swapOnDB ? `Buyer Deposit: ${swapOnDB.buyerDeposit}` : null
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
                Sign CDS
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
