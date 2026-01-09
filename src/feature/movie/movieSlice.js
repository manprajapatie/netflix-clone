import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Auth Key
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer YOUR_TMDB_TOKEN'
  }
};

// ✅ Async thunk (category comes from component)
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (category = "now_playing") => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
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
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default movieSlice.reducer;
