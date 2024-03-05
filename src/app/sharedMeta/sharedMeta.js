export const generateSharedMetaData = (meta) => {
  return {
    metadataBase: new URL(meta.link),
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
      url: meta.link,
      siteName: meta.title,
      images: [
        {
          url: meta.image ?? "/images/og-image.png",
          width: 1200,
          height: 630,
          secure: meta.image ?? "/images/og-image.png",
          secure_url: meta.image ?? "/images/og-image.png",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@bugfenderapp",
      images: [
        {
          url: meta.image ?? "/images/og-image.png",
          width: 1200,
          height: 630,
          secure: meta.image ?? "/images/og-image.png",
          secure_url: meta.image ?? "/images/og-image.png",
        },
      ],
    },

    alternates: {
      canonical: "https://www.devresources.info/",
    },

    icons: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/images/favicon-devresources-32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/images/favicon-devresources-16.png",
      },
    ],
  };
};
