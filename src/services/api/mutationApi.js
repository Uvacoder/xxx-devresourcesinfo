import { getClient } from "../graphQLClient";
import { mutationQuery } from "../queries/mutationQueries";

export const addNewEvent = async (eventObj) => {
  try {
    const client = getClient(true);

    const mutation = mutationQuery(eventObj);

    const { eventType, name, url, startDate, messageToModerator } = eventObj;
    const obj = { name, url, messageToModerator };
    const objWithDate = { name, url, startDate, messageToModerator };

    if (eventType === "Conference" || eventType === "Hackathon") {
      const response = await client.request(mutation, { input: objWithDate });
      return response;
    } else {
      const response = await client.request(mutation, { input: obj });
      return response;
    }
  } catch (error) {
    console.error(`Error adding event: ${error}`);
    throw error;
  }
};
