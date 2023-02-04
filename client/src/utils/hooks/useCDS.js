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
        createSwap: async (data, userAddress)=>{
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
          else if(isBuyer === false) deposit = sellerDeposit;

          const receipt = await contract.methods.createSwap(
            isBuyer,
            initialPriceOfAssets,
            claimPrice, 
            liquidationPrice,
            sellerDeposit,
            premiumPrice,
            premiumInterval,
            premiumRounds
          )
          .send({from: userAddress, value: deposit}, (result)=>{
            console.log(result);
            return result;
          })
          .on('sent', (result)=>{
            console.log(result);
          });

          console.log(receipt);

          return receipt;
        },

        acceptSwap: async (initialPriceOfAssets, swapId, deposit, userAddress)=>{
          if( !initialPriceOfAssets || !swapId || !deposit || !userAddress)
            return new Error("Invalid Arguments");

          const receipt = await contract.methods.acceptSwap(
            initialPriceOfAssets, 
            swapId
          )
          .send({from:userAddress, value: deposit});

          return receipt;
        },

        cancelSwap: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.cancelSwap(swapId)
          .send({from:address});

          return receipt;
        },

        claimSwap: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.claimSwap(swapId)
          .send({from:address});

          return receipt;
        },

        closeSwap: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.closeSwap(swapId)
          .send({from:address});

          return receipt;
        },

        payPremium: async (swapId, address, premium)=>{
          if(!swapId || !address || premium) return new Error("Invalid Arguments");

          const receipt = await contract.methods.payPremium(swapId)
          .send({from:address, value: premium});
          
          return receipt;
        },

        getSwap: async (swapId)=>{
          const receipt = await contract.methods.getSwap(swapId).call();
          return receipt
        }
      }

      setCDS(CDSToSet);
    }
  }, [])

  return CDS;
}

export default useCDS;