import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPodcastEpisodes, getPodcasts } from "../api/podcastsAPI";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { writeToLocalStorage } from "../utils/localStorage";
import { addErrorMessages } from "./notificationsReducer";
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
  async (podcastId, { rejectWithValue, dispatch }) => {
    try {
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

      return episodes;
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
