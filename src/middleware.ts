import { NextRequest, NextResponse } from "next/server";
import {
  extractVisitorDataFromRequest,
  getGeoLocation,
  isAnalyticsEnabled,
  shouldTrackPage,
  VisitorData,
} from "@/lib/analytics-utils";
import { ServerAnalytics } from "@/lib/server-analytics";
import { setSessionIdCookie, getOrCreateSessionId } from "@/lib/session-utils";

export async function middleware(request: NextRequest) {
  const lang = request.cookies.get("preferredLanguage")?.value || "pt";
  const token = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  request.headers.append("X-Frame-Options", "DENY");
  let response: NextResponse;
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/watch/${lang}`;
    response = NextResponse.redirect(url);
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
      handleAnalytics(request, sessionId).catch(() => {});
    }
  }

  return response;
}

async function handleAnalytics(request: NextRequest, sessionId: string) {
  try {
    const visitorData = extractVisitorDataFromRequest(request);
    const geoData = await getGeoLocation(visitorData.ip || "127.0.0.1");

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
