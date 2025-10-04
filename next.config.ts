import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  ignoreDuringBuilds: true,
  images: {
    domains: ["res.cloudinary.com"], // allow Cloudinary
  },
};

export default nextConfig;
