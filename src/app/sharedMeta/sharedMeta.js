export const generateSharedMetaData = (meta) => {
  return {
    metadataBase: new URL(meta.link),
    title: meta.title,
    description: meta.description,

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.link,
      siteName: meta.title,
      images: [
        {
          url: meta.image ?? "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    icons: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-devresources-32x3216x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-devresources-16x1616x16.png",
      },
    ],
  };
};
