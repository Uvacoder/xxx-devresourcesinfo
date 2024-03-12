import { getNewsletterByAllFilter } from "@/services/api/newsletterAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNewsletterByAllFilter = createAsyncThunk(
  "newletters/getNewsletterByAllFilter",
  async ({
    langSelected,
    audienceSelected,
    tagSelected,
    endCursor,
    startCursor,
    getPage,
  }) => {
    const { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage } =
      await getNewsletterByAllFilter(
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
