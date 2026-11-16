import { describe, test, expect, vi } from "vitest";
import { render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";
import Auth from "../Auth/Auth"

// Mock Firebase
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
}));

describe("Auth Component", () => {
  test("renders login heading", () => {
  render(<Auth />);
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
});

  test("renders email input", () => {
    render(<Auth />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(<Auth />);
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("renders login button", () => {
    render(<Auth />);
    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });

  test("renders forgot password link", () => {
    render(<Auth />);
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  test("switches to signup mode", async () => {
    render(<Auth />);
    await userEvent.click(screen.getByText(/^sign up$/i));
    expect(
      screen.getByPlaceholderText(/confirm password/i)
    ).toBeInTheDocument();
  });

  test("does not render confirm password in login mode", () => {
    render(<Auth />);
    expect(
      screen.queryByPlaceholderText(/confirm password/i)
    ).not.toBeInTheDocument();
  });

  test("switches back to login mode from signup", async () => {
    render(<Auth />);
    await userEvent.click(screen.getByText(/^sign up$/i));
    await userEvent.click(screen.getByText(/^login$/i));
    expect(
      screen.queryByPlaceholderText(/confirm password/i)
    ).not.toBeInTheDocument();
  });

  test("submit button is disabled when fields are empty", () => {
    render(<Auth />);
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("submit button becomes enabled after filling email and password", async () => {
    render(<Auth />);
    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      "test@test.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/^password$/i),
      "password123"
    );
    expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
  });
});