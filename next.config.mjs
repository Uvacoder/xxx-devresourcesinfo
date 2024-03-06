/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/conferences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
