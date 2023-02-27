import axios from "axios";
import { readFromLocalStorage } from "../utils/localStorage";

const baseUrl = "https://itunes.apple.com";

export const getPodcasts = () => {
  const url = axios.getUri({
    url: `${baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`,
  });

  const localStorageValue = readFromLocalStorage(url);
  if (localStorageValue)
    return new Promise((resolve, _reject) => resolve({ localStorageValue }));

  return axios.get(url);
};

export const getPodcastEpisodes = (id) => {
  const params = { id: id, entity: "podcastEpisode", limit: 100 };
  const url = axios.getUri({ url: `${baseUrl}/lookup/json`, params });

  const localStorageValue = readFromLocalStorage(url);
  if (localStorageValue)
    return new Promise((resolve, _reject) => resolve({ localStorageValue }));

  return axios.get(url);
};

export const getPodcastEpisodesInfo = (id) => {
  const params = { id: id };
  const url = axios.getUri({ url: `${baseUrl}/lookup/json`, params });

  const localStorageValue = readFromLocalStorage(url);
  if (localStorageValue)
    return new Promise((resolve, _reject) => resolve({ localStorageValue }));

  return axios.get(url);
};

export const getPodcastFeedUrlResultsInXML = (feedUrl) => {
  const localStorageValue = readFromLocalStorage(feedUrl);
  if (localStorageValue)
    return new Promise((resolve, _reject) => resolve({ localStorageValue }));

  return axios.get(feedUrl);
};
