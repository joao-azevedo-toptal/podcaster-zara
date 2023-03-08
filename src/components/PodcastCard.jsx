import React from "react";
import { Link } from "react-router-dom";

export default function PodcastCard({ podcast }) {
  return (
    <Link
      to={`/podcast/${podcast.id}`}
      className="card hover:bg-gray-50 dark:hover:bg-gray-900 group"
      data-testid="podcast-card"
    >
      <div className="w-28 h-28 rounded-full overflow-hidden -mt-14 mx-auto group-hover:animate-bounce">
        <img
          className="w-full h-full object-cover"
          src={podcast.image}
          alt={podcast.name}
        />
      </div>
      <div className="mt-5 text-center">
        <div className="text-sm uppercase line-clamp-2 dark:text-neutral-100">
          {podcast.name}
        </div>
        <div className="text-xs text-neutral-400 dark:text-neutral-300 line-clamp-2">
          Author: {podcast.artist}
        </div>
      </div>
    </Link>
  );
}
