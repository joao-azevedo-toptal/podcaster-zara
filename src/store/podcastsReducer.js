import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPodcastEpisodes,
  getPodcastEpisodesInfo,
  getPodcastFeedUrlResultsInXML,
  getPodcasts,
} from "../api/podcastsAPI";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { writeToLocalStorage } from "../utils/localStorage";
import { addErrorMessages } from "./notificationsReducer";
import { XMLParser } from "fast-xml-parser";
momentDurationFormatSetup(moment);

const initialState = {
  podcasts: [],
  episodes: [],
  isLoadingPodcasts: false,
  isLoadingEpisodes: false,
  hasError: false,
};

export const selectPodcastById = (state, id) =>
  state.podcasts.podcasts?.find((podcast) => podcast.id === id);

export const selectPodcastEpisodeById = (state, id) =>
  state.podcasts.episodes?.find((episode) => episode.trackId === id);

export const getPodcastsList = createAsyncThunk(
  "podcasts/getPodcastsList",
  async (_, { rejectWithValue }) => {
    try {
      const { config, data, localStorageValue } = await getPodcasts();

      if (localStorageValue) return localStorageValue.data;

      const podcasts = data?.feed?.entry?.map((podcast) => ({
        id: podcast.id.attributes["im:id"],
        name: podcast["im:name"].label,
        image: podcast["im:image"][2].label,
        summary: podcast.summary.label,
        artist: podcast["im:artist"].label,
      }));
      writeToLocalStorage(config.url, podcasts);

      return podcasts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
  {
    // Prevent requesting twice
    condition: (_, { getState }) => {
      const { podcasts } = getState();
      const isLoadingPodcasts = podcasts.isLoadingPodcasts;
      if (isLoadingPodcasts) {
        return false;
      }
    },
  }
);

export const getPodcastEpisodesList = createAsyncThunk(
  "podcasts/getPodcastEpisodesList",
  async (podcastId, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      if (state.app.useFeedUrl) {
        const { config, data, localStorageValue } =
          await getPodcastEpisodesInfo(podcastId);

        const feedUrl =
          data?.results[0]?.feedUrl || localStorageValue?.data?.feedUrl;
        if (!localStorageValue && feedUrl) {
          writeToLocalStorage(config.url, { feedUrl });
        }

        const { data: feedXML, localStorageValue: feedLocalStorageValue } =
          await getPodcastFeedUrlResultsInXML(feedUrl);

        if (feedLocalStorageValue) return feedLocalStorageValue.data;

        const options = {
          ignoreAttributes: false,
          attributeNamePrefix: "attr_",
        };
        const xmlParser = new XMLParser(options);
        const parsedFeedXml = await xmlParser.parse(feedXML);

        const episodes = parsedFeedXml?.rss?.channel?.item?.map((episode) => ({
          trackId: episode?.guid["#text"] || episode?.guid,
          trackName: episode?.title,
          description: episode?.description,
          releaseDate: moment(episode?.pubDate).format("D/M/YYYY"),
          trackTime:
            typeof episode["itunes:duration"] === "number"
              ? moment
                  .duration(episode["itunes:duration"], "seconds")
                  .format("hh:mm:ss")
              : episode["itunes:duration"],
          episodeUrl: episode?.enclosure?.attr_url,
          episodeType: episode?.enclosure?.attr_type,
        }));

        if (episodes?.length) writeToLocalStorage(feedUrl, episodes);

        if (!episodes?.length) dispatch(addErrorMessages("No episodes found!"));

        return episodes || [];
      } else {
        const { config, data, localStorageValue } = await getPodcastEpisodes(
          podcastId
        );

        if (localStorageValue) return localStorageValue.data;

        // Remove first item (it's not a episode)
        data?.results?.shift();

        const episodes = data?.results?.map((episode) => ({
          trackId: episode.trackId.toString(),
          trackName: episode.trackName,
          description: episode.description,
          releaseDate: moment(episode.releaseDate).format("D/M/YYYY"),
          trackTime: moment
            .duration(episode.trackTimeMillis, "milliseconds")
            .format("hh:mm:ss"),
          episodeUrl: episode.episodeUrl,
          episodeType: `${episode?.episodeContentType}/${episode?.episodeFileExtension}`,
        }));
        if (episodes?.length) writeToLocalStorage(config.url, episodes);

        if (!episodes?.length) dispatch(addErrorMessages("No episodes found!"));

        return episodes || [];
      }
    } catch (error) {
      console.log(error);
      dispatch(addErrorMessages(error.message));
      return rejectWithValue(error.message);
    }
  },
  {
    // Prevent requesting twice
    condition: (_, { getState }) => {
      const { podcasts } = getState();
      const isLoadingEpisodes = podcasts.isLoadingEpisodes;
      if (isLoadingEpisodes) {
        return false;
      }
    },
  }
);

export const podcastsReducer = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    clearHasError: (state) => {
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPodcastsList.pending, (state) => {
      state.isLoadingPodcasts = true;
    });
    builder.addCase(getPodcastsList.fulfilled, (state, { payload }) => {
      state.isLoadingPodcasts = false;
      state.podcasts = payload;
    });
    builder.addCase(getPodcastsList.rejected, (state, { payload }) => {
      state.isLoadingPodcasts = false;
      state.hasError = true;
    });
    builder.addCase(getPodcastEpisodesList.pending, (state) => {
      state.isLoadingEpisodes = true;
    });
    builder.addCase(getPodcastEpisodesList.fulfilled, (state, { payload }) => {
      state.isLoadingEpisodes = false;
      state.episodes = payload;
      if (!payload || !payload.length) state.hasError = true;
    });
    builder.addCase(getPodcastEpisodesList.rejected, (state, { payload }) => {
      state.isLoadingEpisodes = false;
      state.hasError = true;
    });
  },
});

export const { clearHasError } = podcastsReducer.actions;

export default podcastsReducer.reducer;
