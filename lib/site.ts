/**
 * Canonical origin for the deployed site. Used by the sitemap and to resolve
 * relative OpenGraph image paths into absolute URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment to override per deployment.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tayyabsohail.com";
