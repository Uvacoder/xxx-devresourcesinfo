import { getClient } from "../graphQLClient";
import { allBlogFilterQuery } from "../queries/blogQueries";

export const getBlogByAllFilter = async (
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
      dataQuery = allBlogFilterQuery({
        langSelected,
        audienceSelected,
        tagSelected,
        startCursor,
        endCursor: "",
      });
    } else {
      dataQuery = allBlogFilterQuery({
        langSelected,
        audienceSelected,
        tagSelected,
        startCursor: "",
        endCursor,
      });
    }

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allBlog?.edges || [],
      hasEndCursor: gqlResponse?.allBlog?.pageInfo?.endCursor,
      hasStartCursor: gqlResponse?.allBlog?.pageInfo?.startCursor,
      hasNextPage: gqlResponse?.allBlog?.pageInfo?.hasNextPage,
      hasPreviousPage: gqlResponse?.allBlog?.pageInfo?.hasPreviousPage,
    };
  } catch (error) {
    console.error("Error fetching all blogs data:", error);
    return {
      data: [],
      hasEndCursor: "",
      hasStartCursor: "",
      hasNextPage: "",
      hasPreviousPage: "",
    };
  }
};
