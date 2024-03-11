import { getBlogByAllFilter } from "@/services/api/blogAPI";
import { getConferenceByAllFilters } from "@/services/api/conferenceAPI";
import { getHackathonByAllFilters } from "@/services/api/hackathonAPI";
import { getNewsletterByAllFilter } from "@/services/api/newsletterAPI";
import { getPodcastByAllFilter } from "@/services/api/podcastAPI";
import { getYoutubeByAllFilter } from "@/services/api/youtubeAPI";

const sitemap = async () => {
  const BASE_URL = "https://devresources.info";

  const conferences = await getConferenceByAllFilters();
  const podcasts = await getPodcastByAllFilter();
  const newsletters = await getNewsletterByAllFilter();
  const blogs = await getBlogByAllFilter();
  const youTube = await getYoutubeByAllFilter();
  const hackathons = await getHackathonByAllFilters();

  const conferenceURLs = conferences?.data.map(({ node }) => ({
    url: `${BASE_URL}/conferences/${encodeURIComponent(node?.name)}`,
    lastModified: new Date(node?._meta?.publishedAt),
  }));

  const podcastURLs = podcasts?.data.map(({ node }) => ({
    url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
    lastModified: new Date(node?._meta?.publishedAt),
  }));

  const newsletterURLs = newsletters?.data.map(({ node }) => ({
    url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
    lastModified: new Date(node?._meta?.publishedAt),
  }));

  const blogURLs = blogs?.data.map(({ node }) => ({
    url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
    lastModified: new Date(node?._meta?.publishedAt),
  }));

  const youTubeURLs = youTube?.data.map(({ node }) => ({
    url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
    lastModified: new Date(node?._meta?.publishedAt),
  }));

  const hackathonURLs = hackathons?.data.map(({ node }) => ({
    url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.name)}`,
    lastModified: new Date(node?._meta?.publishedAt),
  }));

  const sitemapUrls = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/conferences`, lastModified: new Date() },
    ...conferenceURLs,
    { url: `${BASE_URL}/podcasts`, lastModified: new Date() },
    ...podcastURLs,
    { url: `${BASE_URL}/newsletters`, lastModified: new Date() },
    ...newsletterURLs,
    { url: `${BASE_URL}/blogs`, lastModified: new Date() },
    ...blogURLs,
    { url: `${BASE_URL}/youtube`, lastModified: new Date() },
    ...youTubeURLs,
    { url: `${BASE_URL}/hackathons`, lastModified: new Date() },
    ...hackathonURLs,
  ];

  return sitemapUrls;
};

export default sitemap;
