import {
  setBlogAudienceFilter,
  setBlogLangFilter,
  setBlogTagFilter,
} from "@/redux/features/blog/blogSlice";
import {
  setCityFilter,
  setCountryFilter,
  setContinentFilter,
  setTechFilter,
} from "@/redux/features/conference/conferenceSlice";
import { setHackathonCityFilter, setHackathonContinentFilter, setHackathonCountryFilter, setHackathonTechFilter } from "@/redux/features/hackathon/hackathonSlice";
import {
  setNewsletterAudienceFilter,
  setNewsletterLangFilter,
  setNewsletterTagFilter,
} from "@/redux/features/newsletter/newsletterSlice";
import {
  setLangFilter,
  setAudienceFilter,
  setTagFilter,
} from "@/redux/features/podcast/podcastSlice";
import {
  setYoutubeAudienceFilter,
  setYoutubeLangFilter,
  setYoutubeTagFilter,
} from "@/redux/features/youtube/youtubeSlice";

export const findCategoryData = [
  {
    name: "City",
    toChangeAtt: setCityFilter,
    toChangeHackathonAtt: setHackathonCityFilter,
    isActiveValue: "citySelected",
  },
  {
    name: "Country",
    toChangeAtt: setCountryFilter,
    toChangeHackathonAtt: setHackathonCountryFilter,
    isActiveValue: "countrySelected",
  },
  {
    name: "Continent",
    toChangeAtt: setContinentFilter,
    toChangeHackathonAtt: setHackathonContinentFilter,
    isActiveValue: "continentSelected",
  },
  {
    name: "Technology",
    toChangeAtt: setTechFilter,
    toChangeHackathonAtt: setHackathonTechFilter,
    isActiveValue: "techSelected",
  },
  {
    name: "Language",
    toChangeAtt: setLangFilter,
    toChangeBlogAtt: setBlogLangFilter,
    toChangeNewsAtt: setNewsletterLangFilter,
    toChangeYoutubeAtt: setYoutubeLangFilter,
    isActiveValue: "langSelected",
  },
  {
    name: "Audience",
    toChangeAtt: setAudienceFilter,
    toChangeBlogAtt: setBlogAudienceFilter,
    toChangeNewsAtt: setNewsletterAudienceFilter,
    toChangeYoutubeAtt: setYoutubeAudienceFilter,
    isActiveValue: "audienceSelected",
  },
  {
    name: "Tags",
    toChangeAtt: setTagFilter,
    toChangeBlogAtt: setBlogTagFilter,
    toChangeNewsAtt: setNewsletterTagFilter,
    toChangeYoutubeAtt: setYoutubeTagFilter,
    isActiveValue: "tagSelected",
  },
];
