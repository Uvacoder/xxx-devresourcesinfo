import {
  getAllCities,
  getAllCountries,
  getAllContinents,
  getAllTechnologies,
} from "@/services/api/conferenceAPI";
import { getAllLang, getAllAudience, getAllTags } from "@/services/api/podcastAPI";

export const findDropDownCategory = [
  {
    name: "City",
    func: getAllCities,
    attrSelected: "citySelected",
    page: "conferences",
  },
  {
    name: "Country",
    func: getAllCountries,
    attrSelected: "countrySelected",
    page: "conferences",
  },
  {
    name: "Continent",
    func: getAllContinents,
    attrSelected: "continentSelected",
    page: "conferences",
  },
  {
    name: "Technology",
    func: getAllTechnologies,
    attrSelected: "techSelected",
    page: "conferences",
  },
  {
    name: "Audience",
    func: getAllAudience,
    attrSelected: "audienceSelected",
    page: "podcasts",
  },
  {
    name: "Tags",
    func: getAllTags,
    attrSelected: "tagSelected",
    page: "podcasts",
  },
  {
    name: "Language",
    func: getAllLang,
    attrSelected: "langSelected",
    page: "podcasts",
  },
];
