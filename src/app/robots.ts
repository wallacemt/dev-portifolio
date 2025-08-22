import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
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
