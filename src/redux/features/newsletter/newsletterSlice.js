import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsletterByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { DEV_RESOURCES, NEWSLETTERS_URL } from "@/utils/constants";

const isBrowser = typeof window !== "undefined";

let localStorageResources = {};

if (isBrowser) {
  localStorageResources = JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};
}

const initialState = {
  allNewsletters: [],
  langSelected: "",
  audienceSelected: "",
  tagSelected: "",
  status: "",
  error: "",
};

export const newsletterSlice = createSlice({
  name: "newsletters",
  initialState,
  reducers: {
    setNewsletterStorageData: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
    },
    clearNewsletterFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      const updateResources = {
        ...localStorageResources,
        newsletters: {},
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));

      clearFiltersFromURL(NEWSLETTERS_URL);
    },
    setNewsletterDataByUrl: (state, action) => {
      const updateResources = {
        ...localStorageResources,
        newsletters: action.payload,
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));
    },
    setNewsletterLangFilter: (state, action) => {
      state.langSelected = action.payload;
    },
    setNewsletterAudienceFilter: (state, action) => {
      state.audienceSelected = action.payload;
    },
    setNewsletterTagFilter: (state, action) => {
      state.tagSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchNewsletterByAllFilter
      .addCase(fetchNewsletterByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsletterByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allNewsletters = action.payload;
      })
      .addCase(fetchNewsletterByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  setNewsletterLangFilter,
  setNewsletterAudienceFilter,
  setNewsletterTagFilter,
  setNewsletterStorageData,
  clearNewsletterFilters,
  setNewsletterDataByUrl,
} = newsletterSlice.actions;

export default newsletterSlice.reducer;
