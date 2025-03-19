import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.giphy.com",
        port: "", // Leave empty if no specific port
        pathname: "/v1/gifs/**", // Pattern for the path, ** allows any subpath
      },
    ],
  },
};

export default nextConfig;
