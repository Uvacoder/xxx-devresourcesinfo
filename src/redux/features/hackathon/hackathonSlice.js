import { createSlice } from "@reduxjs/toolkit";
import { fetchHackathonsByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { HACKATHONS_URL, DEV_RESOURCES } from "@/utils/constants";

const initialState = {
  allHackathons: [],
  citySelected: "",
  countrySelected: "",
  continentSelected: "",
  techSelected: "",
  cityId: "",
  countryId: "",
  pastHackathons: false,
  status: "",
  error: "",
  todayDate: "",
};

export const hackathonSlice = createSlice({
  name: "hackathons",
  initialState,
  reducers: {
    setHackathonCityFilter: (state, action) => {
      state.citySelected = action.payload.value;
      state.cityId = action.payload.id;
    },
    setHackathonCountryFilter: (state, action) => {
      state.citySelected = "";
      state.countrySelected = action.payload.value;
      state.countryId = action.payload.id;
    },
    setHackathonContinentFilter: (state, action) => {
      state.citySelected = "";
      state.countrySelected = "";
      state.continentSelected = action.payload.value;
    },
    setHackathonTechFilter: (state, action) => {
      state.techSelected = action.payload.value;
    },
    setHackathonOtherByCity: (state, action) => {
      state.countrySelected = action.payload.country;
      state.continentSelected = action.payload.continent;
    },
    setHackathonOtherByCountry: (state, action) => {
      state.continentSelected = action.payload;
    },
    pastHackathonUpdate: (state, action) => {
      state.pastHackathons = !state.pastHackathons;
    },
    setHackathonTodayDate: (state, action) => {
      state.todayDate = action.payload;
    },
    clearHackathonFilters: (state, action) => {
      state.citySelected = "";
      state.countrySelected = "";
      state.continentSelected = "";
      state.techSelected = "";
      state.pastHackathons = false;

      clearFiltersFromURL(HACKATHONS_URL);
    },
    setHackathonDataByUrl: (state, action) => {
      state.citySelected = action.payload?.citySelected ?? "";
      state.countrySelected = action.payload?.countrySelected ?? "";
      state.continentSelected = action.payload?.continentSelected ?? "";
      state.techSelected = action.payload?.techSelected ?? "";
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchHackathonsByAllFilter
      .addCase(fetchHackathonsByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHackathonsByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allHackathons = action.payload;
      })
      .addCase(fetchHackathonsByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  setHackathonCityFilter,
  setHackathonCountryFilter,
  setHackathonContinentFilter,
  setHackathonTechFilter,
  setHackathonOtherByCity,
  setHackathonOtherByCountry,
  pastHackathonUpdate,
  setHackathonTodayDate,
  clearHackathonFilters,
  setHackathonDataByUrl,
} = hackathonSlice.actions;

export default hackathonSlice.reducer;
