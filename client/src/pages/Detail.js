// modules
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import ProposedCard from '../components/ProposedCard';
import MarketPrice from '../components/MarketPrice';

// apis
import { getSwapById } from '../apis/request';

// hooks
import useCDS from '../utils/hooks/useCDS';

// css
import '../assets/css/detail.css';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';


function Detail() {
  const { swapId } = useParams();
  const userAddress = useSelector(state=>state.auth.user_addr);
  const [swapOnDB, setSwapOnDB] = useState(null);
  const CDS = useCDS();

  // CDS Cancel Handler
  const cancelButtonHandler = async()=>{
    console.log(swapId);

    const result = await CDS.cancelSwap(
      swapId,
      userAddress,
    );

    console.log(result);
  }

  // CDS Claim Handler
  const claimButtonHandler = async()=>{
    console.log(swapId);

    const result = await CDS.claimSwap(
      swapId,
      userAddress,
    );   

    console.log(result);
  }

  // CDS Close Handler
  const closeButtonHandler = async()=>{
    console.log(swapId);

    const result = await CDS.closeSwap(
      swapId,
      userAddress,
    );

    console.log(result);
  }

  useEffect(()=>{
    getSwapById(swapId)
    .then(result=> {
      if(result) setSwapOnDB(result);
      else console.log(result);
    })
  }, [])

  return (
    <>
      <div className="container container-detail">
        <div className="detail-head">
          <div className="detail-head-section">
            <div className="detail-title-group">
              <h1 className="detail-title">Bitcoin Crypto Default Swap</h1>
              <p className="detail-issued">Issued on Jan 22, 2023</p>
            </div>
            <div className="detail-party">
              <div className="party-item">
                <p className="party-role">Buyer Address</p>
                <p className="party-address">
                  {swapOnDB? swapOnDB.buyer : ''}
                </p>
              </div>
              <div className="party-item">
                <p className="party-role">Seller Address</p>
                <p className="party-address">
                  {swapOnDB? swapOnDB.seller : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="detail-head-section">
            <ProposedCard response={swapOnDB} />
          </div>
        </div>
        {/* head */}
        <div className="detail-content">
          <div className="detail-content-section">
            <h2 className="content-section-title">Assets</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Initial Price of Assets</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.initialAssetPrice}` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">The Amount of Assets</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.amountOfAssets}` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Total Assets</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.totalAssets}` : ''}</p>
              </div>
            </div>
          </div>
          <div className="detail-content-section">
            <h2 className="content-section-title">Claim</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Claim Price</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.claimPrice}` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Drop Rate</p>
                <p className="item-figures">{swapOnDB ? `${swapOnDB.dropRate * 100} %` : ''}</p>
              </div>
            </div>
          </div>
          <div className="detail-content-section">
            <h2 className="content-section-title">Premium</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Premium Rate</p>
                <p className="item-figures">{swapOnDB ? `${swapOnDB.premiumRate} %` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Price</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.premium}` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Interval</p>
                <p className="item-figures">{swapOnDB ? `${swapOnDB.premiumInterval} seconds` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Premium Rounds</p>
                <p className="item-figures">{swapOnDB ? `${swapOnDB.totalPremiumRounds} rounds` : ''}</p>
              </div>
            </div>
          </div>
          <div className="detail-content-section">
            <h2 className="content-section-title">Liquidation</h2>
            <div className="content-box">
              <div className="content-item">
                <p className="item-name">Seller Deposit</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.sellerDeposit}` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Liquidation Price</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.liquidationPrice}` : ''}</p>
              </div>
              <div className="content-item">
                <p className="item-name">Buyer Deposit</p>
                <p className="item-figures">{swapOnDB ? `$ ${swapOnDB.buyerDeposit}` : ''}</p>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="flex justify-center mt-16 py-14">
          <hr className="line w-[720px] border-b-2 border-primaryColor" />
        </div>
        <div className="detail-tail flex flex-col items-center mb-24">
          <MarketPrice />
          <div className='button-group'>
            { swapOnDB && swapOnDB.buyer.toLowerCase() === userAddress ?
              <>
                <button
                  className='button pay-button'
                >
                  Pay Premium
                </button>
                <button 
                  className='button claim-button'
                  onClick={claimButtonHandler}
                >
                Claim
                </button>
                <button
                  className='button cancel-button'
                  onClick={cancelButtonHandler}
                >
                  Cancel
                </button>
                <button
                  className='button close-button'
                  onClick={closeButtonHandler}
                >
                  Close
                </button>
              </>
              : <></>
            }
          </div>
        </div>
        <div className="fixed bottom-11 right-11">
          <ScrollButton />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Detail;
