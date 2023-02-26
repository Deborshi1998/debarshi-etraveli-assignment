import { Box, Center, Container, Heading, Text} from '@chakra-ui/react';
import React from 'react'
import { numToRoman } from '../../utils/utilsFunctions';
function ContentRight({ currentMovie, flexDirection }) {
  return (
    <Box
      w={flexDirection === "row" ? "50%" : "100%"}
      color="white"
      bg={"black"}
      pb={10}
      zIndex={2}
      data-testid="contentRight"
    >
      {currentMovie && (
        <>
          <Center>
            <Box>
              <Container mt={5} h={"100%"}>
                {Object.keys(currentMovie).length !== 0 ? (
                  <>
                    <Heading textAlign={"left"}>
                      EPISODE {numToRoman(currentMovie.episode_id)} -{" "}
                      {currentMovie.title}
                    </Heading>
                    <br></br>
                    <Text align={"left"}>{currentMovie.opening_crawl}</Text>
                    <br></br>
                    <Text align={"left"} fontWeight={"bold"}>
                      Director: {currentMovie.director}
                    </Text>
                  </>
                ) : (
                  <Text align={"center"} mt={"20"}>
                    No Movie Selected
                  </Text>
                )}
              </Container>
            </Box>
          </Center>
        </>
      )}
    </Box>
  );
}

export default ContentRight;