import React, { useEffect, useState } from "react";

import { getPodcasts } from "../api/podcastsAPI";

import SearchInput from "../components/SearchInput";
import Badge from "../components/Badge";
import PodcastCard from "../components/PodcastCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  useEffect(() => {
    getPodcasts().then((result) => setPodcasts(result.data.feed.entry));
  }, []);

  useEffect(() => {
    if (query !== "") {
      const filteredData = podcasts.filter((podcast) => {
        return (
          podcast["im:name"].label
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          podcast["im:artist"].label.toLowerCase().includes(query.toLowerCase())
        );
      });
      setFilteredPodcasts(filteredData);
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [podcasts, query]);

  return (
    <>
      <div className="flex justify-end items-center">
        <Badge
          value={filteredPodcasts.length}
          isInvalid={filteredPodcasts.length < 1}
        />

        <SearchInput
          value={query}
          onChange={(q) => setQuery(q)}
          isInvalid={filteredPodcasts.length < 1}
        />
      </div>
      {filteredPodcasts.length < 1 && (
        <div className="font-bold text-3xl text-center mt-52">
          No podcast results for "{query}"
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-14 mt-14">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard podcast={podcast} key={podcast.id.attributes["im:id"]} />
        ))}
      </div>
    </>
  );
}
