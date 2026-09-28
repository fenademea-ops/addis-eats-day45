import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "192.168.1.4",
    "192.168.1.12",
  ],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
