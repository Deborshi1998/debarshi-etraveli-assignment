import { Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import "./LoadingScreen.css";
function LoadingScreen() {
  // Chakra UI hook to change font size based on screen size
  const fontSize = useBreakpointValue({ base: "lg", md: "4xl" });
  return (
    <div className="star-wars-intro">
      <Text className="intro-text" fontSize={fontSize}>
        A long time ago, in a galaxy far, <br />
        far away...
      </Text>
      <h2 className="main-logo">
        <img src="/star-wars-intro.png" />
      </h2>
    </div>
  );
}

export default LoadingScreen;
