import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WarningIcon from "../components/WarningIcon";
import {
  getPodcastEpisodesList,
  selectPodcastEpisodeById,
} from "../store/podcastsReducer";

export default function Episode() {
  const { podcastId, episodeId } = useParams();

  const episode = useSelector((state) =>
    selectPodcastEpisodeById(state, episodeId)
  );

  const episodes = useSelector((state) => state.podcasts.episodes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simple way to allow to refresh on this route
    if (!episodes || !episodes.length)
      dispatch(getPodcastEpisodesList(podcastId));
  }, []);

  return (
    <>
      {episode && (
        <div className="card" data-testid="episode-details-card">
          <div className="text-3xl font-semibold">
            {episode?.trackName || (
              <WarningIcon className="text-red-500 w-7 h-7" />
            )}
          </div>
          {episode?.description ? (
            <div
              className="html-description whitespace-pre-line py-3 text-sm text-neutral-700"
              dangerouslySetInnerHTML={{ __html: episode?.description }}
            />
          ) : (
            <WarningIcon className="text-red-500" />
          )}
          <hr className="my-5" />
          {episode?.episodeUrl ? (
            <audio className="w-full" controls>
              <source src={episode?.episodeUrl} type={episode?.episodeType} />
            </audio>
          ) : (
            <WarningIcon className="text-red-500" />
          )}
        </div>
      )}
    </>
  );
}
