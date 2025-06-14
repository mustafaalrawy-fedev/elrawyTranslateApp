import { configureStore } from '@reduxjs/toolkit';
import languagesReducer from './slices/languagesSlice';
import toastReducer from './slices/toastSlice';

const store = configureStore({
  reducer: {
    langs: languagesReducer,
    toast: toastReducer,
  },
});

export default store;
