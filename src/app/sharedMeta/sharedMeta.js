export const generateSharedMetaData = (meta) => {
  return {
    title: meta.title,
    description: meta.description,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: meta.title,
      images: [
        {
          url: meta.image ?? "/og-image.png",
          width: 1200,
          height: 627,
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
