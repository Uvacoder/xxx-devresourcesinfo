import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllConferences,
  fetchUpcomingConferences,
  fetchConferencesByAllFilter,
} from "./action";

const initialState = {
  allConferences: [],
  citySelected: "",
  countrySelected: "",
  continentSelected: "",
  techSelected: "",
  cityId: "",
  countryId: "",
  pastConf: false,
  status: "",
  error: "",
  todayDate: "",
};

export const conferenceSlice = createSlice({
  name: "conferences",
  initialState,
  reducers: {
    setCityFilter: (state, action) => {
      state.citySelected = action.payload.value;
      state.cityId = action.payload.id;
    },
    setCountryFilter: (state, action) => {
      state.citySelected = "";
      state.countrySelected = action.payload.value;
      state.countryId = action.payload.id;
    },
    setContinentFilter: (state, action) => {
      state.citySelected = "";
      state.countrySelected = "";
      state.continentSelected = action.payload.value;
    },
    setTechFilter: (state, action) => {
      state.techSelected = action.payload.value;
    },
    setOtherByCity: (state, action) => {
      state.countrySelected = action.payload.country;
      state.continentSelected = action.payload.continent;
    },
    setOtherByCountry: (state, action) => {
      state.continentSelected = action.payload;
    },
    pastConfUpdate: (state, action) => {
      state.pastConf = !state.pastConf;
    },
    setTodayDate: (state, action) => {
      state.todayDate = action.payload;
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

      // fetchConferencesByAllFilter
      .addCase(fetchConferencesByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConferencesByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allConferences = action.payload;
      })
      .addCase(fetchConferencesByAllFilter.rejected, (state, action) => {
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
  setOtherByCity,
setOtherByCountry,
  pastConfUpdate,
  setTodayDate,
} = conferenceSlice.actions;

export default conferenceSlice.reducer;
