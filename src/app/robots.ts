import { getBaseURL } from "@/lib/axios";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseURL();
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/watch/", "/"],
        disallow: ["/owner/", "/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/watch/", "/"],
        disallow: ["/owner/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
