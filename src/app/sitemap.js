import { getBlogByAllFilter } from "@/services/api/blogAPI";
import {
  getAllContinents,
  getAllTechnologies,
  getConferenceByAllFilters,
} from "@/services/api/conferenceAPI";
import {
  getAllAudience,
  getAllLang,
  getPodcastByAllFilter,
} from "@/services/api/podcastAPI";
import { getHackathonByAllFilters } from "@/services/api/hackathonAPI";
import { getNewsletterByAllFilter } from "@/services/api/newsletterAPI";
import { getYoutubeByAllFilter } from "@/services/api/youtubeAPI";
import { queryString } from "@/utils/utils";

const sitemap = async () => {
  const BASE_URL = "https://devresources.info";

  const conferences = await getConferenceByAllFilters();
  const technologies = await getAllTechnologies();
  const continents = await getAllContinents();
  const podcasts = await getPodcastByAllFilter();
  const languages = await getAllLang();
  const audiences = await getAllAudience();
  const newsletters = await getNewsletterByAllFilter();
  const blogs = await getBlogByAllFilter();
  const youtube = await getYoutubeByAllFilter();
  const hackathons = await getHackathonByAllFilters();

  const conferenceURLs = [
    ...continents?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.name
      )}?continent=${queryString(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...conferences?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}?continent=${queryString(
        node?.continent[0]?.name
      )}&amp;country=${queryString(node?.country[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...conferences?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(
        node?.city?.name
      )}?continent=${queryString(
        node?.continent[0]?.name
      )}&amp;country=${queryString(
        node?.country[0]?.name
      )}&amp;city=${queryString(node?.city?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.name
      )}?tech=${queryString(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...conferences?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(
        node?.city?.name
      )}/${encodeURIComponent(node?.technologies[0]?.name)}?tech=${queryString(
        node?.technologies[0]?.name
      )}&amp;continent=${queryString(
        node?.continent[0]?.name
      )}&amp;country=${queryString(
        node?.country[0]?.name
      )}&amp;city=${queryString(node?.city?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...conferences?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(
        node?.technologies[0]?.name
      )}?tech=${queryString(
        node?.technologies[0]?.name
      )}&amp;continent=${queryString(
        node?.continent[0]?.name
      )}&amp;country=${queryString(node?.country[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...conferences?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.technologies[0]?.name)}?tech=${queryString(
        node?.technologies[0]?.name
      )}&amp;continent=${queryString(node?.continent[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
  ];

  const podcastURLs = [
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(
        node?.language[0]?.name
      )}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(
        node?.target[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
  ];

  const newsletterURLs = [
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(
        node?.language[0]?.name
      )}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(
        node?.target[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
  ];

  const blogURLs = [
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(
        node?.language[0]?.name
      )}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(
        node?.target[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
  ];

  const youTubeURLs = [
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(
        node?.language[0]?.name
      )}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(
        node?.technology[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(
        node?.target[0]?.name
      )}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
  ];

  const hackathonURLs = [
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...continents?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(
        node?.city?.name
      )}/${encodeURIComponent(node?.technology[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(
        node?.technology[0]?.name
      )}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.technology[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(
        node?.city?.name
      )}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(
        node?.continent[0]?.name
      )}/${encodeURIComponent(node?.country[0]?.name)}`,
      lastModified: new Date(node?._meta?.publishedAt),
    })),
  ];

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
