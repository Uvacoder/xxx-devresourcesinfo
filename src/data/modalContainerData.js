import {
  fetchConferencesByCity,
  fetchConferencesByCountry,
  fetchConferencesByContinent,
  fetchConferencesByTech,
} from "@/redux/features/conference/action";
import {
  setCityFilter,
  setCountryFilter,
  setContinentFilter,
  setTechFilter,
} from "@/redux/features/conference/conferenceSlice";

export const findCategoryData = [
  {
    name: "City",
    func: fetchConferencesByCity,
    toChangeAtt: setCityFilter,
    isActiveValue: "citySelected",
  },
  {
    name: "Country",
    func: fetchConferencesByCountry,
    toChangeAtt: setCountryFilter,
    isActiveValue: "countrySelected",
  },
  {
    name: "Continent",
    func: fetchConferencesByContinent,
    toChangeAtt: setContinentFilter,
    isActiveValue: "continentSelected",
  },
  {
    name: "Technology",
    func: fetchConferencesByTech,
    toChangeAtt: setTechFilter,
    isActiveValue: "techSelected",
  },
];
