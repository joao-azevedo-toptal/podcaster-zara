import { render, screen } from "@testing-library/react";

import Badge from "./Badge";

describe("badge", () => {
  test("renders a badge with the value sent", () => {
    const value = 100;
    render(<Badge value={value} />);

    expect(screen.getByRole("badge")).toBeInTheDocument();
    expect(screen.getByRole("badge")).toHaveTextContent(value);
  });

  test("renders a invalid badge", () => {
    const value = 0;
    render(<Badge value={value} isInvalid={true} />);

    expect(screen.getByRole("badge")).toBeInTheDocument();
    expect(screen.getByRole("badge")).toHaveTextContent(value);
    expect(screen.getByRole("badge")).toHaveClass("bg-red-500");
  });
});
