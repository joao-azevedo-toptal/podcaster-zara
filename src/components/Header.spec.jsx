import { screen } from "@testing-library/react";

import { renderWithProviders } from "../utils/testUtils";
import Header from "./Header";

describe("header", () => {
  test("has a 'Podcaster' link to home", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    expect(screen.getByRole("link")).toHaveTextContent("Podcaster");
  });

  test("does not have a spinner while it's not loading", () => {
    renderWithProviders(<Header />);

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  test("has a spinner while loading", () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        podcasts: {
          isLoadingPodcasts: true,
        },
      },
    });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
