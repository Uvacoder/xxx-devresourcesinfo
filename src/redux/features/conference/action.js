import {
  getAllConferences,
  getUpcomingConferences,
  getAllCities,
  getAllCountries,
  getAllContinents,
  getAllTechnologies,
  getConferenceByAllFilters,
} from "@/services/api/conferenceAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllConferences = createAsyncThunk(
  "conferences/getAllConferences",
  async () => {
    const { data, hasEndCursor, hasNextPage } = await getAllConferences();
    return data;
  }
);

export const fetchUpcomingConferences = createAsyncThunk(
  "conferences/getUpcomingConferences",
  async (convertedDate) => {
    const { data, hasEndCursor, hasNextPage } = await getUpcomingConferences(
      convertedDate
    );
    return data;
  }
);

export const fetchAllCities = createAsyncThunk(
  "conferences/getAllCities",
  async () => {
    const { data, hasEndCursor, hasNextPage } = await getAllCities();
    return data;
  }
);

export const fetchAllCountries = createAsyncThunk(
  "conferences/getAllCountries",
  async () => {
    const { data, hasEndCursor, hasNextPage } = await getAllCountries();
    return data;
  }
);

export const fetchAllContinents = createAsyncThunk(
  "conferences/getAllContinents",
  async () => {
    const { data, hasEndCursor, hasNextPage } = await getAllContinents();
    return data;
  }
);

export const fetchAllTechnologies = createAsyncThunk(
  "conferences/getAllTechnologies",
  async () => {
    const { data, hasEndCursor, hasNextPage } = await getAllTechnologies();
    return data;
  }
);

export const fetchConferencesByAllFilter = createAsyncThunk(
  "conferences/getConferenceByAllFilters",
  async ({
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    convertedDate,
  }) => {
    const { data, hasEndCursor, hasNextPage } = await getConferenceByAllFilters(
      citySelected,
      countrySelected,
      continentSelected,
      techSelected,
      convertedDate
    );
    return data;
  }
);
