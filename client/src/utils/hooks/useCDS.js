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

          contract.methods.createSwap(
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
        },

        acceptSwap: ()=>{

        },

        cancelSwap: ()=>{

        },
      }

      setCDS(CDSToSet);
    }
  }, [])

  return CDS;
}

export default useCDS;