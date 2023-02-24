import React, { useEffect, useState } from "react";

import { getPodcasts } from "../api/podcastsAPI";

import PodcastCard from "../components/PodcastCard";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    getPodcasts().then((result) => setPodcasts(result.data.feed.entry));
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-14 mt-14">
      {podcasts.map((podcast) => (
        <PodcastCard podcast={podcast} key={podcast.id.attributes["im:id"]} />
      ))}
    </div>
  );
}
