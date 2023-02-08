// modules
import { useState, useEffect } from 'react';
import Web3 from 'web3';

// Contract ABI
import ERC20ABI from '../../assets/contract/ERC20.json';

// config
import config from '../../config/config';

function useERC20() {
    const [ERC20, setERC20] = useState(null);

    useEffect(()=>{
        if( !window.ethereum ) {
            const error = new Error('No install metamask');
            return;
        }

        const web3 = new Web3(window.ethereum);
        const erc20 = new web3.eth.Contract(ERC20ABI.abi, config.erc20Addr);

        const ERC20Listner = {
            transfer: async (amount, sender)=>{
                if(!amount || !sender) return new Error('Invalid Inputs!');

                const result = await erc20.methods.transfer(config.contractAddr, amount)
                .send({from:sender});

                console.log(result);

                return result;
            },

            approve: async (amount, sender)=>{
                if(!amount || !sender) return new Error('Invalid Inputs!');

                const result = await erc20.methods.approve(config.contractAddr, amount)
                .send({from:sender});
                
                console.log(result);

                return result;
            },

            balanceOf: async (address)=>{
              const result = await erc20.methods.balanceOf(address).call();

              console.log(result);

              return result;
            }
        }

        setERC20(ERC20Listner);
    }, [])

    return ERC20;
}

export default useERC20;