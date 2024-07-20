import { createSlice } from "@reduxjs/toolkit";

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCoins: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCoins, setLoading, setError } = coinSlice.actions;
export default coinSlice.reducer;
