import { render, screen } from "@testing-library/react";

import Notification from "./Notification";

describe("notification", () => {
  test("renders a notification with the message sent", () => {
    const message = "Mock error!";
    render(<Notification message={message} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveTextContent(message);
  });

  test("has a close button and call the onClose function", () => {
    const message = "Mock error!";
    const fn = vi.fn();
    render(<Notification message={message} onClose={fn} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(fn).not.toHaveBeenCalled();
    screen.getByRole("button").click();
    expect(fn).toHaveBeenCalled();
  });
});
