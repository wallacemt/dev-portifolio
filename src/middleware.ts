import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.cookies.get("preferredLanguage")?.value || "pt";
  const token = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Redirect root to watch/[language]
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/watch/${lang}`;
    return NextResponse.redirect(url);
  }

  // Handle owner routes
  if (pathname.startsWith("/owner")) {
    // If accessing /owner/auth with token, redirect to dashboard
    if (pathname === "/owner/auth" && token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/dashboard";
      url.search = ""; // Remove all query parameters
      return NextResponse.redirect(url);
    }

    // If accessing protected owner routes without token, redirect to auth
    if (!pathname.startsWith("/owner/auth") && !token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/auth";
      url.search = ""; // Remove all query parameters
      return NextResponse.redirect(url);
    }

    // If accessing /owner root with token, redirect to dashboard
    if (pathname === "/owner" && token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/dashboard";
      url.search = ""; // Remove all query parameters
      return NextResponse.redirect(url);
    }

    // If accessing /owner root without token, redirect to auth
    if (pathname === "/owner" && !token) {
      const url = request.nextUrl.clone();
      url.pathname = "/owner/auth";
      url.search = ""; // Remove all query parameters
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
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
