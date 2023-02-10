import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  font: "lora",
};

export const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFontStyle: (state, action) => {
      state.font = action.payload;
    },
  },
});

export const { setFontStyle } = fontSlice.actions;

export default fontSlice.reducer;
