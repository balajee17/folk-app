import {configureStore} from '@reduxjs/toolkit';
import redirectScreenReducer from './slices/redirectScreen';

export const Store = configureStore({
  reducer: {
    redirectScreen: redirectScreenReducer,
  },
});
