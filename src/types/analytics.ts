export interface TrackVisitorRequest {
  sessionId: string;
  userAgent: string;
  country: string;
  city: string;
  device: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
  referrer: string;
  landingPage: string;
}

export interface TrackVisitorPage {
  sessionId: string;
  page: string;
  timeSpent?: number;
}

export interface AnalyticsConfig {
  enabled?: boolean;
}
