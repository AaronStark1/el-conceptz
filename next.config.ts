import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is served at these qualities only (Next 16 requires an allowlist).
    qualities: [60, 75, 80, 90],
    deviceSizes: [400, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
  },
};

export default nextConfig;
