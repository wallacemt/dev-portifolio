import { getSiteURL } from "@/lib/axios";
import { MetadataRoute } from "next";
import { LANGUAGE_TAGS } from "@/lib/html-lang";
import { SUPPORTED_LANGUAGES } from "@/lib/geo-language";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteURL();

  const routes = ["", "/projects", "/skills", "/formation", "/services", "/videos"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/watch/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(SUPPORTED_LANGUAGES.map((language) => [LANGUAGE_TAGS[language], `${baseUrl}/watch/${language}${route}`])),
          },
        },
      });
    }
  }

  return sitemapEntries;
}
