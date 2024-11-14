import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slice/auth';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;