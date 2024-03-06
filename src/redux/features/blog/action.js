import { getBlogByAllFilter } from "@/services/api/blogAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogByAllFilter = createAsyncThunk(
  "blogs/getBlogByAllFilter",
  async ({ langSelected, audienceSelected, tagSelected }) => {
    const { data, hasEndCursor, hasNextPage } = await getBlogByAllFilter(
      langSelected,
      audienceSelected,
      tagSelected
    );
    return data;
  }
);
