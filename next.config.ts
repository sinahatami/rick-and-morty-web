import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  output: 'export', // Static export for GitHub Pages
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export (no Next.js server)
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
