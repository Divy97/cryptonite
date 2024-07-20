import { configureStore } from "@reduxjs/toolkit";

import coinSlice from "./features/coinSlice";
import watchListSlice from "./features/watchListSlice";
import coinNamesSlice from "./features/coinNamesSlice";
import themeSlice from "./features/themeSlice";

export const createStore = () => {
  return configureStore({
    reducer: {
      coins: coinSlice,
      watchList: watchListSlice,
      coinNames: coinNamesSlice,
      theme: themeSlice,
    },
  });
};
