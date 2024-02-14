import {
  setCityFilter,
  setCountryFilter,
  setContinentFilter,
  setTechFilter,
} from "@/redux/features/conference/conferenceSlice";
import {
  setLangFilter,
  setAudienceFilter,
  setTagFilter,
} from "@/redux/features/podcast/podcastSlice";

export const findCategoryData = [
  {
    name: "City",
    toChangeAtt: setCityFilter,
    isActiveValue: "citySelected",
  },
  {
    name: "Country",
    toChangeAtt: setCountryFilter,
    isActiveValue: "countrySelected",
  },
  {
    name: "Continent",
    toChangeAtt: setContinentFilter,
    isActiveValue: "continentSelected",
  },
  {
    name: "Technology",
    toChangeAtt: setTechFilter,
    isActiveValue: "techSelected",
  },
  {
    name: "Language",
    toChangeAtt: setLangFilter,
    isActiveValue: "techSelected",
  },
  {
    name: "Audience",
    toChangeAtt: setAudienceFilter,
    isActiveValue: "techSelected",
  },
  {
    name: "Tags",
    toChangeAtt: setTagFilter,
    isActiveValue: "techSelected",
  },
];
