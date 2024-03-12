import { gql } from "graphql-request";

const pastDate =
  `"${process.env.NEXT_PUBLIC_PAST_DATE_DATA}"` || `"2023-01-01"`;
const dataLimit = process.env.NEXT_PUBLIC_CAISY_DATA_LIMIT || 10;

const commonQueries = `edges {
      node {
         _meta {
          publishedAt
        }
        id
        name
        startDate
        endDate
        description
        organizerName
        organizerUrl
        language {
          ... on Language {
            id
            name
            slug
          }
        }
        tags
        technologies {
          ... on Technology {
            id
            name
            slug
            filledIcon {
              id
              src
            }
            unfilledIcon {
              id
              src
            }
          }
        }
        url
        city {
          id
          name
          slug
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
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }`;

export const findAllCitiesQuery = () => gql`
  query allCity {
    allCity {
      edges {
        node {
          _meta {
            publishedAt
          }
          id
          name
          slug
        }
      }
    }
  }
`;

export const findAllCountriesQuery = () => gql`
  query allCountry {
    allCountry {
      edges {
        node {
          _meta {
            publishedAt
          }
          id
          name
          slug
        }
      }
    }
  }
`;

export const findAllContinentsQuery = () => gql`
  query allContinent {
    allContinent {
      edges {
        node {
          _meta {
            publishedAt
          }
          id
          name
          slug
        }
      }
    }
  }
`;

export const findAllTechnologiesQuery = () => gql`
  query allTechnology {
    allTechnology {
      edges {
        node {
          _meta {
            publishedAt
          }
          id
          name
          slug
        }
      }
    }
  }
`;

export const findAreaByCityQuery = (cityId) => gql`
  query City {
    City(id: ${cityId}) {
      id
      name
      slug
      country {
        continent {
          id
          name
          slug
        }
        id
        name
        slug
      }
    }
  }
`;

export const findAreaByCountryQuery = (countryId) => gql`
  query Country {
    Country(id: ${countryId}) {
      id
      name
      slug
      continent {
        id
        name
        slug
      }
    }
  }
`;

export const allConferenceFilterQuery = ({
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate,
  endCursor,
  startCursor,
}) => {
  let filtersSelected = `${
    techSelected
      ? `technologies: { findOne: { Technology: { name: { contains: ${techSelected} } } } }`
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
      query allConference {
        allConference(
        sort: {startDate: ASC}
         ${startCursor ? `last:  ${dataLimit}` : `first:  ${dataLimit}`}
          ${endCursor ? `after:  ${endCursor}` : ""},
          ${startCursor ? `before:  ${startCursor}` : ""},
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
  query allConference {
    allConference(
       sort: {startDate: ASC}
       ${startCursor ? `last:  ${dataLimit}` : `first:  ${dataLimit}`}
       ${endCursor ? `after:  ${endCursor}` : ""},
       ${startCursor ? `before:  ${startCursor}` : ""},
     
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
