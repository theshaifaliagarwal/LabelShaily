import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_STATIC === '1' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
