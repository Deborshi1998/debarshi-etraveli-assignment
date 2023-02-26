import React, {useMemo} from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import { useSelector } from "react-redux";
import {
  moviesSelector,
  searchInputSelector,
} from "../../features/movies/moviesSlice";
import { numToRoman } from "../../utils/utilsFunctions";
import "./Content.css";
function ContentLeft({ setMovie, flexDirection }) {
  const movies = useSelector(moviesSelector);             // For storing all the movies
  const searchInput = useSelector(searchInputSelector);   // For storing the search input

  // Memoizing the list of movies to be displayed
  const sortList = useMemo(() => {
    if (!searchInput) return movies;
    return matchSorter(movies, searchInput, {
      keys: ["title"],
    });
  }, [searchInput, movies]);


  return (
    <Box
      w={flexDirection === "row" ? "50%" : "100%"}
      bg={"gray.100"}
      zIndex={2}
      data-testid="contentLeft"
    >
      <TableContainer>
        <Table bg={"gray.300"} size="md">
          <Thead>
            <Tr>
              <Th>Episode</Th>
              <Th>Movie</Th>
              <Th isNumeric>Release Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortList.map((movie) => {
              return (
                <Tr
                  className="movies_row"
                  key={movie.title}
                  onClick={() => setMovie(movie)}
                  data-testid={movie.title}
                >
                  <Td>EPISODE {movie.episode_id}</Td>
                  <Td>
                    EPISODE {numToRoman(movie.episode_id)} - {movie.title}
                  </Td>
                  <Td isNumeric>{movie.release_date}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ContentLeft;
