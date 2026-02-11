import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "/react-home-v1";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? repoName : "",
  assetPrefix: isGitHubPages ? repoName : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
