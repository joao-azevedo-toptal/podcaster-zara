import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPodcastsList } from "../store/podcastsReducer";

import SearchInput from "../components/SearchInput";
import Badge from "../components/Badge";
import PodcastCard from "../components/PodcastCard";

export default function Home() {
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  useEffect(() => {
    dispatch(getPodcastsList());
  }, []);

  useEffect(() => {
    if (query !== "") {
      const filteredData = podcasts.filter((podcast) => {
        return (
          podcast.name.toLowerCase().includes(query.toLowerCase()) ||
          podcast.artist.toLowerCase().includes(query.toLowerCase())
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
          <PodcastCard podcast={podcast} key={podcast.id} />
        ))}
      </div>
    </>
  );
}
