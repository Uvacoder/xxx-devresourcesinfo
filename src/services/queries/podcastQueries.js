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
            lightColor
            darkColor
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
