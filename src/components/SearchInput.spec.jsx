import { render, screen } from "@testing-library/react";

import SearchInput from "./SearchInput";

describe("serach input", () => {
  test("renders the correct value and placeholder", () => {
    const value = "Mock value";
    const placeholder = "Mock placeholder!";
    render(<SearchInput value={value} placeholder={placeholder} />);

    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("search")).toHaveAttribute("value", value);
    expect(screen.getByRole("search")).toHaveAttribute(
      "placeholder",
      placeholder
    );
  });

  test("renders an invalid input", () => {
    render(<SearchInput value={""} isInvalid={true} />);

    expect(screen.getByRole("search")).toHaveClass(
      "focus:border-red-500 focus:ring-red-500"
    );
  });
});
