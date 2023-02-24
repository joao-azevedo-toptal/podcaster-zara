import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPodcastEpisodes, getPodcasts } from "../api/podcastsAPI";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

const initialState = {
  podcasts: [],
  episodes: [],
  isLoading: false,
  errorMessage: "",
};

export const selectPodcastById = (state, id) =>
  state.podcasts.podcasts?.find((podcast) => podcast.id === id);

export const selectPodcastEpisodeById = (state, id) =>
  state.podcasts.episodes?.find((episode) => episode.trackId === id);

export const getPodcastsList = createAsyncThunk(
  "podcasts/getPodcastsList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getPodcasts();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getPodcastEpisodesList = createAsyncThunk(
  "podcasts/getPodcastEpisodesList",
  async (podcastId, { rejectWithValue }) => {
    try {
      const { data } = await getPodcastEpisodes(podcastId);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const podcastsReducer = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPodcastsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPodcastsList.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      state.podcasts = payload?.feed?.entry?.map((entry) => ({
        id: entry.id.attributes["im:id"],
        name: entry["im:name"].label,
        image: entry["im:image"][2].label,
        summary: entry.summary.label,
        artist: entry["im:artist"].label,
      }));
    });
    builder.addCase(getPodcastsList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    });
    builder.addCase(getPodcastEpisodesList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPodcastEpisodesList.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      // Remove first item (it's not a episode)
      payload?.results?.shift();

      state.episodes = payload?.results?.map((result) => ({
        trackId: result.trackId.toString(),
        trackName: result.trackName,
        description: result.description,
        releaseDate: moment(result.releaseDate).format("D/M/YYYY"),
        trackTime: moment
          .duration(result.trackTimeMillis, "milliseconds")
          .format("hh:mm:ss"),
        episodeUrl: result.episodeUrl,
        episodeType: `${result?.episodeContentType}/${result?.episodeFileExtension}`,
      }));
    });
    builder.addCase(getPodcastEpisodesList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    });
  },
});

export const { setLoading } = podcastsReducer.actions;

export default podcastsReducer.reducer;
