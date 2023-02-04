// modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// actions
import { setAuth } from '../features/authSlice';

// hooks
import useMetamask from '../utils/hooks/useMetamask';
import useCDS from '../utils/hooks/useCDS';

// utils
import {
  calculateTotalAssets,
  calculateClaimPrice,
  calculateDropRate,
  calculateSellerDeposit,
  calculateLiquidationPrice,
  calculatePremiumPrice,
} from '../utils/calculator';
import {
  onlyNumber
} from '../utils/validation';
import {
  weeksToUnixTime
} from '../utils/calendar';

// css
import '../assets/css/negotiate.css';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

function Create() {
  const metamask = useMetamask();
  const CDS = useCDS();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Authoirization Var
  const isLogin = useSelector((state) => state.auth.isLogin);

  // CDS Creator Role => 0: Buyer, 1: Seller
  const [isBuyer, setIsbuyer] = useState(true);

  // CDS Content State Variable
  const [contractAddress, setContractAddress] = useState('');
  const userAddress = useSelector((state) => state.auth.user_addr);

  // Assets State Var
  const [initialPriceOfAssets, setInitialPriceOfAssets] = useState('');
  const [amountOfAssets, setAmountOfAssets] = useState('');
  const [totalAssets, setTotalAssets] = useState();

  // Claim State Var
  const [claimPrice, setClaimPrice] = useState('');
  const [dropRate, setDropRate] = useState('0');

  // Premium State Var
  const [premiumRate, setPremiumRate] = useState(2);
  const [premiumPrice, setPremiumPrice] = useState('');
  const [premiumInterval, setPremiumInterval] = useState('4');
  const [premiumRounds, setPremiumRounds] = useState('');

  // Liqudation State Var
  const [sellerDeposit, setSellerDeposit] = useState('');
  const [liquidationPrice, setLiquidationPrice] = useState('');

  // Create CDS Handler
  const createButtonHandler = async () =>{
    const data = {
      isBuyer,
      initialPriceOfAssets,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premiumPrice,
      premiumInterval: weeksToUnixTime(premiumInterval),
      premiumRounds,
      userAddress,
    };
    console.log(data);

    try {
      const result = await CDS.createSwap(data, userAddress);
      console.log(result);
      const swapId = result.events.CreateSwap.returnValues.swapId;
      console.log(swapId);

      navigate('/');
    } catch(err){
      console.log(err);
    }
    
  }

  // Connect Wallet Handler
  const connectButtonHandler = async () => {
    const result = await metamask.request({ method: 'eth_requestAccounts' });
    console.log(result);
    if (result && result.length > 0) dispatch(setAuth(result[0]));
  };

  // Calculate Variable
  useEffect(()=>{
    const totalAssetsCalculated = calculateTotalAssets( initialPriceOfAssets, amountOfAssets )
    setTotalAssets( totalAssetsCalculated );
  }, [initialPriceOfAssets, amountOfAssets])

  useEffect(()=>{
    const claimPriceCalculated = calculateClaimPrice(initialPriceOfAssets, dropRate);
    setClaimPrice( claimPriceCalculated );
    setLiquidationPrice( claimPriceCalculated );

    const premiumPriceCalculated = calculatePremiumPrice(
      initialPriceOfAssets, 
      amountOfAssets, 
      dropRate,
      premiumRate
    );
    setPremiumPrice( premiumPriceCalculated );
  }, [initialPriceOfAssets, dropRate, premiumRate])

  useEffect(()=>{
    setSellerDeposit( calculateSellerDeposit(
      initialPriceOfAssets, 
      amountOfAssets, 
      liquidationPrice
    ));
  }, [totalAssets, liquidationPrice])

  return (
    <>
      <div className="negotiate-banner">
        <img />
      </div>
      <div className="container container-negotiate">
        <div className="negotiate-head">
          <h1 className="negotiate-head-title">Propose Crypto Default Swap</h1>
          <p className="negotiate-head-notice text-xl font-semibold py-2">
            Welcome! Enter Your Details And Start Creating Crypto Default Swap!
          </p>
          <hr className="line w-[150px] color-[var(--primary-color)]" />
        </div>
        <div className='negotiate-form'>
          <div className='form-section'>
            <h2 className='section-title'>User</h2>
            <div className='input-group'>
              <div className='input-radio'>
                <label><input name='role' type='radio' onChange={e=>setIsbuyer(1)} defaultChecked/>Buyer</label>
                <label><input name='role' type='radio' onChange={e=>setIsbuyer(0)}/>Seller</label>
              </div>
              <div className='input-button'>
                <input 
                  placeholder='User Address'
                  value={userAddress}
                  disabled
                />
                {isLogin?
                  <></>
                  :
                  <button
                    onClick={connectButtonHandler}
                  >
                    Connect Metamask
                  </button>
                }
              </div>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Assets</h2>
            <div className='input-group'>
              <input 
                placeholder='Initial Price of Assets'
                value= { `Initial Price of Assets: ${initialPriceOfAssets}` }
                onChange={e=>{
                  const currentValue = onlyNumber(e.target.value);
                  setInitialPriceOfAssets(currentValue);
                }}
              />
              <input 
                placeholder='The Amount of Assets'
                value={`The Amount of Assets: ${amountOfAssets}` }
                onChange={e=>{
                  const currentValue = onlyNumber(e.target.value);
                  setAmountOfAssets(currentValue);
                }}
              />
              <input 
                placeholder='Total Assets'
                value={`Total Assets: ${totalAssets}`}
                readOnly
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Claim</h2>
            <div className='input-group'>
              <input 
                placeholder='Claim Price'
                value={`Claim Price: ${claimPrice}`}
                onChange={e=>{
                  const currentValue = onlyNumber(e.target.value);
                  setClaimPrice(currentValue);
                }}
                disabled
              />
              <div className='input-range'>
                <input
                  className='value'
                  value={`Drop Rate: ${dropRate} %`}
                  disabled
                />
                <input 
                  className='range'
                  type='range'
                  min='0'
                  max='100'
                  placeholder='Drop Rate'
                  value={dropRate}
                  onChange={e=>{setDropRate(e.target.value)}}
                />
              </div>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Premium</h2>
            <div className='input-group'>
              <div className='input-range'>
                <input placeholder='Premium Rate' value={`Premium Rate: ${premiumRate} %`} disabled/>
                <input
                  className='range'
                  type='range'
                  value={premiumRate}
                  max={20}
                  min={0}
                  onChange={e=>setPremiumRate(e.target.value)}
                />
              </div>
              <input 
                placeholder='Premium Price'
                value={`Premium Price: ${premiumPrice}`}
                disabled
              />
              <div className='input-select'>
                <input 
                  placeholder='Premium Interval'
                  value={`Premium Interval: ${premiumInterval} weeks`}
                  disabled
                />
                <select 
                  placeholder='Premium Interval'
                  defaultValue='4'
                  onChange={e=>setPremiumInterval(e.target.value)}
                >
                  <option value='4'>4 weeks</option>
                  <option value='8'>8 weeks</option>
                  <option value='12'>12 weeks</option>
                </select>
              </div>
              <input 
                placeholder='Premium Rounds'
                value={`Premium Rounds: ${premiumRounds}`}
                onChange={e=>{
                  const currentValue = onlyNumber(e.target.value);
                  setPremiumRounds(currentValue);
                }}
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Liquidation</h2>
            <div className='input-group'>
              <input 
                placeholder='Seller Deposit'
                value={`Seller Deposit: ${sellerDeposit}`}
                disabled
              />
              <div className='input-range'>
                <input 
                  className='value'
                  placeholder='Liquidated Price'
                  value={`Liquidated Price: ${liquidationPrice}`}
                  max={claimPrice || 0}
                  onChange={e=>{
                    const currentValue = onlyNumber(e.target.value);
                    if( Number(currentValue) > Number(claimPrice) ) return;
                    else setLiquidationPrice(currentValue);
                  }}
                />
                <input
                  className='range'
                  type='range'
                  value={liquidationPrice}
                  max={claimPrice || 0}
                  min='0'
                  onChange={e=>setLiquidationPrice(e.target.value)}
                />
              </div>
              <input 
                placeholder='Buyer Deposit'
                value={`Buyer Deposit: ${premiumPrice * 3}`}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <div className='button-group'>
              <button 
                className='negotiate-button'
                onClick={createButtonHandler}
              >
                Create And Propose CDS</button>
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

export default Create;
