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
    isActiveValue: "citySelected",
  },
  {
    name: "Country",
    toChangeAtt: setCountryFilter,
    isActiveValue: "countrySelected",
  },
  {
    name: "Continent",
    toChangeAtt: setContinentFilter,
    isActiveValue: "continentSelected",
  },
  {
    name: "Technology",
    toChangeAtt: setTechFilter,
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
