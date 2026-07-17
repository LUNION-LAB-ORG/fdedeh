import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.fdedeh.info",
      },
      {
        // Miniatures des podcasts (liens YouTube)
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
