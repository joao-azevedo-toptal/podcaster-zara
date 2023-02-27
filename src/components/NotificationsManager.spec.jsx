import { screen } from "@testing-library/react";

import { renderWithProviders } from "../utils/testUtils";
import NotificationsManager from "./NotificationsManager";

describe("notifications manager", () => {
  test("has no errors notifications", () => {
    renderWithProviders(<NotificationsManager />);

    expect(screen.getByTestId("notifications-manager")).toBeInTheDocument();
    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
  });

  test("has error notifications", () => {
    renderWithProviders(<NotificationsManager />, {
      preloadedState: {
        notifications: {
          errorMessages: ["Mock error 1!", "Mock error 2!"],
        },
      },
    });

    expect(screen.getAllByRole("alert")).toHaveLength(2);
  });
});
