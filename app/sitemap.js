import { galleries } from "@/lib/galleries";

const SITE_URL = "https://mumudancecamp.com";

export default function sitemap() {
  const now = new Date();
  const routes = ["", "/gallery", "/instructor", "/venue", "/contact"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  const collections = galleries.map((g) => ({
    url: `${SITE_URL}/gallery/${g.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...routes, ...collections];
}
