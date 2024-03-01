import { gql } from "graphql-request";

const pastDate = process.env.NEXT_PAST_DATE_DATA || `"2023-01-01"`;

const commonQueries = `edges {
      node {
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

export const allConferenceQuery = () => gql`
  query allConference {
    allConference {
      ${commonQueries}
    }
  }
`;

export const upcomingConferenceQuery = (currentDate) => gql`
  query allConference {
    allConference( sort: {startDate: ASC}, where: {startDate: {gte: ${currentDate}}}) {
      ${commonQueries}
    }
  }
`;

export const upcomingConferenceLimitQuery = (
  currentDate,
  endCursorValue
) => gql`
  query allConference {
    allConference(first: ${dataLimit}, after: ${
  endCursorValue ?? `""`
}, sort: {startDate: ASC}, where: {startDate: {gte: ${currentDate}}}) {
      ${commonQueries}
    }
  }
`;

export const findAllCitiesQuery = () => gql`
  query allCity {
    allCity {
      edges {
        node {
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

export const allConferenceFilterQuery = (
  citySelected,
  countrySelected,
  continentSelected,
  techSelected,
  convertedDate
) => {
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
  query allConference {
    allConference(
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
