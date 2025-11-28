import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'strapi-app',
        port: '1337',
        pathname: '/uploads/**/*',
      },
    ],
  },
};

export default nextConfig;
