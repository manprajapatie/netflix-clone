import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../feature/movie/movieSlice'
import trailerReducer from '../feature/movie/trailerSlice'
import authReducer from '../feature/auth/authSlice'

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        trailer: trailerReducer,
         auth: authReducer //we can name whatever we want, just we have to import thinks with same name
    },
});

