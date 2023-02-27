import { screen } from "@testing-library/react";

import { renderWithProviders } from "./utils/testUtils";
import App from "./App";

describe("app", () => {
  test("renders the app header", () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders the app notifications manager", () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId("notifications-manager")).toBeInTheDocument();
  });
});
