import { createSlice } from "@reduxjs/toolkit";

// status
// 0: waiting, 1: processing, 2: success, 3: fail;

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpened: false,
        status: 0,
        timeoutId: null,
    },
    reducers: {
        openModal: (state) =>{
            state.isModalOpened = true;
        },
        closeModal: (state) =>{
            state.isModalOpened = false;
        },
        setWaiting: (state) =>{
            state.status = 0;
        },
        setProcessing: (state) =>{
            state.status = 1;
        },
        setSuccess: (state) =>{
            state.status = 2;
        },
        setFail: (state, action) =>{
            state.status = 3;
            state.timeoutId = action.payload;
        },
    }
})

export const { 
    openModal, 
    closeModal, 
    setWaiting, 
    setProcessing, 
    setSuccess, 
    setFail 
} = modalSlice.actions;

export default modalSlice.reducer;
