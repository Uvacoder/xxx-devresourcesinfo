import { getClient } from "../graphQLClient";
import { allNewsletterFilterQuery } from "../queries/newsletterQueries";

export const getNewsletterByAllFilter = async (
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
      dataQuery = allNewsletterFilterQuery({
        langSelected,
        audienceSelected,
        tagSelected,
        startCursor,
        endCursor: "",
      });
    } else {
      dataQuery = allNewsletterFilterQuery({
        langSelected,
        audienceSelected,
        tagSelected,
        startCursor: "",
        endCursor,
      });
    }

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allNewsletter?.edges || [],
      hasEndCursor: gqlResponse?.allNewsletter?.pageInfo?.endCursor,
      hasStartCursor: gqlResponse?.allNewsletter?.pageInfo?.startCursor,
      hasNextPage: gqlResponse?.allNewsletter?.pageInfo?.hasNextPage,
      hasPreviousPage: gqlResponse?.allNewsletter?.pageInfo?.hasPreviousPage,
    };
  } catch (error) {
    console.error("Error fetching all newsletter data:", error);
    return {
      data: [],
      hasEndCursor: "",
      hasStartCursor: "",
      hasNextPage: "",
      hasPreviousPage: "",
    };
  }
};
