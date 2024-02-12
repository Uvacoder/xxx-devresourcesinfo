import { configureStore } from "@reduxjs/toolkit";
import conferenceSlice from "./features/conference/conferenceSlice";
import podcastSlice from "./features/podcast/podcastSlice";

export const store = configureStore({
  reducer: {
    conferences: conferenceSlice,
    podcasts: podcastSlice,
  },
});
