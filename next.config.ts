import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Enables standalone output for production Docker/Railway deployment
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
