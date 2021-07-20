import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    }
  }
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
