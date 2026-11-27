import { readFileSync } from 'node:fs';

import type { NextConfig } from 'next';

const { version } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
) as {
  version: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  env: {
    // Release builds override this through .env.production (written by the release job).
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? version,
  },
  // Static export: the site is served by GitHub Pages, there is no Node.js server at runtime.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // `next dev` would otherwise generate extra files in the repository root.
  agentRules: false,
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    // The Next.js image optimizer needs a server.
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

export default nextConfig;
