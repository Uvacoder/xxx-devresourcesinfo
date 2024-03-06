import { getClient } from "../graphQLClient";
import { allBlogFilterQuery } from "../queries/blogQueries";

export const getBlogByAllFilter = async (
  langSelected,
  audienceSelected,
  tagSelected
) => {
  const client = getClient(false);
  try {
    const dataQuery = allBlogFilterQuery(
      langSelected,
      audienceSelected,
      tagSelected
    );

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allBlog?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching all blogs data:", error);
    return { data: [] };
  }
};
