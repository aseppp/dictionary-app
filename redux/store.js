import { configureStore } from "@reduxjs/toolkit";
import fontSlice from "./features/fontSlice";
import wordSlice from "./features/wordSlice";

export const store = configureStore({
  reducer: {
    word: wordSlice,
    font: fontSlice,
  },
});
