import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use standalone output for Docker/Railway, not Vercel.
  // Set NEXT_OUTPUT=standalone in your Dockerfile or Railway config.
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
