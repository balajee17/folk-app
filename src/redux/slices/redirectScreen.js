import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  screenName: '',
  btTab: 'DB1',
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
    setResetRedirectScreen: (state, action) => {
      state.screenName = '';
      state.btTab = 'DB1';
      state.activeEvtTab = 0;
    },
  },
});

export const {setRedirectScreen, setResetRedirectScreen} =
  RedirectScreenSlice.actions;
export default RedirectScreenSlice.reducer;
