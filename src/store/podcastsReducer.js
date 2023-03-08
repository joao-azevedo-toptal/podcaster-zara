import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPodcastEpisodes,
  getPodcastEpisodesInfo,
  getPodcastFeedUrlResultsInXML,
  getPodcasts,
} from "../api/podcastsAPI";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { writeToLocalForage } from "../utils/forage";
import { addErrorMessages } from "./notificationsReducer";
import { XMLParser } from "fast-xml-parser";
momentDurationFormatSetup(moment);

const initialState = {
  podcasts: [],
  episodes: [],
  isLoadingPodcasts: false,
  isLoadingEpisodes: false,
  isLoadedPodcasts: false,
  isLoadedEpisodes: false,
  hasError: false,
};

export const selectPodcastById = (state, id) =>
  state.podcasts.podcasts?.find((podcast) => podcast.id === id);

export const selectPodcastEpisodeById = (state, id) =>
  state.podcasts.episodes?.find((episode) => episode.trackId === id);

export const getPodcastsList = createAsyncThunk(
  "podcasts/getPodcastsList",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetPodcasts());
      const { config, data, localForageValue } = await getPodcasts();

      if (localForageValue) return localForageValue.data;

      const podcasts = data?.feed?.entry?.map((podcast) => ({
        id: podcast.id.attributes["im:id"],
        name: podcast["im:name"].label,
        image: podcast["im:image"][2].label,
        summary: podcast.summary.label,
        artist: podcast["im:artist"].label,
      }));
      writeToLocalForage(config.url, podcasts);

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
      dispatch(resetEpisodes());
      const state = getState();
      if (!state.app.useApiInsteadOfFeedUrl) {
        const { config, data, localForageValue } = await getPodcastEpisodesInfo(
          podcastId
        );

        const feedUrl =
          data?.results[0]?.feedUrl || localForageValue?.data?.feedUrl;
        if (!localForageValue && feedUrl) {
          writeToLocalForage(config.url, { feedUrl });
        }

        if (!feedUrl) throw Error("Error geting the feed URL!");

        const {
          config: feedConfig,
          data: feedXML,
          localForageValue: feedLocalForageValue,
        } = await getPodcastFeedUrlResultsInXML(feedUrl);

        if (feedLocalForageValue) return feedLocalForageValue.data;

        const options = {
          ignoreAttributes: false,
          attributeNamePrefix: "attr_",
        };
        const xmlParser = new XMLParser(options);
        const parsedFeedXml = await xmlParser.parse(feedXML);

        const episodes = parsedFeedXml?.rss?.channel?.item?.map(
          (episode, index) => ({
            // Use index + 1 as id to avoid random formats in the XML
            trackId: (index + 1).toString(),
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
          })
        );

        if (episodes?.length) writeToLocalForage(feedConfig.url, episodes);

        if (!episodes?.length) dispatch(addErrorMessages("No episodes found!"));

        return episodes || [];
      } else {
        const { config, data, localForageValue } = await getPodcastEpisodes(
          podcastId
        );

        if (localForageValue) return localForageValue.data;

        // Remove first item (it's not a episode)
        data?.results?.shift();

        const episodes = data?.results?.map((episode, index) => ({
          // Replace actual trackId by index to allow switching between API and feed URL episodes
          trackId: (index + 1).toString(),
          trackName: episode.trackName,
          description: episode.description,
          releaseDate: moment(episode.releaseDate).format("D/M/YYYY"),
          trackTime: moment
            .duration(episode.trackTimeMillis, "milliseconds")
            .format("hh:mm:ss"),
          episodeUrl: episode.episodeUrl,
          episodeType: `${episode?.episodeContentType}/${episode?.episodeFileExtension}`,
        }));
        if (episodes?.length) writeToLocalForage(config.url, episodes);

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
    resetPodcasts: (state) => {
      state.podcasts = [];
    },
    resetEpisodes: (state) => {
      state.episodes = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPodcastsList.pending, (state) => {
      state.isLoadingPodcasts = true;
      state.isLoadedPodcasts = false;
    });
    builder.addCase(getPodcastsList.fulfilled, (state, { payload }) => {
      state.isLoadingPodcasts = false;
      state.isLoadedPodcasts = true;
      state.podcasts = payload;
    });
    builder.addCase(getPodcastsList.rejected, (state, { payload }) => {
      state.isLoadingPodcasts = false;
      state.isLoadedPodcasts = true;
      state.hasError = true;
    });
    builder.addCase(getPodcastEpisodesList.pending, (state) => {
      state.isLoadingEpisodes = true;
      state.isLoadedEpisodes = false;
    });
    builder.addCase(getPodcastEpisodesList.fulfilled, (state, { payload }) => {
      state.isLoadingEpisodes = false;
      state.isLoadedEpisodes = true;
      state.episodes = payload;
      if (!payload || !payload.length) state.hasError = true;
    });
    builder.addCase(getPodcastEpisodesList.rejected, (state, { payload }) => {
      state.isLoadingEpisodes = false;
      state.isLoadedEpisodes = true;
      state.hasError = true;
    });
  },
});

export const { clearHasError, resetPodcasts, resetEpisodes } =
  podcastsReducer.actions;

export default podcastsReducer.reducer;
