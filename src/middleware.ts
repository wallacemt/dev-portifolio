import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.cookies.get("preferredLanguage")?.value || "pt";

  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/watch/${lang}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
