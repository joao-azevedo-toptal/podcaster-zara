import axios from "axios";
import { readFromLocalForage } from "../utils/forage";

const corsUrl = "https://cors-anywhere.herokuapp.com/";

const baseUrl = corsUrl + "https://itunes.apple.com";

export const getPodcasts = async () => {
  const url = axios.getUri({
    url: `${baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`,
  });

  const localForageValue = await readFromLocalForage(url);
  if (localForageValue)
    return new Promise((resolve, _reject) => resolve({ localForageValue }));

  return axios.get(url);
};

export const getPodcastEpisodes = async (id) => {
  const params = { id: id, entity: "podcastEpisode", limit: 100 };
  const url = axios.getUri({ url: `${baseUrl}/lookup/json`, params });

  const localForageValue = await readFromLocalForage(url);
  if (localForageValue)
    return new Promise((resolve, _reject) => resolve({ localForageValue }));

  return axios.get(url);
};

export const getPodcastEpisodesInfo = async (id) => {
  const params = { id: id };
  const url = axios.getUri({ url: `${baseUrl}/lookup/json`, params });

  const localForageValue = await readFromLocalForage(url);
  if (localForageValue)
    return new Promise((resolve, _reject) => resolve({ localForageValue }));

  return axios.get(url);
};

export const getPodcastFeedUrlResultsInXML = async (feedUrl) => {
  const url = corsUrl + feedUrl;
  const localForageValue = await readFromLocalForage(url);
  if (localForageValue)
    return new Promise((resolve, _reject) => resolve({ localForageValue }));

  return axios.get(url);
};
