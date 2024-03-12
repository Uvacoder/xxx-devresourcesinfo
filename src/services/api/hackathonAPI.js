import { getClient } from "../graphQLClient";
import { allHackathonFilterQuery } from "../queries/hackathonQueries";

export const getHackathonByAllFilters = async (
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate,
  endCursor,
  startCursor,
  getPage
) => {
  const client = getClient(false);
  try {
    let dataQuery;

    if (getPage === "previous") {
      dataQuery = allHackathonFilterQuery({
        citySelected,
        countrySelected,
        continentSelected,
        techSelected,
        convertedDate,
        startCursor,
        endCursor: "",
      });
    } else {
      dataQuery = allHackathonFilterQuery({
        citySelected,
        countrySelected,
        continentSelected,
        techSelected,
        convertedDate,
        startCursor: "",
        endCursor,
      });
    }

    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allHackathon?.edges || [],
      hasEndCursor: gqlResponse?.allHackathon?.pageInfo?.endCursor,
      hasStartCursor: gqlResponse?.allHackathon?.pageInfo?.startCursor,
      hasNextPage: gqlResponse?.allHackathon?.pageInfo?.hasNextPage,
      hasPreviousPage: gqlResponse?.allHackathon?.pageInfo?.hasPreviousPage,
    };
  } catch (error) {
    console.error("Error fetching hackathons data:", error);
    return {
      data: [],
      hasEndCursor: "",
      hasStartCursor: "",
      hasNextPage: "",
      hasPreviousPage: "",
    };
  }
};
