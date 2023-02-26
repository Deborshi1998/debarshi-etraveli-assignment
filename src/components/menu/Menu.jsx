import {
  Flex,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
  InputGroup,
  Input,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  sortByInput,
  sortByEpisode,
  sortByReleaseDate,
} from "../../features/movies/moviesSlice";
import { useDispatch } from "react-redux";
import "./Menu.css";
function MenuBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // For search bar input
  const handleSortByMovies = () => {
    dispatch(sortByEpisode());
  };
  const handleSortByDate = () => {
    dispatch(sortByReleaseDate());
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(sortByInput(inputValue));
    }, 300);

    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <Flex className="navbar" boxShadow="2xl" p={5}>
      <Box>
        <Menu>
          <MenuButton as={Button} colorScheme="yellow">
            <Text>Sort By...</Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSortByMovies}>Episode</MenuItem>
            <MenuItem onClick={handleSortByDate}>Year</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box w="95%">
        <InputGroup ml={4}>
          <Input
            type="text"
            placeholder="Enter a movie name"
            value={inputValue}
            color="white"
            borderWidth={2}
            data-testid="searchBar"
            focusBorderColor="yellow.500"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
}

export default MenuBar;
