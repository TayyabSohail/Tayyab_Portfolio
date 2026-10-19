import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Case studies moved to /case-studies/:slug, and the listing page was
      // folded into the homepage section. Keep old links working.
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/case-studies", destination: "/#projects", permanent: true },
      {
        source: "/projects/:slug",
        destination: "/case-studies/:slug",
        permanent: true,
      },
      // Four case studies were replaced by their anonymised versions, so
      // links shared under the old names still land on the right product.
      {
        source: "/case-studies/seomaven",
        destination: "/case-studies/rankloom",
        permanent: true,
      },
      {
        source: "/case-studies/unibid",
        destination: "/case-studies/bidnest",
        permanent: true,
      },
      {
        source: "/case-studies/vestafi",
        destination: "/case-studies/brickfold",
        permanent: true,
      },
      {
        source: "/case-studies/anina",
        destination: "/case-studies/curio-market",
        permanent: true,
      },
      // Feinwerks Software was renamed Bullah Labs.
      {
        source: "/case-studies/feinwerks",
        destination: "/case-studies/bullah-labs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
