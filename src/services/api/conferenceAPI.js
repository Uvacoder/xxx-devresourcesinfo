import { getClient } from "../graphQLClient";
import {
  findAllCitiesQuery,
  findAllCountriesQuery,
  findAllContinentsQuery,
  findAllTechnologiesQuery,
  allConferenceFilterQuery,
  findAreaByCityQuery,
  findAreaByCountryQuery,
} from "../queries/conferenceQueries";

export const getAllCities = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllCitiesQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allCity?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching cities data:", error);
    return { data: [] };
  }
};

export const getAllCountries = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllCountriesQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allCountry?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching countries data:", error);
    return { data: [] };
  }
};

export const getAllContinents = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllContinentsQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allContinent?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching continents data:", error);
    return { data: [] };
  }
};

export const getAllTechnologies = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllTechnologiesQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allTechnology?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching technologies data:", error);
    return { data: [] };
  }
};

export const getAreaByCity = async (cityId) => {
  const client = getClient(false);
  try {
    const dataQuery = findAreaByCityQuery(cityId);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.City || [],
    };
  } catch (error) {
    console.error("Error fetching country and continent by city:", error);
    return { data: [] };
  }
};

export const getAreaByCountry = async (countryId) => {
  const client = getClient(false);
  try {
    const dataQuery = findAreaByCountryQuery(countryId);
    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.Country || [],
    };
  } catch (error) {
    console.error("Error fetching continent by country:", error);
    return { data: [] };
  }
};

export const getConferenceByAllFilters = async (
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate,
  endCursor,
  startCursor,
  getPage
) => {
  const client = getClient(false);

  try {
    let dataQuery;

    if (getPage === "previous") {
      dataQuery = allConferenceFilterQuery({
        citySelected,
        countrySelected,
        continentSelected,
        techSelected,
        convertedDate,
        startCursor,
        endCursor: "",
      });
    } else {
      dataQuery = allConferenceFilterQuery({
        citySelected,
        countrySelected,
        continentSelected,
        techSelected,
        convertedDate,
        startCursor: "",
        endCursor,
      });
    }

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allConference?.edges || [],
      hasEndCursor: gqlResponse?.allConference?.pageInfo?.endCursor,
      hasStartCursor: gqlResponse?.allConference?.pageInfo?.startCursor,
      hasNextPage: gqlResponse?.allConference?.pageInfo?.hasNextPage,
      hasPreviousPage: gqlResponse?.allConference?.pageInfo?.hasPreviousPage,
    };
  } catch (error) {
    console.error("Error fetching conference data:", error);
    return {
      data: [],
      hasEndCursor: "",
      hasStartCursor: "",
      hasNextPage: "",
      hasPreviousPage: "",
    };
  }
};
