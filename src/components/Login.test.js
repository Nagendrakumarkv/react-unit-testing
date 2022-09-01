import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("Username input should be render", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
});

test("Password input should be render", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("Login button should be render", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("Username input should be empty", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl.value).toBe("");
});

test("Password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("Login button should be disable", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorMessage = screen.getByTestId("error");
  expect(errorMessage).not.toBeVisible();
});

test("Username input should be change", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  const testValue = "test";
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("Password input should be change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("Login button should not be disable when inputs are avialable", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const buttonEl = screen.getByRole("button");

  const testValue = "test";
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

test("Loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("loading should be rendered when click", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
