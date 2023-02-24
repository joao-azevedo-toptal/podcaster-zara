import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPodcastEpisodeById } from "../store/podcastsReducer";

export default function Episode() {
  const { episodeId } = useParams();
  const episode = useSelector((state) =>
    selectPodcastEpisodeById(state, episodeId)
  );

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
