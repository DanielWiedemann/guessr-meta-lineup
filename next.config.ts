import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.plonkit.net",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
