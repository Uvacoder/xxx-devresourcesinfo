import { CONFERENCES_URL } from "./constants";

export const updateConferenceURL = (obj) => {
  const { citySelected, countrySelected, continentSelected, techSelected } =
    obj;
  if (citySelected && techSelected) {
    return `${CONFERENCES_URL}/${techSelected}/${continentSelected}/${countrySelected}/${citySelected}`;
  } else if (countrySelected && techSelected) {
    return `${CONFERENCES_URL}/${techSelected}/${continentSelected}/${countrySelected}`;
  } else if (continentSelected && techSelected) {
    return `${CONFERENCES_URL}/${techSelected}/${continentSelected}`;
  } else if (techSelected) {
    return `${CONFERENCES_URL}/${techSelected}`;
  } else if (citySelected) {
    return `${CONFERENCES_URL}/all/${continentSelected}/${countrySelected}/${citySelected}`;
  } else if (countrySelected) {
    return `${CONFERENCES_URL}/all/${continentSelected}/${countrySelected}`;
  } else if (continentSelected) {
    return `${CONFERENCES_URL}/all/${continentSelected}`;
  } else {
    return `${CONFERENCES_URL}`;
  }
};
