import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
//Test for the main app
test("Render main app", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByText("Play Intro");
  expect(linkElement).toBeInTheDocument();
});
