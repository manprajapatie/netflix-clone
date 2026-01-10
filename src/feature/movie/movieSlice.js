import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Auth Key
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTQyMzE2MDM4YWM0MzMyY2Y0OTRkNjI5N2JhOTA2MyIsIm5iZiI6MTczMzMyOTM2MS4wMTQwMDAyLCJzdWIiOiI2NzUwODFkMTVmNzQ0YmYxNzQxZTEwNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Dhxl2xRg08LeNCNEG_ToACsJHAzrISrOcnegRyQ6_UQ'
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
