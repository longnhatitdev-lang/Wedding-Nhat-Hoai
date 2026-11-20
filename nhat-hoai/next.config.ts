import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["test.aiempie.cloud"],
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: { allowedOrigins: ["test.aiempie.cloud"], bodySizeLimit: "6mb" },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
