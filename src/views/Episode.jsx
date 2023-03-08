import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import WarningIcon from "../components/WarningIcon";
import { addErrorMessages } from "../store/notificationsReducer";
import {
  getPodcastEpisodesList,
  selectPodcastEpisodeById,
} from "../store/podcastsReducer";

export default function Episode() {
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const useApiInsteadOfFeedUrl = useSelector(
    (state) => state.app.useApiInsteadOfFeedUrl
  );

  const episode = useSelector((state) =>
    selectPodcastEpisodeById(state, episodeId)
  );

  const isLoaded = useSelector((state) => state.podcasts.isLoadedEpisodes);

  useEffect(() => {
    // Simple way to allow to refresh on this route
    dispatch(getPodcastEpisodesList(podcastId));
  }, [useApiInsteadOfFeedUrl]);

  useEffect(() => {
    if (isLoaded && !episode) {
      dispatch(addErrorMessages("Episode not found!"));
      // Go to homepage when there is an error
      navigate("/");
    }
  }, [isLoaded]);

  return (
    <>
      {episode && (
        <div className="card" data-testid="episode-details-card">
          {episode?.trackName ? (
            <div
              className="text-3xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: episode.trackName,
              }}
            ></div>
          ) : (
            <WarningIcon className="text-red-500 w-7 h-7" />
          )}

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
