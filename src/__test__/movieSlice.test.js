import moviesReducer, {
  sortByEpisode,
  sortByReleaseDate,
  sortByInput,
  isMoviesFetched,
  searchInputSelector,
  moviesSelector,
} from "../features/movies/moviesSlice";

describe("movies reducer", () => {
  //Test for sorting movies by episode
  it("should handle sortByEpisode", () => {
    const initialState = { moviesData: [{ episode_id: 5 }, { episode_id: 4 }] };
    const expectedState = {
      moviesData: [{ episode_id: 4 }, { episode_id: 5 }],
    };

    expect(moviesReducer(initialState, sortByEpisode())).toEqual(expectedState);
  });

  //Test for sorting movies by release date
  it("should handle sortByReleaseDate", () => {
    const initialState = {
      moviesData: [
        { release_date: "1980-05-21" },
        { release_date: "1977-05-25" },
      ],
    };
    const expectedState = {
      moviesData: [
        { release_date: "1977-05-25" },
        { release_date: "1980-05-21" },
      ],
    };

    expect(moviesReducer(initialState, sortByReleaseDate())).toEqual(
      expectedState
    );
  });
  //Test for setting search input
  it("should handle sortByInput", () => {
    const initialState = { searchInput: "" };
    const expectedState = { searchInput: "star wars" };

    expect(moviesReducer(initialState, sortByInput("star wars"))).toEqual(
      expectedState
    );
  });
});


describe("movies selectors", () => {
  it("should select isFetch", () => {
    const state = { fetchMovies: { isFetch: true } };
    expect(isMoviesFetched(state)).toEqual(true);
  });

  it("should select searchInput", () => {
    const state = { fetchMovies: { searchInput: "star wars" } };
    expect(searchInputSelector(state)).toEqual("star wars");
  });

  it("should select moviesData", () => {
    const state = {
      fetchMovies: {
        moviesData: [
          { title: "A New Hope" },
          { title: "The Empire Strikes Back" },
        ],
      },
    };
    expect(moviesSelector(state)).toEqual([
      { title: "A New Hope" },
      { title: "The Empire Strikes Back" },
    ]);
  });
});
