import { NextRequest } from "next/server";

export async function getGeoLocation(
  ip: string
): Promise<{ country: string; city: string; countryCode: string }> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        "User-Agent": "portfolio-analytics/1.0",
      },
      // Kept short since the "/" redirect path awaits this result before
      // responding to first-time visitors — falls back to DEFAULT_LANGUAGE
      // (see geo-language.ts) rather than making them wait longer.
      signal: AbortSignal.timeout(1500),
    });

    if (!response.ok) {
      return {
        country: "unknown",
        city: "unknown",
        countryCode: "unknown",
      };
    }

    const data = await response.json();
    return {
      country: data.country_name || "unknown",
      city: data.city || "unknown",
      countryCode: data.country_code || "unknown",
    };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return { country: "unknown", city: "unknown", countryCode: "unknown" };
  }
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return "127.0.0.1";
}
