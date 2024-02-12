import { gql } from "graphql-request";

const commonQueries = `edges {
      node {
        id
        language {
          ... on Language {
            id
            name
            slug
          }
        }
        name
        tags
        target {
          ... on Target {
            id
            name
            slug
          }
        }
        url
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }`;

export const allPodcastQuery = () => gql`
  query allPodcast {
    allPodcast {
      ${commonQueries}
    }
  }
`;

export const findPodcastByLangQuery = (langSelected) => gql`
  query allPodcast {
    allPodcast(
       where: {language: {findOne: {Language: {name: {contains: ${langSelected}}}}}}
    ) {
        ${commonQueries}
    }
  }
`;

export const findPodcastByAudienceQuery = (audienceType) => gql`
  query allPodcast {
    allPodcast(
      where: {target: {findOne: {Target: {name: {contains: ${audienceType}}}}}}
    ) {
        ${commonQueries}
    }
  }
`;
