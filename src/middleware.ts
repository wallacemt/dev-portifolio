import { NextRequest, NextResponse } from "next/server";
import { getClientIP, getGeoLocation } from "@/lib/analytics-utils";
import { isSupportedLanguage, resolveLanguageFromCountryCode } from "@/lib/geo-language";

const LANGUAGE_COOKIE = "preferredLanguage";
const LANGUAGE_MANUAL_COOKIE = "languageManuallySet";
const LANGUAGE_COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

export async function middleware(request: NextRequest) {
  const cookieLang = request.cookies.get(LANGUAGE_COOKIE)?.value;
  const isManualLang = request.cookies.get(LANGUAGE_MANUAL_COOKIE)?.value === "1";
  const token = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  request.headers.append("X-Frame-Options", "DENY");
  let response: NextResponse;
  if (pathname === "/") {
    let lang: string;
    if (isManualLang && isSupportedLanguage(cookieLang)) {
      lang = cookieLang;
    } else {
      // No explicit user choice on record: infer language from the visitor's
      // IP instead of the browser geolocation API (which requires a user
      // prompt). Re-checked on every visit — a leftover auto-detected cookie
      // must never shadow this, or travel/VPN never re-redirects — only an
      // explicit pick via the language selector sticks across visits.
      // Countries with no mapping fall back to DEFAULT_LANGUAGE.
      const geo = await getGeoLocation(getClientIP(request));
      lang = resolveLanguageFromCountryCode(geo.countryCode);
    }

    const url = request.nextUrl.clone();
    url.pathname = `/watch/${lang}`;
    response = NextResponse.redirect(url);

    response.cookies.set(LANGUAGE_COOKIE, lang, {
      maxAge: LANGUAGE_COOKIE_MAX_AGE_SECONDS,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
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

  return response;
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
