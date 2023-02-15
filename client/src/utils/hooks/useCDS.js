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
      setCDS( false );
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
            premiumRounds,
            assetType
          } = data;

          let deposit;
          if (isBuyer === true) deposit = premiumPrice * 4;
          else deposit = sellerDeposit;

          const receipt = await contract.methods.create(
            isBuyer,
            initialPriceOfAssets,
            claimPrice, 
            liquidationPrice,
            sellerDeposit,
            premiumPrice,
            premiumRounds,
            assetType
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

        accept: async (initialPriceOfAssets, swapId, userAddress)=>{          
          if( !initialPriceOfAssets || !swapId || !userAddress){
            throw new Error("Invalid Arguments");
          };

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

        expire: async(swapId, address)=> {
          if(!swapId || !address) throw new Error("Invalid Arguments");

          const receipt = await contract.methods.expire(swapId)
          .send({from:address});

          return receipt;
        },

        payPremium: async (swapId, address)=>{
          if(!swapId || !address) return new Error("Invalid Arguments");

          const receipt = await contract.methods.payPremium(swapId)
          .send({from: address});
          
          return receipt;
        },

        getSwap: async (swapId)=>{
          const receipt = await contract.methods.getSwap(swapId).call();
          return receipt;
        },

        getPrices: async (swapId)=>{
          const receipt = await contract.methods.getPrices(swapId).call();
          return receipt;
        },

        getSellerDeposit: async (swapId) =>{
          const receipt = await contract.methods.getSellerDeposit(swapId).call();
          return receipt;
        },

        getPremium: async (swapId) =>{
          const receipt = await contract.methods.getPremium(swapId).call();
          return receipt;
        },

        getRounds: async (swapId) =>{
          const receipt = await contract.methods.getRounds(swapId).call();
          return receipt;
        },

        getNextPayDate: async (swapId) =>{
          const receipt = await contract.methods.nextPayDate(swapId).call();
          return receipt;
        }
      }

      setCDS(CDSToSet);
    }
  }, [])

  return CDS;
}

export default useCDS;