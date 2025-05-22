import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['encrypted-tbn0.gstatic.com','example.com','via.placeholder.com','img.freepik.com','res.cloudinary.com'],
  },

  
  
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
