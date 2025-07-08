import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.248.203"],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
