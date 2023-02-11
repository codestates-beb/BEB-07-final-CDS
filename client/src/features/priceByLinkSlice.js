import { createSlice } from '@reduxjs/toolkit';

const priceByLinkSlice = createSlice({
    name: 'priceByLink',
    initialState: {
        // ChainLink Price Data
        priceBTCLink: '',
        priceETHLink: '',
        priceLINKLink: '',

        // Updated Time
        updatedTimeLink: '',
    },
    reducers: {
        setPriceByLink: (state, action)=>{
            state.priceBTCLink = action.payload.bitcoin.usd;
            state.priceETHLink = action.payload.ethereum.usd;
            state.priceLINKLink = action.payload.chainlink.usd;

            let linkTimestamp = action.payload.bitcoin.last_updated_at;
            let numToString = linkTimestamp.toString();
            let sliceNum = numToString.slice(0, 10);
            let StringToNum = Number(sliceNum);
            let linkTime = new Date(StringToNum * 1000);
            let linkTimeToString = linkTime.toString();

            state.updatedTimeLink = linkTimeToString;
        },
        resetPriceByLink: (state)=> {
            state.priceBTCLink = '';
            state.priceETHLink = '';
            state.priceLINKLink = '';

            state.updatedTimeLink = '';
        },
    },
});

export const { setPriceByLink, resetPriceByLink } = priceByLinkSlice.actions;
export default priceByLinkSlice.reducer;