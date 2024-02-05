import { gql } from "graphql-request";

export const allConferenceQuery = () => gql`
  query allConference {
    allConference {
      edges {
        node {
          id
          name
          startDate
          endDate
          technologies {
            ... on Technology {
              id
              name
              slug
            }
          }
          url
          tags
          language {
            ... on Language {
              id
              name
              slug
            }
          }
          city {
            id
            name
            slug
            country {
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
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

const sortedConferenceQuery = (sortBy) => gql`
  query allConference {
    allConference(sort: { startDate: ${sortBy} }) {
      edges {
        node {
          id
          name
          startDate
          endDate
          technologies {
            ... on Technology {
              id
              name
              slug
            }
          }
          url
          tags
          language {
            ... on Language {
              id
              name
              slug
            }
          }
          city {
            id
            name
            slug
            country {
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
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

const sortedConferenceDESC = () => gql`
  query allConference {
    allConference(sort: { startDate: DESC }) {
      edges {
        node {
          id
          name
          startDate
          endDate
          technologies {
            ... on Technology {
              id
              name
              slug
            }
          }
          url
          tags
          language {
            ... on Language {
              id
              name
              slug
            }
          }
          city {
            id
            name
            slug
            country {
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
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
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
      edges {
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
            name
            id
            slug
            country {
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
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
