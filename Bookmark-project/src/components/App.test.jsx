import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Bookmark from "./Bookmark/Bookmark";

describe("Bookmark Component", () => {
  test("renders Bookmark Website heading", () => {
  render(<Bookmark />);

  const heading = screen.getByText(/bookmark website/i);

  expect(heading).toBeInTheDocument();
});
});