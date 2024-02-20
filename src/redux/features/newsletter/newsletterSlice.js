import { createSlice } from "@reduxjs/toolkit";
import { fetchNewsletterByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { NEWSLETTERS_URL } from "@/utils/constants";

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
    clearNewsletterFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      clearFiltersFromURL(NEWSLETTERS_URL);
    },
    setNewsletterDataByUrl: (state, action) => {
       state.langSelected = action.payload?.langSelected ?? "";
       state.audienceSelected = action.payload?.audienceSelected ?? "";
       state.tagSelected = action.payload?.tagSelected ?? "";
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
  clearNewsletterFilters,
  setNewsletterDataByUrl,
  setNewsletterLangFilter,
  setNewsletterAudienceFilter,
  setNewsletterTagFilter,
} = newsletterSlice.actions;

export default newsletterSlice.reducer;
