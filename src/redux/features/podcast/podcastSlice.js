import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPodcasts, fetchPodcastByAllFilter } from "./action";

const initialState = {
  allPodcasts: [],
  langSelected: "",
  audienceSelected: "",
  tagSelected: "",
  status: "",
  error: "",
};

export const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setLangFilter: (state, action) => {
      state.langSelected = action.payload;
    },
    setAudienceFilter: (state, action) => {
      state.audienceSelected = action.payload;
    },
    setTagFilter: (state, action) => {
      state.tagSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllPodcasts
      .addCase(fetchAllPodcasts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPodcasts.fulfilled, (state, action) => {
        state.status = "success";
        state.allPodcasts = action.payload;
      })
      .addCase(fetchAllPodcasts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchPodcastByAllFilter
      .addCase(fetchPodcastByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPodcastByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allPodcasts = action.payload;
      })
      .addCase(fetchPodcastByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setLangFilter, setAudienceFilter, setTagFilter } =
  podcastSlice.actions;

export default podcastSlice.reducer;
