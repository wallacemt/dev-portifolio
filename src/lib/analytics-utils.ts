import { NextRequest } from "next/server";

export interface VisitorData {
  sessionId: string;
  userAgent: string;
  device: "desktop" | "mobile" | "tablet";
  referrer: string;
  landingPage: string;
  os: string;
  country: string;
  city: string;
  browser: string;
  ip: string;
}

export interface PageViewData {
  sessionId: string;
  page: string;
  timeSpent?: number;
  isExit?: boolean;
}

export function getDeviceTypeFromUA(userAgent: string): "desktop" | "mobile" | "tablet" {
  if (/iPad/i.test(userAgent)) return "tablet";
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) return "mobile";
  return "desktop";
}

export function getBrowserFromUA(userAgent: string): string {
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "unknown";
}

export function getOSFromUA(userAgent: string): string {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iOS")) return "iOS";
  return "unknown";
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function getGeoLocation(ip: string): Promise<{ country: string; city: string }> {
  try {

    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        "User-Agent": "portfolio-analytics/1.0",
      },
    });

    if (!response.ok) {
      throw new Error("Geolocation API error");
    }

    const data = await response.json();
    return {
      country: data.country_name || "unknown",
      city: data.city || "unknown",
    };
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return { country: "unknown", city: "unknown" };
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

export function extractVisitorDataFromRequest(request: NextRequest): Partial<VisitorData> {
  const userAgent = request.headers.get("user-agent") || "unknown";
  const referrer = request.headers.get("referer") || "direct";
  const ip = getClientIP(request);

  return {
    userAgent,
    device: getDeviceTypeFromUA(userAgent),
    referrer,
    landingPage: request.nextUrl.href,
    os: getOSFromUA(userAgent),
    browser: getBrowserFromUA(userAgent),
    ip,
  };
}

export function validateTimeSpent(timeSpent: number): number {

  const MAX_TIME_SECONDS = 86400;

  const timeInSeconds = Math.floor(timeSpent / 1000);

  return Math.max(0, Math.min(timeInSeconds, MAX_TIME_SECONDS));
}

export function isAnalyticsEnabled(): boolean {
  return process.env.ANALYTICS_ENABLED === "true";
}

export function shouldTrackPage(pathname: string): boolean {

  if (pathname.startsWith("/owner")) return false;

  if (pathname.startsWith("/_next")) return false;
  if (pathname.includes(".")) return false;

  return true;
}
