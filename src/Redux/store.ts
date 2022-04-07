import { configureStore } from "@reduxjs/toolkit";
import downloadSlice from "./downloadSlice";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: {
    download: downloadSlice,
    theme: themeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
