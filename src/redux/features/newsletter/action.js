
import { getNewsletterByAllFilter } from "@/services/api/newsletterAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNewsletterByAllFilter = createAsyncThunk(
  "newletters/getNewsletterByAllFilter",
  async ({ langSelected, audienceSelected, tagSelected }) => {
    const { data, hasEndCursor, hasNextPage } = await getNewsletterByAllFilter(
      langSelected,
      audienceSelected,
      tagSelected
    );
    return data;
  }
);
