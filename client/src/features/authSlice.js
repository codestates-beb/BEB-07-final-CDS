//modules
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_addr: ''
    },
    reducers: {
        setAuth: (state, action)=>{
            state.user_addr = action.payload.user_addr;
        },
        resetAuth: (state)=>{
            state.user_addr = '';
        }
    }
})

export const {setAuth, resetAuth} = authSlice.actions;

export default authSlice.reducer;