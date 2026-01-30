import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
  experimental: {
    cssChunking: true,
    optimizeCss: true,
  },
};

export default nextConfig;
