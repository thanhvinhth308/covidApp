import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isGetApiSuccess: false,
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
    changeApiStatus(state, action) {
      state.isGetApiSuccess = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
