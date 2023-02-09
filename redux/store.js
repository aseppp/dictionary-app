import { configureStore } from "@reduxjs/toolkit";
import wordSlice from "./features/wordSlice";

export const store = configureStore({
  reducer: {
    word: wordSlice,
  },
});
