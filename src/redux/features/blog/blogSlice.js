import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { DEV_RESOURCES, BLOGS_URL } from "@/utils/constants";

const initialState = {
  allBlogs: [],
  langSelected: "",
  audienceSelected: "",
  tagSelected: "",
  status: "",
  error: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      clearFiltersFromURL(BLOGS_URL);
    },
    setBlogDataByUrl: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
    },
    setBlogLangFilter: (state, action) => {
      state.langSelected = action.payload;
    },
    setBlogAudienceFilter: (state, action) => {
      state.audienceSelected = action.payload;
    },
    setBlogTagFilter: (state, action) => {
      state.tagSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchBlogByAllFilter
      .addCase(fetchBlogByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allBlogs = action.payload;
      })
      .addCase(fetchBlogByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  clearBlogFilters,
  setBlogDataByUrl,
  setBlogLangFilter,
  setBlogAudienceFilter,
  setBlogTagFilter,
} = blogSlice.actions;

export default blogSlice.reducer;
