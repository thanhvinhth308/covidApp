import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  language: 1,
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
    changeLanguage(state, action) {
      state.language = state.language + 1;
    },
  },
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
