// src/features/selectedCoinSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectedCoinSlice = createSlice({
  name: "selectedCoin",
  initialState: null,
  reducers: {
    setSelectedCoin: (state, action) => {
      return action.payload;
    },
    clearSelectedCoin: () => {
      return null;
    },
  },
});

export const { setSelectedCoin, clearSelectedCoin } = selectedCoinSlice.actions;
export default selectedCoinSlice.reducer;
