import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    items: [],
  },
  reducers: {
    addToWatchList: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1);
      }
      state.items.unshift(action.payload);
    },

    removeFromWatchList: (state, action) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const { addToWatchList, removeFromWatchList } = watchListSlice.actions;
export default watchListSlice.reducer;
