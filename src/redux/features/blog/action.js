import { getBlogByAllFilter } from "@/services/api/blogAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogByAllFilter = createAsyncThunk(
  "blogs/getBlogByAllFilter",
  async ({
    langSelected,
    audienceSelected,
    tagSelected,
    endCursor,
    startCursor,
    getPage,
  }) => {
    const { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage } =
      await getBlogByAllFilter(
        langSelected,
        audienceSelected,
        tagSelected,
        endCursor,
        startCursor,
        getPage
      );
    return { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage };
  }
);
