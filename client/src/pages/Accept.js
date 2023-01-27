// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

// hooks
import useCDS from '../utils/hooks/useCDS';

// apis
import { getSwapById } from '../apis/request';

// css
import '../assets/css/accept.css';

function Accept() {
  const {swapId} = useParams();
  const [swapOnChain, setSwapOnChain] = useState(null);
  const [swapOnDB, setSwapOnDB] = useState(null);
  const userAddress = useSelector(state=>state.auth.user_addr);
  const CDS = useCDS();

  // CDS Content State Variable
  const [contractAddress, setContractAddress] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');

  // Assets State Var
  const [initialPriceOfAssets, setInitialPriceOfAssets] = useState('');
  const [amountOfAssets, setAmountOfAssets] = useState('');
  const [totalAssets, setTotalAssets] = useState();

  // Claim State Var
  const [claimPrice, setClaimPrice] = useState('');
  const [dropRate, setDropRate] = useState('');

  // Premium State Var
  const [premiumRate, setPremiumRate] = useState(2);
  const [premiumPrice, setPremiumPrice] = useState('');
  const [premiumInterval, setPremiumInterval] = useState('');
  const [premiumRounds, setPremiumRounds] = useState('');

  // Liqudation State Var
  const [sellerDeposit, setSellerDeposit] = useState('');
  const [liquidationPrice, setLiquidationPrice] = useState('');

  const acceptButtonHandler = async()=>{
    console.log(
      userAddress,
      swapOnChain.initAssetPrice,
      swapId,
      swapOnChain.seller.deposit
    )

    const result = await CDS.acceptSwap(
      userAddress, 
      swapOnChain.initAssetPrice, 
      swapId,
      swapOnChain.seller.deposit
    );
    console.log(result);
  }

  useEffect(()=>{
    getSwapById(swapId)
    .then(result=>{
      setSwapOnDB(result);
    })
  },[])

  useEffect(()=>{
    if(CDS) {
      CDS.getSwap(swapId)
      .then(result=> {
        setSwapOnChain(result);
      });
    };
  }, [CDS]);

  return (
    <>
      <div className='accept-banner'>
        <img/>
      </div>
      <div className='container container-accept'>
        <div className='accept-head'>
          <h1 className='accept-head-title'>Check Crypto Default Swap</h1>
          <p className='accept-head-notice text-2xl font-semibold py-2'>Cehck Your Crypto Default Swap Contract in detail and sign it!</p>
          <hr className='line w-[150px] color-[var(--primary-color)]'/>
        </div>
        <div className='accept-form'>
          <div className='form-section'>
            <h2 className='section-title'>Address</h2>
            <div className='input-group'>
              <div className='input-button'>
                <input 
                  placeholder='Buyer Address'
                  value={swapOnDB? `Buyer Address: ${swapOnDB.buyer}` : null}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Assets</h2>
            <div className='input-group'>
              <input 
                placeholder='Initial Price of Assets' 
                value={swapOnDB? `Initial Price of Assets: ${swapOnDB.initialAssetPrice}`: null}
                disabled
              />
              <input 
                placeholder='The Amount of Assets' 
                value={swapOnDB? `The Amount of Assets: ${swapOnDB.amountOfAssets}` : null}
                disabled
              />
              <input 
                placeholder='Total Assets' 
                value={swapOnDB? `Total Assets: ${swapOnDB.totalAssets}` : null}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Claim</h2>
            <div className='input-group'>
              <input 
                placeholder='Claim Price' 
                value={swapOnDB? `Claim Price: ${swapOnDB.claimPrice}`: null}
                disabled
              />
              <input 
                placeholder='Drop Rate' 
                value={swapOnDB? `Drop Rate: ${swapOnDB.dropRate}`: null}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Premium</h2>
            <div className='input-group'>
              <input 
                placeholder='Premium Rate' 
                value={swapOnDB? `Premium Rate: ${swapOnDB.premiumRate}`: null}
                disabled
              />
              <input 
                placeholder='Premium Price' 
                value={swapOnDB? `Premium Price: ${swapOnDB.premium}`: null}
                disabled
              />
              <div className='input-select'>
                <input 
                  placeholder='Premium Interval' 
                  value={swapOnDB? `Premium Interval: ${swapOnDB.premiumInterval}`: null}
                  disabled
                />
              </div>
              <input 
                placeholder='Premium Rounds' 
                value={swapOnDB? `Premium Rounds: ${swapOnDB.totalPremiumRounds}`: null}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Liquiditaion</h2>
            <div className='input-group'>
              <input 
                placeholder='Seller Deposit' 
                value={swapOnDB? `Seller Deposit: ${swapOnDB.sellerDeposit}`: null}
                disabled
              />
              <input 
                placeholder='Liquidated Price' 
                value={swapOnDB? `Liquidated Price: ${swapOnDB.liquidationPrice}`: null}
                disabled
              />
              <input 
                placeholder='Buyer Deposit'
                value={swapOnDB? `Buyer Deposit: ${swapOnDB.buyerDeposit}`: null} 
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <div className='button-group'>
              <button
                className='accept-button' 
                onClick={acceptButtonHandler}
              >
                Sign CDS
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Accept ;