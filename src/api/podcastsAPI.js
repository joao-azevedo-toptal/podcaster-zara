import axios from "axios";

const baseUrl = "https://itunes.apple.com";

export const getPodcasts = () => {
  return axios.get(`${baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`);
};
