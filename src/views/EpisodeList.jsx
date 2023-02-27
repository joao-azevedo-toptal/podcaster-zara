import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import WarningIcon from "../components/WarningIcon";
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
      <div className="card text-2xl font-bold">Episodes: {episodes.length}</div>
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
                    {episode.trackId ? (
                      <Link
                        to={`episode/${encodeURIComponent(episode.trackId)}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {episode.trackName || (
                          <WarningIcon className="text-red-500" />
                        )}
                      </Link>
                    ) : (
                      <>
                        {episode.trackName || (
                          <WarningIcon className="text-red-500" />
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {episode.releaseDate || (
                      <WarningIcon className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-end">
                    {episode.trackTime || (
                      <WarningIcon className="text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
