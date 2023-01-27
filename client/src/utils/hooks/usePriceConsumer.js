// modules
import { useState, useEffect } from 'react';
import web3 from 'web3';

// contract
import PriceConsumerABI from '../../assets/contract/PriceConsumer.json';

function usePriceConsumer(){
    const [priceConsumer, setPriceConsumer] = useState();

    useEffect(()=>{
        if ( !window.ethereum ){
            console.log(new Error('Not install metamask!'));
            return;
        }

        const Web3 = new web3(window.ethereum);
    }, [])

    return priceConsumer;
}

export default usePriceConsumer;
