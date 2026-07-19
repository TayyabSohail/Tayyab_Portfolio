import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/case-studies/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // The case study index lives on the homepage, so there is no separate
  // listing URL to submit.
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
