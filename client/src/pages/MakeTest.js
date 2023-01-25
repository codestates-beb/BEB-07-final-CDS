// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// config
import config from '../config/config';

// hooks
import useMetamask from '../utils/hooks/useMetamask';

// utils
import {
    calculateTotalAssets,
    calculateClaimPrice,
    calculateDropRate,
    calculatePremiumPrice,
    calculateLiquidationPrice,
} from '../utils/calculator';

// css
import '../assets/css/create.css'
import createContract from '../utils/CDS';

function MakeTest() {
    const metamask = useMetamask();
    const CDS = createContract( config.contractAddr );

    // CDS Content State Variable
    const [contractAddress, setContractAddress] = useState('');
    const buyerAddress = useSelector(state=>state.auth.user_addr);

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
    const [premiumInterval, setPremiumInterval] = useState("12");
    const [premiumRounds, setPremiumRounds] = useState('');

        // Liqudation State Var
    const [sellerDeposit, setSellerDeposit] = useState('');
    const [liquidationPrice, setLiquidationPrice] = useState('');

    const setContractAddressHandler = ()=>{
        if (contractAddress.length !== 42) {
            console.log(new Error("Invalid Address"));
            return;
        }
        CDS.setAddr(contractAddress);
        console.log(CDS.contract);
    }

    // make Swap Handler
    const createButtonHandler = async()=>{
        const data = {
            contractAddress,
            initialPriceOfAssets, 
            buyerAddress, 
            totalAssets, 
            claimPrice, 
            premiumPrice, 
            sellerDeposit, 
            liquidationPrice, 
            premiumInterval,
            premiumRounds,
        }

        console.log( data );
        console.log( CDS.contract );

        const result = await CDS.contract.methods
        .createSwap(
            buyerAddress, 
            Number(initialPriceOfAssets),
            Number(claimPrice), 
            Number(liquidationPrice), 
            Number(sellerDeposit), 
            Number(premiumPrice), 
            Number(premiumInterval),
            Number(premiumRounds),
        )
        .send({from: buyerAddress, value: premiumPrice * 3}, (result)=>{
            console.log(result)
        })
        .once('sent', (payload)=>{
            console.log(payload);
        })
        .once('receipt', (receipt)=>{   
            console.log(receipt)
        })
    }


    // Input Client View Logic
    const changeContractAddressHandler = (e)=>{
        setContractAddress(e.target.value);
    }

    const changeAssetsHandler = (e)=>{
        const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
        
        if(e.target.name === 'initial-price-of-assets'){
            setInitialPriceOfAssets(onlyNumber);
            setTotalAssets( calculateTotalAssets(onlyNumber, amountOfAssets) );
        } else {
            setAmountOfAssets(onlyNumber);
            setTotalAssets( calculateTotalAssets(initialPriceOfAssets, onlyNumber) );
        }
    }

    useEffect(()=>{
        setDropRate( calculateDropRate(totalAssets, claimPrice) );
        setPremiumPrice( calculatePremiumPrice(initialPriceOfAssets, amountOfAssets, dropRate, premiumRate) );
        setLiquidationPrice( calculateLiquidationPrice(initialPriceOfAssets, amountOfAssets, sellerDeposit) );
    }, [totalAssets, claimPrice, dropRate, sellerDeposit])

    return (
        <div className='create-container flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Create CDS</h1>
            <div className='width-[600px]'>
                <div className='input-group'>
                    <label>Contract Address</label>
                    <input onChange={changeContractAddressHandler}/>
                    <button
                        className='p-2 border rounded-xl'
                        onClick={setContractAddressHandler}
                    >
                        Set Contract
                    </button>
                </div>
                <div className='input-group'>
                    <label>Buyer Address</label>
                    <input value={buyerAddress} disabled/>
                </div>
                <h1 className="text-xl font-bold">Assets</h1>
                <div className='input-group'>
                    <label>Initial Price of Assets</label>
                    <input 
                        name="initial-price-of-assets" 
                        value={initialPriceOfAssets}
                        onChange={changeAssetsHandler}
                    />
                </div>
                <div className='input-group'>
                    <label>The Amount of Asstes</label>
                    <input 
                        name="amount-of-assets" 
                        value={amountOfAssets}
                        onChange={changeAssetsHandler}    
                    />
                </div>
                <div className='input-group'>
                    <label>Total Assets</label>
                    <input value={totalAssets} disabled={true}/>
                </div>
                <h1 className="text-xl font-bold">Claim</h1>
                <div className='input-group'>
                    <label>Claim Price</label>
                    <input 
                        name="claim-price" 
                        value={claimPrice}
                        onChange={e=>setClaimPrice(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label>Drop Rate</label>
                    <input value={dropRate} disabled={true}/>
                </div>
                <h1 className="text-xl font-bold">Premium</h1>
                <div className='input-group'>
                    <label>Premium Rate</label>
                    <input value="2" disabled={true}/>
                </div>
                <div className='input-group'>
                    <label>Premium Price</label>
                    <input value={premiumPrice} disabled={true}/>
                </div>
                <div className='input-group'>
                    <label>Premium Interval</label>
                    <select 
                        onChange={e=>setPremiumInterval(e.target.value)}
                        defaultValue="12"
                    >
                        <option value="12">12 Month</option>
                        <option value="6">6 Month</option>
                        <option value="3">3 Month</option>
                    </select>
                </div>
                <div className='input-group'>
                    <label>Premium Rounds</label>
                    <input value={premiumRounds} onChange={e=>setPremiumRounds(e.target.value)}/>
                </div>
                <h1 className="text-xl font-bold">Liquidation</h1>
                <div className='input-group'>
                    <label>Seller Deposit</label>
                    <input value={sellerDeposit} onChange={e=>setSellerDeposit(e.target.value)}/>
                </div>
                <div className='input-group'>
                    <label>Liquidated Price</label>
                    <input value={liquidationPrice} disabled={true}/>
                </div>
                <div className="input-group">
                    <label>Buyer Deposit</label>
                    <input value={premiumPrice*3} disabled={true}/>
                </div>
            </div>
            <button 
                className='p-2 border rounded-xl'
                onClick={createButtonHandler}
            >
                Make CDS
            </button>
        </div>
    )
}

export default MakeTest;