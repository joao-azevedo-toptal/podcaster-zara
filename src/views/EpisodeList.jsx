import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPodcastEpisodesList } from "../store/podcastsReducer";

export default function EpisodeList() {
  const { podcastId } = useParams();
  const episodes = useSelector((state) => state.podcasts.episodes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPodcastEpisodesList(podcastId));
  }, []);

  return (
    <>
      <div className="card text-2xl font-bold">Episodes: {episodes.lenght}</div>
      <div className="card mt-7">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral-700">
            <thead className="border-b text-xs text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {episodes?.map((episode) => (
                <tr
                  className="border-b bg-white odd:bg-gray-100"
                  key={episode.trackId}
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`episode/${episode.trackId}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {episode.trackName}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{episode.releaseDate}</td>
                  <td className="px-6 py-4 text-right">{episode.trackTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
