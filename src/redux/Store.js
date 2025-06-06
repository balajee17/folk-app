import {configureStore} from '@reduxjs/toolkit';
import redirectScreenReducer from './slices/RedirectScreen';

export const Store = configureStore({
  reducer: {
    redirectScreen: redirectScreenReducer,
  },
});
