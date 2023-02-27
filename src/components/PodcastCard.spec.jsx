import { screen } from "@testing-library/react";
import { mockTopPodcastsData } from "../testsMockData";
import { renderWithProviders } from "../utils/testUtils";

import PodcastCard from "./PodcastCard";

describe("podcast card", () => {
  test("renders a card with the right link", () => {
    const podcast = mockTopPodcastsData[0];
    renderWithProviders(<PodcastCard podcast={podcast} />);

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/podcast/${podcast.id}`
    );
  });

  test("renders a card with the right text", () => {
    const podcast = mockTopPodcastsData[0];
    renderWithProviders(<PodcastCard podcast={podcast} />);

    expect(screen.getByRole("link")).toHaveTextContent(podcast.name);
    expect(screen.getByRole("link")).toHaveTextContent(
      `Author: ${podcast.artist}`
    );
  });

  test("renders a card with the right image", () => {
    const podcast = mockTopPodcastsData[0];
    renderWithProviders(<PodcastCard podcast={podcast} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", podcast.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", podcast.name);
  });
});
