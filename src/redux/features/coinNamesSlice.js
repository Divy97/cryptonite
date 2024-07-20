import { createSlice } from "@reduxjs/toolkit";

const coinNamesSlice = createSlice({
  name: "coinNames",
  initialState: {
    items: [],
  },
  reducers: {
    setCoinNames: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setCoinNames } = coinNamesSlice.actions;
export default coinNamesSlice.reducer;
