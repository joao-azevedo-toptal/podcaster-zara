import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
    <div className="card">
      <div className="text-3xl font-semibold">{episode?.trackName}</div>
      <div
        className="whitespace-pre-line py-3 text-sm text-neutral-700"
        dangerouslySetInnerHTML={{ __html: episode?.description }}
      />
      <hr className="my-5" />
      {episode?.episodeUrl && (
        <audio className="w-full" controls>
          <source src={episode?.episodeUrl} type={episode?.episodeType} />
        </audio>
      )}
    </div>
  );
}
