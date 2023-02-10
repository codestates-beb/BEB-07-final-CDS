import { createSlice } from "@reduxjs/toolkit";

export const priceByGeckoSlice = createSlice({
    name: 'priceByGecko',
    initialState: {
        // CoinGecko Price Data
        priceBTCGecko: '',
        priceETHGecko: '',
        priceLINKGecko: '',

        // CoinGecko Change Price Rate by 24 hours
        changeRateBTCGecko: '',
        changeRateETHGecko: '',
        changeRateLINKGecko: '',

        // UpdatedTimeGecko
        updatedTimeGecko: '',
    },
    reducers: {
        setPriceByGecko: (state, action)=>{
            state.priceBTCGecko = action.payload.bitcoin.usd;
            state.priceETHGecko = action.payload.ethereum.usd;
            state.priceLINKGecko = action.payload.chainlink.usd;

            state.changeRateBTCGecko = action.payload.bitcoin.usd_24h_change;
            state.changeRateETHGecko = action.payload.ethereum.usd_24h_change;
            state.changeRateLINKGecko = action.payload.chainlink.usd_24h_change;

            const geckoTime = new Date( action.payload.bitcoin.last_updated_at * 1000 );
            state.updatedTimeGecko = geckoTime.toString();
        },
        resetPriceByGecko: (state)=>{
            state.priceBTCGecko = '';
            state.priceETHGecko = '';
            state.priceLINKGecko = '';

            state.changeRateBTCGecko = '';
            state.changeRateETHGecko = '';
            state.changeRateLINKGecko = '';

            state.updatedTimeGecko = '';
        }
    }
})

export const { setPriceByGecko, resetPriceByGecko } = priceByGeckoSlice.actions
export default priceByGeckoSlice.reducer;