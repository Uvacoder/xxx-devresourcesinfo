import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllConferences,
  fetchUpcomingConferences,
  fetchConferencesByTech,
  fetchConferencesByCity,
  fetchConferencesByCountry,
  fetchConferencesByContinent,
} from "./action";

const initialState = {
  allConferences: [],
  citySelected: "",
  countrySelected: "",
  continentSelected: "",
  techSelected: "",
  pastConf: false,
  status: "",
  error: "",
};

export const conferenceSlice = createSlice({
  name: "conferences",
  initialState,
  reducers: {
    setCityFilter: (state, action) => {
      state.citySelected = action.payload;
      state.countrySelected = "";
      state.continentSelected = "";
      state.techSelected = "";
      state.pastConf = true;
    },
    setCountryFilter: (state, action) => {
      state.citySelected = "";
      state.countrySelected = action.payload;
      state.continentSelected = "";
      state.techSelected = "";
      state.pastConf = true;
    },
    setContinentFilter: (state, action) => {
      state.citySelected = "";
      state.countrySelected = "";
      state.continentSelected = action.payload;
      state.techSelected = "";
      state.pastConf = true;
    },
    setTechFilter: (state, action) => {
      state.countrySelected = "";
      state.continentSelected = "";
      state.citySelected = "";
      state.techSelected = action.payload;
      state.pastConf = true;
    },
    pastConfUpdate: (state, action) => {
      state.countrySelected = "";
      state.continentSelected = "";
      state.citySelected = "";
      state.techSelected = "";
      state.pastConf = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllConferences
      .addCase(fetchAllConferences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllConferences.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchAllConferences.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchUpcomingConferences
      .addCase(fetchUpcomingConferences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingConferences.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchUpcomingConferences.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchConferencesByTech
      .addCase(fetchConferencesByTech.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConferencesByTech.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchConferencesByTech.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchConferencesByCity
      .addCase(fetchConferencesByCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConferencesByCity.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchConferencesByCity.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchConferencesByCountry
      .addCase(fetchConferencesByCountry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConferencesByCountry.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchConferencesByCountry.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // fetchConferencesByContinent
      .addCase(fetchConferencesByContinent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConferencesByContinent.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchConferencesByContinent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  setCityFilter,
  setCountryFilter,
  setContinentFilter,
  setTechFilter,
  pastConfUpdate,
} = conferenceSlice.actions;

export default conferenceSlice.reducer;
