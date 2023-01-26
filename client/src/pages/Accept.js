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
  const [swap, setSwap] = useState(null);
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
      swap.initAssetPrice,
      swapId,
      swap.seller.deposit
    )

    const result = await CDS.acceptSwap(
      userAddress, 
      swap.initAssetPrice, 
      swapId,
      swap.seller.deposit
    );
    console.log(result);
  }

  useEffect(()=>{
    if(CDS) {
      CDS.getSwap(swapId)
      .then(result=> {
        setSwap(result);
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
                  value={`Buyer Address: `}
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
                value={`Initial Price of Assets: `}
                disabled
              />
              <input 
                placeholder='The Amount of Assets' 
                value={`The Amount of Assets: `}
                disabled
              />
              <input 
                placeholder='Total Assets' 
                value={`Total Assets: `}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Claim</h2>
            <div className='input-group'>
              <input 
                placeholder='Claim Price' 
                value={`Claim Price: `}
                disabled
              />
              <input 
                placeholder='Drop Rate' 
                value={`Drop Rate: `}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Premium</h2>
            <div className='input-group'>
              <input 
                placeholder='Premium Rate' 
                value={`Premium Rate: `}
                disabled
              />
              <input 
                placeholder='Premium Price' 
                value={`Premium Price: `}
                disabled
              />
              <div className='input-select'>
                <input 
                  placeholder='Premium Interval' 
                  value={`Premium Interval: `}
                  disabled
                />
              </div>
              <input 
                placeholder='Premium Rounds' 
                value={`Premium Rounds: `}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Liquiditaion</h2>
            <div className='input-group'>
              <input 
                placeholder='Seller Deposit' 
                value={`Seller Deposit: `}
                disabled
              />
              <input 
                placeholder='Liquidated Price' 
                value={`Liquidated Price: `}
                disabled
              />
              <input 
                placeholder='Buyer Deposit'
                value={`Buyer Deposit: `} 
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