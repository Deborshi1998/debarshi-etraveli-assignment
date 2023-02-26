import { Flex,useBreakpointValue} from '@chakra-ui/react'
import React, {useState} from 'react'
import ContentLeft from './ContentLeft'
import ContentRight from './ContentRight'

function ContentParent() {
  const [movie, setMovie] = useState({});   // For storing the current movie
  // Chakra UI hook to change flex direction based on screen size
  const flexDirection = useBreakpointValue(
    { base: "column", md: "row" },
    {
      // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
      // (Defaults to 'base')
      fallback: "row",
    }
  );

  return (
    <Flex
      w="98%"
      margin="10px auto"
      bg={"white"}
      shadow={"lg"}
      direction={flexDirection}
      zIndex={2}
      data-testid="contentParent"
    >
      <ContentLeft
      
        setMovie={setMovie}
        flexDirection={flexDirection}
      />
      <ContentRight currentMovie={movie} flexDirection={flexDirection} />
    </Flex>
  );
}

export default ContentParent;