import { getYoutubeByAllFilter } from "@/services/api/youtubeAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchYoutubeByAllFilter = createAsyncThunk(
  "youtube/getYoutubeByAllFilter",
  async ({ langSelected, audienceSelected, tagSelected }) => {
    const { data, hasEndCursor, hasNextPage } = await getYoutubeByAllFilter(
      langSelected,
      audienceSelected,
      tagSelected
    );
    return data;
  }
);
