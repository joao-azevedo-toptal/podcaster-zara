import React from "react";
import { Link } from "react-router-dom";

export default function PodcastCard({ podcast }) {
  return (
    <Link to={`/podcast/${podcast.id.attributes["im:id"]}`} className="card">
      <div className="w-28 h-28 rounded-full overflow-hidden -mt-14 mx-auto">
        <img
          className="w-full h-full object-cover"
          src={podcast["im:image"][2].label}
          alt={podcast["im:name"].label}
        />
      </div>
      <div className="mt-5 text-center">
        <div className="text-sm uppercase line-clamp-2">{podcast["im:name"].label}</div>
        <div className="text-xs text-neutral-400 line-clamp-2">Author: {podcast["im:artist"].label}</div>
      </div>
    </Link>
  );
}
