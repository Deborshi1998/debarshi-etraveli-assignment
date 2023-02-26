import { Provider } from "react-redux";
import ContentParent from "../components/contentBody/ContentParent";
import { fireEvent, render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import ContentLeft from "../components/contentBody/ContentLeft";
const mockStore = configureMockStore();

describe("MoviesContent", () => {
  let store;

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,

        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    store = mockStore({
      fetchMovies: {
        moviesData: [
          {
            title: "Movie 1",
            episode_id: 1,
            opening_crawl: "Movie 1 opening crawl",
            director: "Movie 1 director",
            producer: "Movie 1 producer",
            release_date: "Movie 1 release date",
          },
          {
            title: "Movie 2",
            episode_id: 2,
            opening_crawl: "Movie 2 opening crawl",
            director: "Movie 2 director",
            producer: "Movie 2 producer",
            release_date: "Movie 2 release date",
          },
        ],
        searchInput: "",
        loading: false,
        isFetch: true,
        hasErrors: false,
      },
    });
  });

  //Test for the content parent
  test("Render the movie content", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChakraProvider>
          <ContentParent />
        </ChakraProvider>
      </Provider>
    );

    const contentBody = screen.getByTestId("contentParent");
    expect(contentBody).toBeInTheDocument();
    expect(getByText("Movie 1 release date")).toBeInTheDocument();
  });
  //Test for the content left, which is the list of movies
  test("Render the movie lists", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ChakraProvider>
          <ContentLeft />
        </ChakraProvider>
      </Provider>
    );

    const contentBody = screen.getByTestId("contentLeft");
    expect(contentBody).toBeInTheDocument();
    expect(getByText("Movie 1 release date")).toBeInTheDocument();
  });

  //Test for the content right, which is the movie details
  test("Render the movie click", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ChakraProvider>
          <ContentParent />
        </ChakraProvider>
      </Provider>
    );
    fireEvent.click(getByTestId("Movie 1"));
    expect(getByTestId("contentRight")).toHaveTextContent(
      "Movie 1 opening crawl"
    );
  });
});
