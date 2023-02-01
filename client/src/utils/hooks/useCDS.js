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
        createSwap: async (data)=>{
          const {
            buyerAddress, 
            initialPriceOfAssets,
            amountOfAssets, 
            claimPrice, 
            liquidationPrice,
            sellerDeposit,
            premiumPrice,
            premiumInterval,
            premiumRounds
          } = data;

          if (
            !buyerAddress
            || !initialPriceOfAssets
            || !amountOfAssets
            || !claimPrice
            || !liquidationPrice
            || !sellerDeposit
            || !premiumPrice
            || !premiumInterval
            || !premiumRounds
          ) return new Error("Not valid inputs");

          const receipt = await contract.methods.createSwap(
            buyerAddress, 
            initialPriceOfAssets,
            amountOfAssets,
            claimPrice, 
            liquidationPrice,
            sellerDeposit,
            premiumPrice,
            premiumInterval,
            premiumRounds
          )
          .send({from:buyerAddress, value: premiumPrice * 3}, (result)=>{
            console.log(result);
          })

          return receipt;
        },

        acceptSwap: async (sellerAddress, initialPriceOfAssets, swapId, sellerDeposit)=>{
          if(!sellerAddress || !initialPriceOfAssets || !swapId || !sellerDeposit)
            return new Error("Invalid Arguments");

          const receipt = await contract.methods.acceptSwap(
            sellerAddress, 
            initialPriceOfAssets, 
            swapId
          )
          .send({from:sellerAddress, value: sellerDeposit});

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
          console.log(receipt);
          return receipt
        }
      }

      setCDS(CDSToSet);
    }
  }, [])

  return CDS;
}

export default useCDS;