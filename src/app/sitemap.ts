import { getBaseURL } from "@/lib/axios";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =getBaseURL();

  const routes = ["", "/projects", "/skills", "/formation", "/services"];

  const languages = ["pt", "en"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/watch/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            "pt-BR": `${baseUrl}/watch/pt${route}`,
            "en-US": `${baseUrl}/watch/en${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
