import { CONFERENCES_URL } from "./constants";

export const updateConferenceURL = (obj) => {
  const { citySelected, countrySelected, continentSelected, techSelected } =
    obj;
  if (citySelected && techSelected) {
    return `${CONFERENCES_URL}/${continentSelected}/${countrySelected}/${citySelected}/${techSelected}`;
  } else if (countrySelected && techSelected) {
    return `${CONFERENCES_URL}/${continentSelected}/${countrySelected}/${techSelected}`;
  } else if (continentSelected && techSelected) {
    return `${CONFERENCES_URL}/${continentSelected}/${techSelected}`;
  } else if (techSelected) {
    return `${CONFERENCES_URL}/${techSelected}`;
  } else if (citySelected) {
    return `${CONFERENCES_URL}/${continentSelected}/${countrySelected}/${citySelected}`;
  } else if (countrySelected) {
    return `${CONFERENCES_URL}/${continentSelected}/${countrySelected}`;
  } else if (continentSelected) {
    return `${CONFERENCES_URL}/${continentSelected}`;
  } else {
    return `${CONFERENCES_URL}`;
  }
};
