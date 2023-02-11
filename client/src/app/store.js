import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import modalReducer from '../features/modalSlice';
import priceByGeckoReducer from '../features/priceByGeckoSlice';
import priceByLinkReducer from '../features/priceByLinkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    modal: modalReducer,
    priceByGecko: priceByGeckoReducer, 
    priceByLink: priceByLinkReducer,
  },
});
