import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isErrorHandler: false,
  darkTheme: false
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
    toggleErrorHandler(state, action) {
      state.isErrorHandler = action.payload;
    },
    changeTheme(state, action) {
      state.darkTheme = action.payload;
    }
  }
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
