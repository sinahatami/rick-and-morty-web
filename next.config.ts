import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
  reactStrictMode: true,
  images: {
    unoptimized: false, // Enabled for Vercel deployment
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
