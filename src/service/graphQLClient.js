import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

export const getClient = (preview) => {

  const headers = {
    "x-caisy-apikey": import.meta.env.PUBLIC_CAISY_API_KEY,
  };
  if (preview) {
    headers["x-caisy-preview"] = "true";
  }
  const client = new GraphQLClient(
    `https://cloud.caisy.io/api/v3/e/${
      import.meta.env.PUBLIC_CAISY_PROJECT_ID
    }/graphql`,
    {
      headers: headers,
    }
  );

  return client;
};
