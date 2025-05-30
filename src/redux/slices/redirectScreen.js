import {createSlice} from '@reduxjs/toolkit';
import {screenNames} from '../../constants/ScreenNames';

const initialState = {
  screenName: '',
  btTab: '',
  activeEvtTab: 0,
};

export const RedirectScreenSlice = createSlice({
  name: 'RedirectScreen',
  initialState,
  reducers: {
    setRedirectScreen: (state, action) => {
      state.screenName = action.payload.screenName;
      state.btTab = action.payload.btTab;
      state.activeEvtTab = action.payload.activeEvtTab;
    },
  },
});

export const {setRedirectScreen} = RedirectScreenSlice.actions;
export default RedirectScreenSlice.reducer;
