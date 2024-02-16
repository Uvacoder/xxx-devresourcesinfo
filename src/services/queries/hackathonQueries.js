import { gql } from "graphql-request";

const pastDate = process.env.NEXT_PAST_DATE_DATA || `"2023-01-01"`;

const commonQueries = `edges {
      node {
        city {
          ... on City {
            id
            name
            slug
          }
        }
        continent {
          ... on Continent {
            id
            name
            slug
          }
        }
        country {
          ... on Country {
            id
            name
            slug
          }
        }
        endDate
        id
        name
        startDate
        technology {
          ... on Technology {
            id
            name
            slug
          }
        }
        url
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount`;

export const allHackathonFilterQuery = (
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate
) => {
  let filtersSelected = `${
    techSelected
      ? `technology: { findOne: { Technology: { name: { contains: ${techSelected} } } } }`
      : ""
  },
  ${
    citySelected
      ? `city: { findOne: { City: { name: { contains: ${citySelected} } } } }`
      : ""
  }, 
  ${
    countrySelected
      ? `country: { findOne: { Country: { name: { contains: ${countrySelected} } } } }`
      : ""
  },
  ${
    continentSelected
      ? `continent: { findOne: { Continent: { name: { contains: ${continentSelected} } } } }`
      : ""
  }`;

  if (convertedDate) {
    return gql`
      query allHackathon {
        allHackathon(
          sort: {startDate: ASC},
          where: {
            startDate: {gte: ${convertedDate}},
              ${filtersSelected}
         }
       ) {
           ${commonQueries}
       }
     }
    `;
  } else {
    return gql`
  query allHackathon {
    allHackathon(
      sort: {startDate: ASC},
      where: {
         startDate: {gte: ${pastDate}},
          ${filtersSelected}
      }
    ) {
        ${commonQueries}
    }
  }
`;
  }
};
