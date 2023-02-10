import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: "",
  data: null,
  error: "",
  status: "idle",
};

export const getWords = createAsyncThunk(
  "words/getWord",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${params}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const wordSlice = createSlice({
  name: "word",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWords.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getWords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        state.status = "work";
      })
      .addCase(getWords.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.isError = "true";
        state.error = action.payload;
        state.status = "error";
      });
  },
});

export default wordSlice.reducer;
