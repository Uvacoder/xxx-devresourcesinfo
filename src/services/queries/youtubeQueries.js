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
            slug
          }
        }
        name
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
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount`;

export const allYoutubeFilterQuery = ({
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
  query allYouTube {
    allYouTube(
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
