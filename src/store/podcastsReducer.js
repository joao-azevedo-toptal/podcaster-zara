import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPodcasts } from "../api/podcastsAPI";

const initialState = {
  podcasts: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const selectPodcastById = (state, id) =>
  state.podcasts.podcasts?.find(
    (podcast) => podcast.id.attributes["im:id"] === id
  );

export const getPodcastsList = createAsyncThunk(
  "podcasts/getPodcastsList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getPodcasts();
      return data?.feed?.entry;
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
      state.isSuccess = true;
      state.podcasts = payload;
    });
    builder.addCase(getPodcastsList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
  },
});

export const { setLoading } = podcastsReducer.actions;

export default podcastsReducer.reducer;
