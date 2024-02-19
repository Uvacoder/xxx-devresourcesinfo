import { configureStore } from "@reduxjs/toolkit";
import conferenceSlice from "./features/conference/conferenceSlice";
import podcastSlice from "./features/podcast/podcastSlice";
import newsletterSlice from "./features/newsletter/newsletterSlice";
import blogSlice from "./features/blog/blogSlice";
import youtubeSlice from "./features/youtube/youtubeSlice";
import hackathonSlice from "./features/hackathon/hackathonSlice";

export const store = configureStore({
  reducer: {
    conferences: conferenceSlice,
    podcasts: podcastSlice,
    newsletters: newsletterSlice,
    blogs: blogSlice,
    youtube: youtubeSlice,
    hackathons: hackathonSlice,
  },
});
