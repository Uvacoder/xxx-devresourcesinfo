import { getClient } from "../graphQLClient";
import { allHackathonFilterQuery } from "../queries/hackathonQueries";

export const getHackathonByAllFilters = async (
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate
) => {
  const client = getClient(false);
  try {
    const dataQuery = allHackathonFilterQuery(
      citySelected,
      countrySelected,
      continentSelected,
      techSelected,
      convertedDate
    );
   
    const gqlResponse = await client.request(dataQuery);

    return {
      data: gqlResponse?.allHackathon?.edges || [],
    };
  } catch (error) {
    console.error("Error fetching hackathons data:", error);
    return { data: [] };
  }
};
