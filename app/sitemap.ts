import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/reserve"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/menu" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
