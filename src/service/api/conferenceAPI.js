import { getClient } from "../graphQLClient";
import {
  allConferenceQuery,
  sortedConferenceQuery,
  findConferenceByTechQuery,
  findConferenceByCityQuery,
  findConferenceByCountryQuery,
  findConferenceByContinentQuery,
} from "../queries/conferenceQueries";

export const getAllConferences = async () => {
  const client = getClient(false);
  try {
    const dataQuery = allConferenceQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allConference?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};

//ASC or DESC

export const getsortedConferences = async (sortBy) => {
  const client = getClient(false);
  try {
    const dataQuery = sortedConferenceQuery(sortBy);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allConference?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};

export const getConferenceByTech = async (techName) => {
  const client = getClient(false);
  try {
    const dataQuery = findConferenceByTechQuery(techName);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allConference?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};

export const getConferenceByCity = async (cityName) => {
  const client = getClient(false);
  try {
    const dataQuery = findConferenceByCityQuery(cityName);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allConference?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};

export const getConferenceByCountry = async (countryName) => {
  const client = getClient(false);
  try {
    const dataQuery = findConferenceByCountryQuery(countryName);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allConference?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};

export const getConferenceByContinent = async (continentName) => {
  const client = getClient(false);
  try {
    const dataQuery = findConferenceByContinentQuery(continentName);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allConference?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};