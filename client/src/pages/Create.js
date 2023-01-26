// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// hooks
import useMetamask from '../utils/hooks/useMetamask';

// utils
import {
  calculateTotalAssets,
  calculateClaimPrice,
  calculateDropRate,
  calculateLiquidationPrice,
  calculatePremiumPrice,
} from '../utils/calculator';
import createContract from '../utils/CDS';

// config
import config from '../config/config';

// css
import '../assets/css/create.css';

function Create() {
  const metamask = useMetamask();
  const CDS = createContract(config.contractAddr);

  // CDS Content State Variable
  const [contractAddress, setContractAddress] = useState('');
  const buyerAddress = useSelector((state) => state.auth.user_addr);

  // Assets State Var
  const [initialPriceOfAssets, setInitialPriceOfAssets] = useState('');
  const [amountOfAssets, setAmountOfAssets] = useState('');
  const [totalAssets, setTotalAssets] = useState('');

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
        <div className="create-form">
          <div className="form-section">
            <h2 className="section-title">Address</h2>
            <div className="input-group">
              <div className="input-button">
                <input placeholder="Buyer Address" />
                <button>Connect Metamask</button>
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Assets</h2>
            <div className="input-group">
              <input placeholder="Initial Price of Assets" />
              <input placeholder="The Amount of Assets" />
              <input placeholder="Total Assets" />
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Claim</h2>
            <div className="input-group">
              <input placeholder="Claim Price" />
              <input placeholder="Drop Rate" />
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Premium</h2>
            <div className="input-group">
              <input placeholder="Premium Rate" />
              <input placeholder="Premium Price" />
              <div className="input-select">
                <input placeholder="Premium Interval"></input>
                <select placeholder="Premium Interval">
                  <option>12 months</option>
                  <option>6 months</option>
                  <option>3 months</option>
                </select>
              </div>
              <input placeholder="Premium Rounds" />
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">Liquiditaion</h2>
            <div className="input-group">
              <input placeholder="Seller Deposit" />
              <input placeholder="Liquidated Price" />
              <input placeholder="Buyer Deposit" />
            </div>
          </div>
          <div className="form-section">
            <div className="button-group">
              <button className="create-button">Create And Propose CDS</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
