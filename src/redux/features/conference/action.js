import {
  getAllConferences,
  getUpcomingConferences,
  getConferenceByTech,
  getConferenceByCity,
  getConferenceByCountry,
  getConferenceByContinent,
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

export const fetchConferencesByTech = createAsyncThunk(
  "conferences/getConferenceByTech",
  async (techName) => {
    const { data, hasEndCursor, hasNextPage } = await getConferenceByTech(
      techName
    );
    return data;
  }
);

export const fetchConferencesByCity = createAsyncThunk(
  "conferences/getConferenceByCity",
  async (cityName) => {
    const { data, hasEndCursor, hasNextPage } = await getConferenceByCity(
      cityName
    );
    return data;
  }
);

export const fetchConferencesByCountry = createAsyncThunk(
  "conferences/getConferenceByCountry",
  async (countryName) => {
    const { data, hasEndCursor, hasNextPage } = await getConferenceByCountry(
      countryName
    );
    return data;
  }
);

export const fetchConferencesByContinent = createAsyncThunk(
  "conferences/getConferenceByContinent",
  async (continentName) => {
    const { data, hasEndCursor, hasNextPage } = await getConferenceByContinent(
      continentName
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
    areaSelected,
    areaValue,
    techSelected,
    convertedDate,
  }) => {
    const { data, hasEndCursor, hasNextPage } = await getConferenceByAllFilters(
      areaSelected,
      areaValue,
      techSelected,
      convertedDate
    );
    return data;
  }
);
