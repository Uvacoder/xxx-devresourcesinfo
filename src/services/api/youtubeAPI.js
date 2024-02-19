import { getClient } from "../graphQLClient";
import { allYoutubeFilterQuery } from "../queries/youtubeQueries";

export const getYoutubeByAllFilter = async (
  langSelected,
  audienceSelected,
  tagSelected
) => {
  const client = getClient(false);
  try {
    const dataQuery = allYoutubeFilterQuery(
      langSelected,
      audienceSelected,
      tagSelected
    );

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allYouTube?.edges || [],
    };
  } catch (error) {
    console.error(
      "Error fetching all youTube data:",
      error
    );
    return { data: [] };
  }
};
