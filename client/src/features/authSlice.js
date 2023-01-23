//modules
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_addr: '',
        isLogin: false,
    },
    reducers: {
        setAuth: (state, action)=>{
            state.user_addr = action.payload;
            state.isLogin = true;
        },
        resetAuth: (state)=>{
            state.user_addr = '';
            state.isLogin = false;
        }
    }
})

export const {setAuth, resetAuth} = authSlice.actions;

export default authSlice.reducer;