import { getBlogByAllFilter } from "@/services/api/blogAPI";
import {
  getAllCities,
  getAllCitiesExpanded,
  getAllContinents,
  getAllCountries,
  getAllCountriesWithContinent,
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

  const cities = await getAllCitiesExpanded();
  const technologies = await getAllTechnologies();
  const continents = await getAllContinents();
  const countries = await getAllCountriesWithContinent();
  const podcasts = await getPodcastByAllFilter();
  const languages = await getAllLang();
  const audiences = await getAllAudience();
  const newsletters = await getNewsletterByAllFilter();
  const blogs = await getBlogByAllFilter();
  const youtube = await getYoutubeByAllFilter();
  const hackathons = await getHackathonByAllFilters();
  const today = new Date();

  const conferenceURLs = [
    ...continents?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/all/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...countries?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/all/${encodeURIComponent(node?.continent.name)}/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...cities?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/all/${encodeURIComponent(node?.country.continent.name)}/${encodeURIComponent(node?.country.name)}/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/conferences/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...technologies?.data.map(({ node: techNode }) => {
      return continents?.data.map(({ node: continentNode }) => ({
        url: `${BASE_URL}/conferences/${encodeURIComponent(techNode?.name)}/${encodeURIComponent(continentNode?.name)}`,
        lastModified: today,
      }))
    }).flat(1),
    ...technologies?.data.map(({ node: techNode }) => {
      return countries?.data.map(({ node: countryNode }) => ({
        url: `${BASE_URL}/conferences/${encodeURIComponent(techNode?.name)}/${encodeURIComponent(countryNode?.continent.name)}/${encodeURIComponent(countryNode?.name)}`,
        lastModified: today,
      }))
    }).flat(1),
    ...technologies?.data.map(({ node: techNode }) => {
      return cities?.data.map(({ node: cityNode }) => ({
        url: `${BASE_URL}/conferences/${encodeURIComponent(techNode?.name)}/${encodeURIComponent(cityNode?.country.continent.name)}/${encodeURIComponent(cityNode?.country.name)}/${encodeURIComponent(cityNode?.name)}`,
        lastModified: today,
      }))
    }).flat(1),
  ];

  const podcastURLs = [
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: today,
    })),
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...podcasts?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/podcasts/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
  ];

  const newsletterURLs = [
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: today,
    })),
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...newsletters?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/newsletters/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
  ];

  const blogURLs = [
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: today,
    })),
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...blogs?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/blogs/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
  ];

  const youTubeURLs = [
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.target[0]?.name)}`,
      lastModified: today,
    })),
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.technology[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...youtube?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.target[0]?.name)}/${encodeURIComponent(node?.language[0]?.name)}`,
      lastModified: today,
    })),
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...languages?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...audiences?.data.map(({ node }) => ({
      url: `${BASE_URL}/youtube/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
  ];

  const hackathonURLs = [
    ...technologies?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...continents?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.name)}`,
      lastModified: today,
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.continent[0]?.name)}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(node?.city?.name)}/${encodeURIComponent(node?.technology[0]?.name)}`,
      lastModified: today,
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.continent[0]?.name)}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(node?.technology[0]?.name)}`,
      lastModified: today,
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.continent[0]?.name)}/${encodeURIComponent(node?.technology[0]?.name)}`,
      lastModified: today,
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.continent[0]?.name)}/${encodeURIComponent(node?.country[0]?.name)}`,
      lastModified: today,
    })),
    ...hackathons?.data.map(({ node }) => ({
      url: `${BASE_URL}/hackathons/${encodeURIComponent(node?.continent[0]?.name)}/${encodeURIComponent(node?.country[0]?.name)}/${encodeURIComponent(node?.city?.name)}`,
      lastModified: today,
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
