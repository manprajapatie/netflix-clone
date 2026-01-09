import {configureStore} from '@reduxjs/toolkit'
import movieReducer from '../feature/movie/movieSlice'

export const store = configureStore({
    reducer: {
     movies: movieReducer,
       // auth: authReducer, //we can name whatever we want, just we have to import thinks with same name
    },
});

