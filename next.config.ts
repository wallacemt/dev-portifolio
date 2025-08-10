import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    OWNER_ID: process.env.OWNER_ID,
    ANALYTICS_ENABLED: process.env.ANALYTICS_ENABLED,
  },
  allowedDevOrigins: ["192.168.248.200"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
