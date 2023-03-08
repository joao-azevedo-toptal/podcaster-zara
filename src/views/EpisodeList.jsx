import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import WarningIcon from "../components/WarningIcon";
import { getPodcastEpisodesList } from "../store/podcastsReducer";

export default function EpisodeList() {
  const { podcastId } = useParams();
  const episodes = useSelector((state) => state.podcasts.episodes);
  const dispatch = useDispatch();

  const useApiInsteadOfFeedUrl = useSelector(
    (state) => state.app.useApiInsteadOfFeedUrl
  );

  useEffect(() => {
    dispatch(getPodcastEpisodesList(podcastId));
  }, [useApiInsteadOfFeedUrl]);

  return (
    <>
      {episodes?.length > 0 && (
        <>
          <div
            className="card text-2xl font-bold dark:text-neutral-100"
            data-testid="episodes-list-counter"
          >
            Episodes: {episodes.length}
          </div>
          <div className="card mt-7">
            <div className="relative overflow-x-auto">
              <table
                className="w-full text-sm text-left text-neutral-700 dark:text-neutral-300"
                data-testid="episodes-list-table"
              >
                <thead className="border-b dark:border-gray-900 text-xs text-gray-700 dark:text-neutral-100">
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
                  {episodes.map((episode) => (
                    <tr
                      className="border-b dark:border-gray-900 bg-white odd:bg-gray-100 dark:bg-gray-700 dark:odd:bg-gray-800"
                      key={episode.trackId}
                      data-testid="episodes-list-table-row"
                    >
                      <td className="px-6 py-4">
                        {episode.trackId ? (
                          <Link
                            to={`episode/${episode.trackId}`}
                            className="font-medium text-blue-600 hover:underline"
                            data-testid="episodes-list-table-link"
                            dangerouslySetInnerHTML={{
                              __html: episode.trackName,
                            }}
                          ></Link>
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: episode.trackName,
                            }}
                          ></span>
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
      )}
    </>
  );
}
