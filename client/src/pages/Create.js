// modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
  calculateLiquidationPrice,
  calculatePremiumPrice,
} from '../utils/calculator';
import {
  onlyNumber
} from '../utils/validation';

// css
import '../assets/css/create.css';

// components
import ScrollButton from '../components/ScrollButton.js';
import Footer from '../components/Footer.js';

function Create() {
  const metamask = useMetamask();
  const CDS = useCDS();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  // CDS Content State Variable
  const [contractAddress, setContractAddress] = useState('');
  const buyerAddress = useSelector((state) => state.auth.user_addr);

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
  const [premiumInterval, setPremiumInterval] = useState('12');
  const [premiumRounds, setPremiumRounds] = useState('');

  // Liqudation State Var
  const [sellerDeposit, setSellerDeposit] = useState('');
  const [liquidationPrice, setLiquidationPrice] = useState('');

  // Create CDS Handler
  const createButtonHandler = async () =>{
    const data = {
      buyerAddress,
      initialPriceOfAssets,
      amountOfAssets,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premiumPrice,
      premiumInterval,
      premiumRounds,
    };

    console.log(data);
    const result = await CDS.createSwap(data);
    console.log(result);
  }

  // Connect Wallet Handler
  const connectButtonHandler = async () => {
    const result = await metamask.request({ method: 'eth_requestAccounts' });
    console.log(result);
    if (result && result.length > 0) dispatch(setAuth(result[0]));
  };

  // Calculate Variable
  useEffect(()=>{
    setTotalAssets( calculateTotalAssets(initialPriceOfAssets, amountOfAssets) );
  }, [initialPriceOfAssets, amountOfAssets])

  useEffect(()=>{
    const dropRateCalculated = calculateDropRate(initialPriceOfAssets, claimPrice);
    setDropRate( dropRateCalculated );

    const premiumPriceCalculated = calculatePremiumPrice(
      initialPriceOfAssets, 
      amountOfAssets, 
      dropRateCalculated, 
      premiumRate
    );
    setPremiumPrice( premiumPriceCalculated );

  }, [initialPriceOfAssets, claimPrice])

  useEffect(()=>{
    setLiquidationPrice( calculateLiquidationPrice(initialPriceOfAssets, amountOfAssets, sellerDeposit) )
  }, [totalAssets, sellerDeposit])

  return (
    <>
      <div className="create-banner">
        <img />
      </div>
      <div className="container container-create">
        <div className="create-head">
          <h1 className="create-head-title">Propose Crypto Default Swap</h1>
          <p className="create-head-notice text-2xl font-semibold py-2">
            Welcome! Enter Your Details And Start Creating Crypto Default Swap!
          </p>
          <hr className="line w-[150px] color-[var(--primary-color)]" />
        </div>
        <div className='create-form'>
          <div className='form-section'>
            <h2 className='section-title'>Address</h2>
            <div className='input-group'>
              <div className='input-button'>
                <input 
                  placeholder='Buyer Address'
                  value={buyerAddress}
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
              />
              <input 
                placeholder='Drop Rate'
                value={`Drop Rate: ${dropRate} %`}
                disabled
              />
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Premium</h2>
            <div className='input-group'>
              <input placeholder='Premium Rate' value='Premium Rate: 2 %' disabled/>
              <input 
                placeholder='Premium Price'
                value={`Premium Price: ${premiumPrice}`}
                disabled
              />
              <div className='input-select'>
                <input 
                  placeholder='Premium Interval'
                  value={`Premium Interval: ${premiumInterval}`}
                  disabled
                />
                <select 
                  placeholder='Premium Interval'
                  defaultValue='12'
                  onChange={e=>setPremiumInterval(e.target.value)}
                >
                  <option value='12'>12 months</option>
                  <option value='6'>6 months</option>
                  <option value='3'>3 months</option>
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
                onChange={e=>{
                  const currentValue = onlyNumber(e.target.value);
                  setSellerDeposit(currentValue);
                }}
              />
              <input 
                placeholder='Liquidated Price'
                value={`Liquidated Price: ${liquidationPrice}`}
                disabled
              />
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
                className='create-button'
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
