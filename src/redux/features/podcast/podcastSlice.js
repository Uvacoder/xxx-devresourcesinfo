import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPodcasts, fetchPodcastByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { DEV_RESOURCES, PODCASTS_URL } from "@/utils/constants";

const isBrowser = typeof window !== "undefined";

let localStorageResources = {};

if (isBrowser) {
  localStorageResources = JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};
}

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
    setPodcastStorageData: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
    },
    clearPodcastFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      const updateResources = {
        ...localStorageResources,
        podcasts: {},
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));

      clearFiltersFromURL(PODCASTS_URL);
    },
    setPodcastDataByUrl: (state, action) => {
      const newData = action.payload;
      const updateResources = {
        ...localStorageResources,
        podcasts: newData,
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));
    },
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

export const {
  setLangFilter,
  setAudienceFilter,
  setTagFilter,
  setPodcastStorageData,
  clearPodcastFilters,
  setPodcastDataByUrl,
} = podcastSlice.actions;

export default podcastSlice.reducer;
