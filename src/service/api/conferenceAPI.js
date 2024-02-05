import { getClient } from "../graphQLClient";
import {
  allConferenceQuery,
  sortedConferenceQuery,
  findConferenceByCityQuery,
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