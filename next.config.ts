import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid blocking on style issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cepa-backend-production.up.railway.app',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'cepa-backend-production.up.railway.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
