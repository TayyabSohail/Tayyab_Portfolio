import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Case studies moved to /case-studies/:slug, and the listing page was
    // folded into the homepage section. Keep old links working.
    return [
      { source: "/projects", destination: "/#case-studies", permanent: true },
      { source: "/case-studies", destination: "/#case-studies", permanent: true },
      {
        source: "/projects/:slug",
        destination: "/case-studies/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
