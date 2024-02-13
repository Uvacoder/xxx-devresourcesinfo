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

export const findAllLangQuery = () => gql`
  query allLanguage {
    allLanguage {
      edges {
        node {
          id
          name
          slug
        }
      }
      totalCount
    }
  }
`;

export const findAllAudienceQuery = () => gql`
  query allTarget {
    allTarget {
      edges {
        node {
          id
          name
          slug
        }
      }
      totalCount
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
      totalCount
    }
  }
`;

export const allPodcastFilterQuery = (
  langSelected,
  audienceSelected,
  tagSelected
) => {
  let filtersSelected = `${
    langSelected
      ? `language: { findOne: { Language: { name: { contains: ${langSelected} } } } }`
      : ""
  },
  ${
    audienceSelected
      ? `target: { findOne: { Target: { name: { contains: ${audienceSelected} } } } }`
      : ""
  }, 
  ${
    tagSelected
      ? `technology: { findOne: { Technology: { name: { contains: ${tagSelected} } } } }`
      : ""
  }`;

  return gql`
  query allPodcast {
    allPodcast(
      where: {
          ${filtersSelected}
      }
    ) {
        ${commonQueries}
    }
  }
`;
};
