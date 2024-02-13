import { getClient } from "../graphQLClient";
import {
  allPodcastQuery,
  findPodcastByLangQuery,
  findPodcastByAudienceQuery,
  findAllLangQuery,
  findAllAudienceQuery,
  findAllTechnologiesQuery,
  allPodcastFilterQuery,
} from "../queries/podcastQueries";

export const getAllPodcasts = async () => {
  const client = getClient(false);
  try {
    const dataQuery = allPodcastQuery();
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allPodcast?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching all podcast data:", error);
    return { data: [] };
  }
};

export const getPodcastByLang = async (langSelected) => {
  const client = getClient(false);
  try {
    const dataQuery = findPodcastByLangQuery(langSelected);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allPodcast?.edges || [],
      hasEndCursor: gqlResponse?.allPodcast?.pageInfo?.endCursor,
      hasNextPage: gqlResponse?.allPodcast?.pageInfo?.hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching podcast data by language:", error);
    return { data: [] };
  }
};

export const getPodcastByAudience = async (audienceType) => {
  const client = getClient(false);
  try {
    const dataQuery = findPodcastByAudienceQuery(audienceType);
    const gqlResponse = await client.request(dataQuery);
    return {
      data: gqlResponse?.allPodcast?.edges || [],
      hasEndCursor: gqlResponse?.allPodcast?.pageInfo?.endCursor,
      hasNextPage: gqlResponse?.allPodcast?.pageInfo?.hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching podcast data by audience:", error);
    return { data: [] };
  }
};

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
    console.error("Error fetching technologies data:", error);
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
    console.log(
      allPodcastFilterQuery(langSelected, audienceSelected, tagSelected)
    );
    const gqlResponse = await client.request(dataQuery);
    console.log(gqlResponse.allPodcast.totalCount);
    return {
      data: gqlResponse?.allPodcast?.edges || [],
    };
  } catch (error) {
    console.error(
      "Error fetching all Podcast data by applying filters:",
      error
    );
    return { data: [] };
  }
};
