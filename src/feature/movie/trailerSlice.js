import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTQyMzE2MDM4YWM0MzMyY2Y0OTRkNjI5N2JhOTA2MyIsIm5iZiI6MTczMzMyOTM2MS4wMTQwMDAyLCJzdWIiOiI2NzUwODFkMTVmNzQ0YmYxNzQxZTEwNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Dhxl2xRg08LeNCNEG_ToACsJHAzrISrOcnegRyQ6_UQ", // ⛔ move token to .env later
  },
};

export const fetchTrailer = createAsyncThunk(
  "trailer/fetchTrailer",
  async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
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
