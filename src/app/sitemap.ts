import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/links";

const routes = ["/", "/ventures", "/speaking", "/book-a-call"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
