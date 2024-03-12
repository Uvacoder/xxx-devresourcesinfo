import { getClient } from "../graphQLClient";
import { allYoutubeFilterQuery } from "../queries/youtubeQueries";

export const getYoutubeByAllFilter = async (
  langSelected,
  audienceSelected,
  tagSelected,
  endCursor,
  startCursor,
  getPage
) => {
  const client = getClient(false);
  try {
    let dataQuery;

    if (getPage === "previous") {
      dataQuery = allYoutubeFilterQuery({
        langSelected,
        audienceSelected,
        tagSelected,
        startCursor,
        endCursor: "",
      });
    } else {
      dataQuery = allYoutubeFilterQuery({
        langSelected,
        audienceSelected,
        tagSelected,
        startCursor: "",
        endCursor,
      });
    }

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allYouTube?.edges || [],
      hasEndCursor: gqlResponse?.allYouTube?.pageInfo?.endCursor,
      hasStartCursor: gqlResponse?.allYouTube?.pageInfo?.startCursor,
      hasNextPage: gqlResponse?.allYouTube?.pageInfo?.hasNextPage,
      hasPreviousPage: gqlResponse?.allYouTube?.pageInfo?.hasPreviousPage,
    };
  } catch (error) {
    console.error("Error fetching all youTube data:", error);
    return {
      data: [],
      hasEndCursor: "",
      hasStartCursor: "",
      hasNextPage: "",
      hasPreviousPage: "",
    };
  }
};
