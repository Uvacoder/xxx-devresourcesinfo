import { createSlice } from "@reduxjs/toolkit";
import { fetchYoutubeByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { DEV_RESOURCES, YOUTUBE_URL } from "@/utils/constants";

const isBrowser = typeof window !== "undefined";

let localStorageResources = {};

if (isBrowser) {
  localStorageResources = JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};
}

const initialState = {
  allYoutube: [],
  langSelected: "",
  audienceSelected: "",
  tagSelected: "",
  status: "",
  error: "",
};

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setYoutubeStorageData: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
    },
    clearYoutubeFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      const updateResources = {
        ...localStorageResources,
        youtube: {},
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));

      clearFiltersFromURL(YOUTUBE_URL);
    },
    setYoutubeDataByUrl: (state, action) => {
      const newData = action.payload;
      const updateResources = {
        ...localStorageResources,
        youtube: newData,
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));
    },
    setYoutubeLangFilter: (state, action) => {
      state.langSelected = action.payload;
    },
    setYoutubeAudienceFilter: (state, action) => {
      state.audienceSelected = action.payload;
    },
    setYoutubeTagFilter: (state, action) => {
      state.tagSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchYoutubeByAllFilter
      .addCase(fetchYoutubeByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchYoutubeByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allYoutube = action.payload;
      })
      .addCase(fetchYoutubeByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  setYoutubeLangFilter,
  setYoutubeAudienceFilter,
  setYoutubeTagFilter,
  setYoutubeStorageData,
  clearYoutubeFilters,
  setYoutubeDataByUrl,
} = youtubeSlice.actions;

export default youtubeSlice.reducer;
