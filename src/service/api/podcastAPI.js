import { getClient } from "../graphQLClient";
import { allPodcastQuery } from "../queries/podcastQueries";

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
