import {createSlice} from '@reduxjs/toolkit';

export const requestSlice: any = createSlice({
  name: 'request',
  initialState: {
    popularMovies: [],
  },

  reducers: {
    setPopularMovies: (state: any, action) => {
      return {
        ...state,
        popularMovies: action.payload,
      };
    },

  },
});

export const setPopularMovies = requestSlice.actions.setPopularMovies;

