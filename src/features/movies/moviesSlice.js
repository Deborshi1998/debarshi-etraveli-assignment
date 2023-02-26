import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieUrl } from "../../constants";
//Action for fetching movies from API
export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async () => {
        const response = await fetch(
            movieUrl
        );
        const data = await response.json();
        return data.results;
    }
);

//Slice for movies
export const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        moviesData:[],
        cache:[],
        searchInput: "",
        loading: false,
        isFetch: false,
        hasErrors: false,
    },
    reducers: {
        //Action for sorting movies by episode
        sortByEpisode: (state, action) => {
            state.moviesData.sort((a, b) => {
                return a.episode_id - b.episode_id;
            });
        },
        //Action for sorting movies by release date
        sortByReleaseDate: (state, action) => {
            state.moviesData.sort((a, b) => {
                return new Date(a.release_date) - new Date(b.release_date);
            });
        },
        //Action for setting search input, which is used for filtering movies by the content component.
        sortByInput: (state, action) => {
           state.searchInput = action.payload;
        }

    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetch = true;
        state.moviesData = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.hasErrors = true;
      });

  },
});

export const { sortByEpisode, sortByReleaseDate, sortByInput } = moviesSlice.actions;

//Selectors
//Selector for checking if movies are fetched
export const isMoviesFetched = (state) => state.fetchMovies.isFetch;
//Selector for getting search input
export const searchInputSelector = (state) => state.fetchMovies.searchInput;
//Selector for getting movies data
export const moviesSelector = (state) => state.fetchMovies.moviesData;

export default moviesSlice.reducer;
