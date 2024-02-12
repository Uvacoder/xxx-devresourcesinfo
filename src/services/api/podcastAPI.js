import { getClient } from "../graphQLClient";
import {
  allPodcastQuery,
  findPodcastByLangQuery,
  findPodcastByAudienceQuery,
} from "../queries/podcastQueries";

export const getAllPodcasts = async () => {
  const client = getClient(false);
  try {
    const gqlResponse = await client.request(allPodcastQuery);
    return {
      data: gqlResponse?.allPodcast?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching podcast data:", error);
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
    console.error("Error fetching podcast data:", error);
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
    console.error("Error fetching podcast data:", error);
    return { data: [] };
  }
};