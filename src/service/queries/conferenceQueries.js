import { gql } from "graphql-request";

const commonQueries = `edges {
      node {
        id
        name
        startDate
        endDate
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

//ASC or DESC
export const sortedConferenceQuery = (sortBy) => gql`
  query allConference {
    allConference(sort: { startDate: ${sortBy} }) {
     ${commonQueries}
    }
  }
`;

export const findConferenceByTechQuery = (techName) => gql`
  query allConference {
    allConference(
      where: {
        technologies: {findOne: {Technology: {name: { contains: ${techName} } } } }
      }
    ) {
        ${commonQueries}
    }
  }
`;

export const findConferenceByCityQuery = (cityName) => gql`
  query allConference {
    allConference(
      where: {
        city: { findOne: { City: { name: { contains: ${cityName} } } } }
      }
    ) {
        ${commonQueries}
    }
  }
`;

export const findConferenceByCountryQuery = (countryName) => gql`
  query allConference {
    allConference(
      where: {
        country: {findOne: {Country: {name: { contains: ${countryName} } } } }
      }
    ) {
        ${commonQueries}
    }
  }
`;

export const findConferenceByContinentQuery = (continentName) => gql`
  query allConference {
    allConference(
      where: {
        continent: {findOne: {Continent: {name: { contains: ${continentName} } } } }
      }
    ) {
        ${commonQueries}
    }
  }
`;