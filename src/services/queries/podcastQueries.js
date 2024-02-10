import { gql } from "graphql-request";

export const allPodcastQuery = gql`
  query allPodcast {
    allPodcast {
      edges {
        node {
          id
          name
          url
        }
      }
    }
  }
`;
