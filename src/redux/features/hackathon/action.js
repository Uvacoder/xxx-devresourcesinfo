import { getHackathonByAllFilters } from "@/services/api/hackathonAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHackathonsByAllFilter = createAsyncThunk(
  "hackathons/getHackathonByAllFilters",
  async ({
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    convertedDate,
  }) => {
    const { data, hasEndCursor, hasNextPage } = await getHackathonByAllFilters(
      citySelected,
      countrySelected,
      continentSelected,
      techSelected,
      convertedDate
    );
    return data;
  }
);
