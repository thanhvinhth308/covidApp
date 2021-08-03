import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isErrorHandler: false,
  darkTheme: false,
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleErrorHandler(state, action) {
      state.isErrorHandler = action.payload;
    },
    changeTheme(state, action) {
      state.darkTheme = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
