import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { DEV_RESOURCES, BLOGS_URL } from "@/utils/constants";

const isBrowser = typeof window !== "undefined";

let localStorageResources = {};

if (isBrowser) {
  localStorageResources = JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};
}

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
    setBlogStorageData: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
    },
    clearBlogFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      const updateResources = {
        ...localStorageResources,
        blogs: {},
      };
      localStorage.setItem(DEV_RESOURCES, JSON.stringify(updateResources));

      clearFiltersFromURL(BLOGS_URL);
    },
    setBlogDataByUrl: (state, action) => {
      const newData = action.payload;
      const updateResources = {
        ...localStorageResources,
        blogs: newData,
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
  setBlogLangFilter,
  setBlogAudienceFilter,
  setBlogTagFilter,
  setBlogStorageData,
  clearBlogFilters,
  setBlogDataByUrl,
} = blogSlice.actions;

export default blogSlice.reducer;
