import { addQuotesToString } from "@/utils/utils";
import { gql } from "graphql-request";

export const mutationQuery = (obj) => {
  const convertName = addQuotesToString(obj?.name);
  const convertDate = addQuotesToString(obj?.startDate);
  const convertUrl = addQuotesToString(obj?.url);
  const convertMsg = addQuotesToString(obj?.messageToModerator);
  if (obj?.eventType === "Conference") {
    return gql`
      mutation createConference {
        createConference(
          input: {
            name: ${convertName}
            startDate: ${convertDate}
            url: ${convertUrl}
            messageToModerator: ${convertMsg}
          }
        ) {
          id
          name
          url
          messageToModerator
        }
      }
    `;
  } else if (obj?.eventType === "Hackathon") {
    return gql`
      mutation createHackathon {
        createHackathon(
          input: {
            name: ${convertName}
            startDate: ${convertDate}
            url: ${convertUrl}
            messageToModerator: ${convertMsg}
          }
        ) {
          id
          name
          url
          messageToModerator
        }
      }
    `;
  } else if (obj?.eventType === "Newsletter") {
    return gql`
      mutation createNewsletter {
        createNewsletter(
          input: {
            name: ${convertName}
            url: ${convertUrl}
            messageToModerator: ${convertMsg}
          }
        ) {
          id
          name
          url
          messageToModerator
        }
      }
    `;
  } else if (obj?.eventType === "Podcast") {
    return gql`
      mutation createPodcast {
        createPodcast(
          input: {
            name: ${convertName}
            url: ${convertUrl}
            messageToModerator: ${convertMsg}
          }
        ) {
          id
          name
          url
          messageToModerator
        }
      }
    `;
  } else if (obj?.eventType === "Blog") {
    return gql`
      mutation createBlog {
        createBlog(
          input: {
            name: ${convertName}
            url: ${convertUrl}
            messageToModerator: ${convertMsg}
          }
        ) {
          id
          name
          url
          messageToModerator
        }
      }
    `;
  } else if (obj?.eventType === "Youtube") {
    return gql`
      mutation createYouTube {
        createYouTube(
          input: {
            name: ${convertName}
            url: ${convertUrl}
            messageToModerator: ${convertMsg}
          }
        ) {
          id
          name
          url
          messageToModerator
        }
      }
    `;
  } else {
    return;
  }
};
