import { createSlice } from "@reduxjs/toolkit";

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    items: [],
  },
  reducers: {
    setCoins: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setCoins } = coinSlice.actions;
export default coinSlice.reducer;
