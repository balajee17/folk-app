import {createSlice} from '@reduxjs/toolkit';
import {screenNames} from '../../constants/ScreenNames';

const initialState = {
  redirectScreen: '',
  btTab: '',
  activeEvtTab: 0,
};

export const RedirectScreenSlice = createSlice({
  name: 'RedirectScreen',
  initialState,
  reducers: {
    setRedirectScreen: (state, action) => {
      state.redirectScreen = action.payload.redirectScreen;
      state.btTab = action.payload.btTab;
      state.currentTab = action.payload.currentTab;
      state.activeEvtTab = action.payload.activeEvtTab;
    },
  },
});

export const {setRedirectScreen} = RedirectScreenSlice.actions;
export default RedirectScreenSlice.reducer;
