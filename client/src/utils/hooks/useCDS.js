// modules
import { useState, useEffect } from 'react';

// contract
import createCDS from '../CDS';

// config
import config from '../../config/config';

function useCDS() {
  const [CDS, setCDS] = useState(null);

  useEffect(()=>{
    if ( !window.ethereum ){
      setCDS( new Error('Not installed wallet!') );
    } else {
      const {contract} = createCDS( config.contractAddr );

      // CDS Contract Methods
      const CDSToSet = {
        create: async (data, userAddress)=>{
          const {
            isBuyer, 
            initialPriceOfAssets,
            claimPrice, 
            liquidationPrice,
            sellerDeposit,
            premiumPrice,
            premiumInterval,
            premiumRounds
          } = data;

          if (
            !initialPriceOfAssets
            || !claimPrice
            || !liquidationPrice
            || !sellerDeposit
            || !premiumPrice
            || !premiumInterval
            || !premiumRounds
            || !userAddress
          ) return new Error("Not valid inputs");

          let deposit;
          if (isBuyer === true) deposit = premiumPrice * 3;
          else deposit = sellerDeposit;

          const receipt = await contract.methods.create(
            isBuyer,
            initialPriceOfAssets,
            claimPrice, 
            liquidationPrice,
            sellerDeposit,
            premiumPrice,
            premiumInterval,
            premiumRounds
          )
          .send({from: userAddress}, (result)=>{
            console.log(result);
            return result;
          })
          .on('sent', (result)=>{
            console.log(result);
          });

          console.log(receipt);

          return receipt;
        },

        accept: async (initialPriceOfAssets, swapId, deposit, userAddress)=>{          
          if( !initialPriceOfAssets || !swapId || !deposit || !userAddress)
            return new Error("Invalid Arguments");

          const receipt = await contract.methods.accept(
            initialPriceOfAssets, 
            swapId
          )
          .send({from: userAddress});

          return receipt;
        },

        cancel: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.cancel(swapId)
          .send({from:address});

          return receipt;
        },

        claim: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.claim(swapId)
          .send({from:address});

          return receipt;
        },

        close: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.close(swapId)
          .send({from:address});

          return receipt;
        },

        payPremium: async (swapId, address, premium)=>{
          if(!swapId || !address || premium) return new Error("Invalid Arguments");

          const receipt = await contract.methods.payPremium(swapId)
          .send({from:address});
          
          return receipt;
        },

        getSwap: async (swapId)=>{
          const receipt = await contract.methods.getSwap(swapId).call();
          return receipt
        },

        getDeposits: async (swapId) =>{
          const receipt = await contract.methods.getDeposits(swapId).call();
          return receipt;
        },

        getPremium: async (swapId) =>{
          const receipt = await contract.methods.getPremium(swapId).call();
          return receipt;
        }
      }

      setCDS(CDSToSet);
    }
  }, [])

  return CDS;
}

export default useCDS;