import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    modal: modalReducer,
  },
});
