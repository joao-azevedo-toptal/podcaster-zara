import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function Header() {
  const isLoadingData = useSelector(
    (state) =>
      state.podcasts.isLoadingPodcasts || state.podcasts.isLoadingEpisodes
  );

  const isLoadingRoutes = useSelector((state) => state.app.isLoading);

  return (
    <>
      <header
        className="flex justify-between items-center md:container md:mx-auto px-2 py-2"
        data-testid="header"
      >
        <Link to="/" className="text-lg font-bold text-blue-700">
          Podcaster
        </Link>

        {(isLoadingData || isLoadingRoutes) && <Spinner />}
      </header>
      <hr />
    </>
  );
}
