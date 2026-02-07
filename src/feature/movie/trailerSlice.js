import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//take authorization token from .env file
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`
  },
};

export const fetchTrailer = createAsyncThunk(
  "trailer/fetchTrailer",
  async (movieId) => {
    const res = await fetch(
      `${BASE_URL}movie/${movieId}/videos?language=en-US`,
      options
    );
    const data = await res.json();

    return data.results?.[0] || null;
  }
);

const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    data: null,
    isLoading: false,
    isError: false,
  },
  reducers: {
    clearTrailer: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailer.pending, (state) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrailer.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearTrailer } = trailerSlice.actions;
export default trailerSlice.reducer;
