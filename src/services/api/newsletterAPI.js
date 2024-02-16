import { getClient } from "../graphQLClient";
import { allNewsletterFilterQuery } from "../queries/newsletterQueries"; 

export const getNewsletterByAllFilter = async (
  langSelected,
  audienceSelected,
  tagSelected
) => {
  const client = getClient(false);
  try {
    const dataQuery = allNewsletterFilterQuery(
      langSelected,
      audienceSelected,
      tagSelected
    );

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allNewsletter?.edges || [],
    };
  } catch (error) {
    console.error(
      "Error fetching all newsletter data:",
      error
    );
    return { data: [] };
  }
};
