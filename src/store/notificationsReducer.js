import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessages: [],
};

export const notificationsReducer = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addErrorMessages: (state, { payload }) => {
      state.errorMessages = [...state.errorMessages, payload];
    },
    removeErrorMessages: (state, { payload }) => {
      state.errorMessages = [
        ...state.errorMessages.slice(0, payload),
        ...state.errorMessages.slice(payload + 1),
      ];
    },
  },
});

export const { addErrorMessages, removeErrorMessages } =
  notificationsReducer.actions;

export default notificationsReducer.reducer;
