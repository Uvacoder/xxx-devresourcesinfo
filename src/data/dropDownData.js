import {
  getAllCities,
  getAllCountries,
  getAllContinents,
  getAllTechnologies,
} from "@/services/api/conferenceAPI";
import {
  getAllLang,
  getAllAudience,
  getAllTags,
} from "@/services/api/podcastAPI";

export const findDropDownCategory = [
  {
    name: "City",
    func: getAllCities,
    attrSelected: "citySelected",
  },
  {
    name: "Country",
    func: getAllCountries,
    attrSelected: "countrySelected",
  },
  {
    name: "Continent",
    func: getAllContinents,
    attrSelected: "continentSelected",
  },
  {
    name: "Technology",
    func: getAllTechnologies,
    attrSelected: "techSelected",
  },
  {
    name: "Audience",
    func: getAllAudience,
    attrSelected: "audienceSelected",
  },
  {
    name: "Tags",
    func: getAllTags,
    attrSelected: "tagSelected",
  },
  {
    name: "Language",
    func: getAllLang,
    attrSelected: "langSelected",
  },
];
