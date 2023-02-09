// modules
import { useState, useEffect } from 'react';
import Web3 from 'web3';

// Contract ABI
import SwapHandler from '../../assets/contract/SwapHandler.json';

// config
import config from '../../config/config';

function useSwapHandler() {
    const [oracle, setOracle] = useState(null);

    useEffect(()=>{
        if( !window.ethereum ) {
            const error = new Error('No install metamask');
            return;
        }

        const web3 = new Web3(window.ethereum);
        const Oracle = new web3.eth.Contract(SwapHandler.abi, "0x");

        setOracle(Oracle.methods);
    }, [])

    return oracle;
}

export default useSwapHandler;