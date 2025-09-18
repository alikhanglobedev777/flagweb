import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../features/contriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;