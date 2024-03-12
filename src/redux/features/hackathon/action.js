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
    endCursor,
    startCursor,
    getPage,
  }) => {
    const { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage } =
      await getHackathonByAllFilters(
        citySelected,
        countrySelected,
        continentSelected,
        techSelected,
        convertedDate,
        endCursor,
        startCursor,
        getPage
      );
    return { data, hasEndCursor, hasStartCursor, hasNextPage, hasPreviousPage };
  }
);
