import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//take authorization token from .env file
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Auth Key
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};

// ✅ Async thunk (category comes from component)
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (category = "now_playing") => {
    const response = await fetch(
      `${BASE_URL}movie/${category}?language=en-US&page=1`,
      options
    );
     if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return {
      category,
      results: data.results,
    };
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    now_playing: [],
    top_rated: [],
    popular: [],
    upcoming: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
         state[action.payload.category] = action.payload.results;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default movieSlice.reducer;
