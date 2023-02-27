import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setIsLoading } = appReducer.actions;

export default appReducer.reducer;
