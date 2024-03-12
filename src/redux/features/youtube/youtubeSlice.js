import { createSlice } from "@reduxjs/toolkit";
import { fetchYoutubeByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { DEV_RESOURCES, YOUTUBE_URL } from "@/utils/constants";

const initialState = {
  allYoutube: [],
  langSelected: "",
  audienceSelected: "",
  tagSelected: "",
  status: "",
  error: "",
  startCursor: "",
  endCursor: "",
  hasNextPage: "",
  hasPreviousPage: "",
};

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    clearYoutubeFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      clearFiltersFromURL(YOUTUBE_URL);
    },
    setYoutubeDataByUrl: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
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
        state.allYoutube = action.payload?.data;
        state.startCursor = action.payload?.hasStartCursor;
        state.endCursor = action.payload?.hasEndCursor;
        state.hasNextPage = action.payload?.hasNextPage;
        state.hasPreviousPage = action.payload?.hasPreviousPage;
      })
      .addCase(fetchYoutubeByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  clearYoutubeFilters,
  setYoutubeDataByUrl,
  setYoutubeLangFilter,
  setYoutubeAudienceFilter,
  setYoutubeTagFilter,
} = youtubeSlice.actions;

export default youtubeSlice.reducer;
