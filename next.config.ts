import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // Optionally ignore ESLint during builds
  },
};



export default nextConfig;
