// modules
import { useState, useEffect } from 'react';
import Web3 from 'web3';

// Contract ABI
import ERC20ABI from '../../assets/contract/ERC20.json';

// config
import { contractAddr } from '../../config/config';

function useERC20() {
    const [ERC20, setERC20] = useState(null);

    useEffect(()=>{
        if( !window.ethereum ) {
            const error = new Error('No install metamask');
            return;
        }

        const web3 = new Web3(window.ethereum);
        const erc20 = new web3.eth.Contract(ERC20ABI.abi, config.oracleAddr);

        const ERC20Listner = {
            transfer: async (amount, sender)=>{
                if(!amount || !sender) return new Error('Invalid Inputs!');

                const result = await erc20.transfer(contractAddr, amount)
                .send({from:sender});

                console.log(result);

                return result;
            },

            approve: async (amount, sender)=>{
                if(!amount || !sender) return new Error('Invalid Inputs!');

                const result = await erc20.approve(contractAddr, amount)
                .send({from:sender});
                
                console.log(result);

                return result;
            }
        }

        setERC20(ERC20Listner);
    }, [])

    return ERC20;
}

export default useERC20;