import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("check the length of list items", () => {
  render(<App />);
});
