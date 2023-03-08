import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  useApiInsteadOfFeedUrl:
    JSON.parse(localStorage.getItem("useApiInsteadOfFeedUrl")) || false,
  waitBeforeShowView:
    JSON.parse(localStorage.getItem("waitBeforeShowView")) || 200,
  useDarkMode:
    typeof JSON.parse(localStorage.getItem("useDarkMode")) === "boolean"
      ? JSON.parse(localStorage.getItem("useDarkMode"))
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setUseApiInsteadOfFeedUrl: (state, { payload }) => {
      localStorage.setItem("useApiInsteadOfFeedUrl", JSON.stringify(payload));
      state.useApiInsteadOfFeedUrl = payload;
    },
    setWaitBeforeShowView: (state, { payload }) => {
      localStorage.setItem("waitBeforeShowView", JSON.stringify(payload));
      state.waitBeforeShowView = payload;
    },
    setUseDarkMode: (state, { payload }) => {
      localStorage.setItem("useDarkMode", JSON.stringify(payload));
      state.useDarkMode = payload;
    },
  },
});

export const {
  setIsLoading,
  setUseApiInsteadOfFeedUrl,
  setWaitBeforeShowView,
  setUseDarkMode,
} = appReducer.actions;

export default appReducer.reducer;
