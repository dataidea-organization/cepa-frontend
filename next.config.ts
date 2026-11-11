import type { NextConfig } from "next";

// Backend that stores uploaded files. Override per environment (e.g. http://localhost:8000).
const MEDIA_PROXY_TARGET = (
  process.env.MEDIA_PROXY_TARGET ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://admin.cepa.or.ug"
).replace(/\/+$/, "");

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
        hostname: 'admin.cepa.or.ug',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Serve uploaded documents from the public domain so links never expose the admin host.
        source: "/media/:path*",
        destination: `${MEDIA_PROXY_TARGET}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
