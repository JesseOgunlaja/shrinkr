import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      {
        source: "/terms-of-service",
        destination: "/terms-of-service.html",
      },
      {
        source: "/privacy-policy",
        destination: "/privacy-policy.html",
      },
    ];
  },
};

export default nextConfig;
