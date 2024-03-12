import { getYoutubeByAllFilter } from "@/services/api/youtubeAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchYoutubeByAllFilter = createAsyncThunk(
  "youtube/getYoutubeByAllFilter",
  async ({
    langSelected,
    audienceSelected,
    tagSelected,
    endCursor,
    startCursor,
    getPage,
  }) => {
    const { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage } =
      await getYoutubeByAllFilter(
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
