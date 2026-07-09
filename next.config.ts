import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production' && process.env.BUILD_FOR_E2E !== 'true';
const repoName = '/rick-and-morty-web';
const basePath = isProd ? repoName : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath, // Used by Next.js internals

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
