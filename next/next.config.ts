import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'strapi-app',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'j42l.ch',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.j42l.ch',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.j42l.ch',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'staging.j42l.ch',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.staging.j42l.ch',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.staging.j42l.ch',
        pathname: '/uploads/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about/j42l',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
