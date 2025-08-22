import { NextResponse } from "next/server";
import { generateSessionId } from "@/lib/analytics-utils";

export function setSessionIdCookie(response: NextResponse, sessionId?: string): NextResponse {
  if (!sessionId) {
    sessionId = generateSessionId();
  }

  response.cookies.set("sessionId", sessionId, {
    maxAge: 24 * 60 * 60, 
    httpOnly: false, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export function getOrCreateSessionId(request: Request): string {
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader
    ? Object.fromEntries(
        cookieHeader.split("; ").map((c) => {
          const [key, value] = c.split("=");
          return [key, decodeURIComponent(value)];
        })
      )
    : {};

  return cookies.sessionId || generateSessionId();
}
