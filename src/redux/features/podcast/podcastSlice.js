import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPodcasts,
fetchPodcastsByLang,
fetchPodcastsByAudience
} from "./action";

const initialState = {
  allPodcasts: [],
  langSelected: "",
  audienceSelected: "",
  status: "",
  error: "",
};

export const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setLangFilter: (state, action) => {
      state.langSelected = action.payload;
      state.audienceSelected = "";
    },
    setAudienceFilter: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = action.payload;
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

      // fetchPodcastsByLang
      .addCase(fetchPodcastsByLang.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPodcastsByLang.fulfilled, (state, action) => {
        state.status = "success";
        state.allPodcasts = action.payload;
      })
      .addCase(fetchPodcastsByLang.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchPodcastsByAudience
      .addCase(fetchPodcastsByAudience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPodcastsByAudience.fulfilled, (state, action) => {
        state.status = "success";
        state.allPodcasts = action.payload;
      })
      .addCase(fetchPodcastsByAudience.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setLangFilter, setAudienceFilter } = podcastSlice.actions;

export default podcastSlice.reducer;
