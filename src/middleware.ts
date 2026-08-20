import { NextRequest, NextResponse } from "next/server";
import {
  extractVisitorDataFromRequest,
  getGeoLocation,
  isAnalyticsEnabled,
  shouldTrackPage,
  VisitorData,
} from "@/lib/analytics-utils";
import { isSupportedLanguage, resolveLanguageFromCountryCode } from "@/lib/geo-language";
import { ServerAnalytics } from "@/lib/server-analytics";
import { setSessionIdCookie, getOrCreateSessionId } from "@/lib/session-utils";

const LANGUAGE_COOKIE = "preferredLanguage";
const LANGUAGE_COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

type GeoData = { country: string; city: string; countryCode: string };

export async function middleware(request: NextRequest) {
  const cookieLang = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const token = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  request.headers.append("X-Frame-Options", "DENY");
  let response: NextResponse;
  // Reused for analytics below when the "/" branch already had to fetch it,
  // so a first-time visitor only triggers one ipapi.co call, not two.
  let prefetchedGeo: GeoData | null = null;

  if (pathname === "/") {
    let lang: string;
    if (isSupportedLanguage(cookieLang)) {
      lang = cookieLang;
    } else {
      // No stored preference yet: infer language from the visitor's IP
      // instead of the browser geolocation API (which requires a user
      // prompt). Countries with no mapping fall back to DEFAULT_LANGUAGE.
      const ip = extractVisitorDataFromRequest(request).ip || "127.0.0.1";
      prefetchedGeo = await getGeoLocation(ip);
      lang = resolveLanguageFromCountryCode(prefetchedGeo.countryCode);
    }

    const url = request.nextUrl.clone();
    url.pathname = `/watch/${lang}`;
    response = NextResponse.redirect(url);

    if (!isSupportedLanguage(cookieLang)) {
      response.cookies.set(LANGUAGE_COOKIE, lang, {
        maxAge: LANGUAGE_COOKIE_MAX_AGE_SECONDS,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
  } else if (pathname.startsWith("/owner")) {
    if (pathname === "/owner/auth" && token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/dashboard";
      url.search = "";
      response = NextResponse.redirect(url);
    } else if (!pathname.startsWith("/owner/auth") && !token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/auth";
      url.search = "";
      response = NextResponse.redirect(url);
    } else if (pathname === "/owner" && token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/dashboard";
      url.search = "";
      response = NextResponse.redirect(url);
    } else if (pathname === "/owner" && !token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/auth";
      url.search = "";
      response = NextResponse.redirect(url);
    } else {
      response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  const isPrefetch =
    request.headers.get("Next-Router-Prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("RSC") === "1";

  if (isAnalyticsEnabled() && shouldTrackPage(pathname) && !isPrefetch) {
    const existingSessionId = request.cookies.get("sessionId")?.value;
    const sessionId = existingSessionId || getOrCreateSessionId(request);
    if (!existingSessionId) {
      response = setSessionIdCookie(response, sessionId);
      handleAnalytics(request, sessionId, prefetchedGeo).catch(() => {});
    }
  }

  return response;
}

async function handleAnalytics(request: NextRequest, sessionId: string, prefetchedGeo: GeoData | null) {
  try {
    const visitorData = extractVisitorDataFromRequest(request);
    const geoData = prefetchedGeo ?? (await getGeoLocation(visitorData.ip || "127.0.0.1"));

    const fullVisitorData = {
      ...visitorData,
      sessionId,
      country: geoData.country,
      city: geoData.city,
    };

    ServerAnalytics.trackVisitorAsync(fullVisitorData as VisitorData);
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.debug("Middleware analytics error:", error);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
