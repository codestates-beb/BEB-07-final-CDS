// modules
import { useState, useEffect } from 'react';

// hooks
import useMetamask from '../utils/hooks/useMetamask';

// utils
import {
    calculateTotalAssets,
    calculateClaimPrice,
    calculatePremiumPrice,
    calculateLiquidationPrice,
} from '../utils/calculator';

// css
import '../assets/css/create.css'

function Create() {
    const metamask = useMetamask();

    // CDS Content State Variable
    const [buyerAddress, setBuyerAddress] = useState("");

    const connectButtonHandler = async()=>{
        const result = await metamask.request({method: 'eth_requestAccounts'});
        if (result && result.length > 0) setBuyerAddress(result[0]);
    }

    return (
        <div className='create-container flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Create CDS</h1>
            <button 
                className='p-2 border rounded-xl'
                onClick={connectButtonHandler}
            >
                Connect Metamask</button>
            <div className='width-[600px]'>
                <div className='input-group'>
                    <label>Buyer Address</label>
                    <input value={buyerAddress} disabled/>
                </div>
                <div className='input-group'>
                    <label>Initial Price of Assets</label>
                    <input/>
                </div>
                <div className='input-group'>
                    <label>The Amount of Asstes</label>
                    <input/>
                </div>
                <div className='input-group'>
                    <label>Total Assets</label>
                    <input disabled={true}/>
                </div>
                <div className='input-group'>
                    <label>Claim Price</label>
                    <input/>
                </div>
                <div className='input-group'>
                    <label>Drop Rate</label>
                    <input disabled={true}/>
                </div>
                <div className='input-group'>
                    <label>Premium Rate</label>
                    <input value="2" disabled={true}/>
                </div>
                <div className='input-group'>
                    <label>Premium Price</label>
                    <input/>
                </div>
                <div className='input-group'>
                    <label>Expiration Period</label>
                    <select>
                        <option>12 Month</option>
                        <option>6 Month</option>
                        <option>3 Month</option>
                    </select>
                </div>
                <div className='input-group'>
                    <label>Seller Deposit</label>
                    <input/>
                </div>
                <div className='input-group'>
                    <label>Liquidated Price</label>
                    <input disabled={true}/>
                </div>
                <div className="input-group">
                    <label>Buyer Deposit</label>
                    <input disabled={true}/>
                </div>
            </div>
            <button className='p-2 border rounded-xl'>Create CDS</button>
        </div>
    )
}

export default Create;