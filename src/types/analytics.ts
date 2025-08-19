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

interface AnalyticsOverview {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgTimeSpent: number;
}
interface AnalyticsBreakDown {
  desktop: number;
  mobile: number;
  tablet: number;
}
interface DailyStats {
  date: string;
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  dasktop: number;
  tablet: number;
  topPages: { page: string; views: string }[];
  topCountries: { country: string; visitors: number }[];
  topBrowsers: { browser: string; visitors: number };
  bounceRate: number;
  avgTimeSpent: number;
}
export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  deviceBreakdown: AnalyticsBreakDown;
  dayliStats: DailyStats[];
  topPages: { page: string; views: number }[];
  topCountries: { country: string; visitors: number }[];
  topBrowsers: { browser: string; visitors: number }[];
}

export interface AnalyticsSummaryResponse {
  today: {
    visitors: number;
    change: 0;
  };
  week: {
    visitors: number;
  };
  month: {
    visitors: number;
  };
  realTime: {
    activeVisitors: number;
    topActivatePage: { page: string; activeUsers: number }[];
    recentVisitors: { country: string; device: string; page: string; timestamp: Date }[];
  };
}


export interface AnalyticsRealTimeResponse {
  activeVisitors: number;
}