import { gql } from "graphql-request";
const dataLimit = process.env.NEXT_PUBLIC_CAISY_DATA_LIMIT || 10;

const commonQueries = `edges {
      node {
         _meta {
          publishedAt
        }
        id
        language {
          ... on Language {
            id
            name
          }
        }
        name
        target {
          ... on Target {
            id
            name
          }
        }
        technology {
          ... on Technology {
            id
            name
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
          _meta {
            publishedAt
          }
          id
          name
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
          _meta {
            publishedAt
          }
          id
          name
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
          _meta {
            publishedAt
          }
          id
          name
        }
      }
      totalCount
    }
  }
`;

export const allPodcastFilterQuery = ({
  langSelected,
  audienceSelected,
  tagSelected,
  endCursor,
  startCursor,
}) => {
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
       ${startCursor ? `last:  ${dataLimit}` : `first:  ${dataLimit}`}
       ${endCursor ? `after:  ${endCursor}` : ""},
       ${startCursor ? `before:  ${startCursor}` : ""},
      where: {
          ${filtersSelected}
      }
    ) {
        ${commonQueries}
    }
  }
`;
};
