// modules
import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
    }
})

export default adminSlice.reducer;