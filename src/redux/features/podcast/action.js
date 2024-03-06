import { getPodcastByAllFilter } from "@/services/api/podcastAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPodcastByAllFilter = createAsyncThunk(
  "podcasts/getPodcastByAllFilter",
  async ({ langSelected, audienceSelected, tagSelected }) => {
    const { data, hasEndCursor, hasNextPage } = await getPodcastByAllFilter(
      langSelected,
      audienceSelected,
      tagSelected
    );
    return data;
  }
);
