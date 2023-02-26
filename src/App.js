import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ChakraProvider, Flex } from "@chakra-ui/react";
import MenuBar from "./components/menu/Menu";
import ContentParent from "./components/contentBody/ContentParent";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, isMoviesFetched } from "./features/movies/moviesSlice";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isFetch = useSelector(isMoviesFetched); //Flag to check if the movies data is fetched
  const [allDone, setAllDone] = useState(false); //Flag to check if the intro music is played or not
  const autoElement = useRef(null); //Ref to the audio element
  const [playAudioIntro, setplayAudioIntro] = useState(true); //Flag to start the intro music

  //This useEffect is used to play the intro music for 8 seconds 
  //and then the main content is rendered
  useEffect(() => {
    if (isFetch) {
      setTimeout(() => {
        setAllDone(true);
      }, 8000);
    }
  }, [isFetch]);

  return (
    <ChakraProvider>
      <audio ref={autoElement} src="/intro_music.mp3"></audio>
      <div className="black_overlay"></div>
      {playAudioIntro ? (
        <Flex w={"100vw"} h={"100vh"} align={"center"} justify={"center"}>
          <Button
            colorScheme={"teal"}
            onClick={() => {
              setplayAudioIntro(false);
              dispatch(fetchMovies());
              autoElement.current.play();
            }}
          >
            Play Intro
          </Button>
        </Flex>
      ) : !allDone ? (
        <LoadingScreen />
      ) : (
        <Box className="App" h={"100vh"} zIndex="2">
          <MenuBar /> 
          <ContentParent  />
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;
