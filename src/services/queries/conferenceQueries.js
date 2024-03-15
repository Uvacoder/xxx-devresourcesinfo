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
          }
        }
        technologies {
          ... on Technology {
            id
            name
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
        }
        continent {
          ... on Continent {
            id
            name
          }
        }
        country {
          ... on Country {
            id
            name
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
        }
      }
    }
  }
`;

export const findAllCitiesExpandedQuery = () => gql`
  query allCity {
    allCity {
      edges {
        node {
          _meta {
            publishedAt
          }
          name
          country {
            name
            continent {
              name
            }
          }
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
        }
      }
    }
  }
`;

export const findAllCountriesWithContinentQuery = () => gql`
  query allCountry {
    allCountry {
      edges {
        node {
          _meta {
            publishedAt
          }
          name
          continent {
            name
          }
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
        }
      }
    }
  }
`;

export const findAllTechnologiesQuery = () => gql`
  query allTechnology {
    allTechnology (where: {conferencesTech: true}) {
      edges {
        node {
          _meta {
            publishedAt
          }
          id
          name
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
      country {
        continent {
          id
          name
        }
        id
        name
      }
    }
  }
`;

export const findAreaByCountryQuery = (countryId) => gql`
  query Country {
    Country(id: ${countryId}) {
      id
      name
      continent {
        id
        name
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
  let filtersSelected = `${techSelected
      ? `technologies: { findOne: { Technology: { name: { contains: ${techSelected} } } } }`
      : ""
    },
  ${citySelected
      ? `city: { findOne: { City: { name: { contains: ${citySelected} } } } }`
      : ""
    }, 
  ${countrySelected
      ? `country: { findOne: { Country: { name: { contains: ${countrySelected} } } } }`
      : ""
    },
  ${continentSelected
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
