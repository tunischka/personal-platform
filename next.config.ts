// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Build sırasında ESLint hatalarını yok say
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build sırasında TS type hatalarını yok say
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
