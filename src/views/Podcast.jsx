import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { addErrorMessages } from "../store/notificationsReducer";
import { getPodcastsList, selectPodcastById } from "../store/podcastsReducer";

export default function Podcast() {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const podcast = useSelector((state) => selectPodcastById(state, podcastId));

  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const isLoaded = useSelector((state) => state.podcasts.isLoadedPodcasts);

  useEffect(() => {
    // Simple way to allow to refresh on this route
    if (!podcasts || !podcasts.length) dispatch(getPodcastsList());
  }, []);

  useEffect(() => {
    if (isLoaded && !podcast) {
      dispatch(addErrorMessages("Podcast not found!"));
      // Go to homepage when there is an error
      navigate("/");
    }
  }, [isLoaded]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-14">
      <div className="col-span-1 lg:col-span-2">
        {podcast && (
          <div
            className="card max-w-xs mx-auto lg:max-w-none lg:mx-0"
            data-testid="podcast-details-sidebar"
          >
            <Link
              to={`/podcast/${podcastId}`}
              data-testid="podcast-details-sidebar-image"
            >
              <img className="rounded mx-auto" src={podcast?.image} />
            </Link>

            <hr className="my-5" />
            <Link
              to={`/podcast/${podcastId}`}
              className="hover:text-blue-500"
              data-testid="podcast-details-sidebar-name"
            >
              <div className="font-bold">{podcast?.name}</div>
            </Link>
            <div className="italic text-sm text-neutral-700">
              by{" "}
              <Link
                to={`/podcast/${podcastId}`}
                className="hover:text-blue-500"
                data-testid="podcast-details-sidebar-artist"
              >
                {podcast?.artist}
              </Link>
            </div>
            <hr className="my-5" />
            <div className="font-bold text-sm">Description:</div>
            <div className="italic text-sm text-neutral-700">
              {podcast?.summary}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-1 lg:col-span-4 xl:col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
