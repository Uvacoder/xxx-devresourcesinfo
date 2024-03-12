import { getPodcastByAllFilter } from "@/services/api/podcastAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPodcastByAllFilter = createAsyncThunk(
  "podcasts/getPodcastByAllFilter",
  async ({
    langSelected,
    audienceSelected,
    tagSelected,
    endCursor,
    startCursor,
    getPage,
  }) => {
    const { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage } =
      await getPodcastByAllFilter(
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
