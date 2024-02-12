import {
  getAllCities,
  getAllCountries,
  getAllContinents,
  getAllTechnologies,
} from "@/services/api/conferenceAPI";

export const findDropDownCategory = [
  { name: "City", func: getAllCities, attrSelected: "citySelected" },
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
];
