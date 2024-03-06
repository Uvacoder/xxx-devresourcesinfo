import { getClient } from "../graphQLClient";
import {
  findAllLangQuery,
  findAllAudienceQuery,
  findAllTechnologiesQuery,
  allPodcastFilterQuery,
} from "../queries/podcastQueries";

export const getAllLang = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllLangQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allLanguage?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching all languages data:", error);
    return { data: [] };
  }
};

export const getAllAudience = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllAudienceQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allTarget?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching all audiences data:", error);
    return { data: [] };
  }
};

export const getAllTags = async () => {
  const client = getClient(false);
  try {
    const dataQuery = findAllTechnologiesQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allTechnology?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching all technologies data:", error);
    return { data: [] };
  }
};

export const getPodcastByAllFilter = async (
  langSelected,
  audienceSelected,
  tagSelected
) => {
  const client = getClient(false);
  try {
    const dataQuery = allPodcastFilterQuery(
      langSelected,
      audienceSelected,
      tagSelected
    );

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allPodcast?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching all Podcast data:", error);
    return { data: [] };
  }
};
