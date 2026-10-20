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
}
export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  deviceBreakdown: AnalyticsBreakDown;
  dailyStats: DailyStats[];
  topPages: { page: string; views: number }[];
  topCountries: { country: string; visitors: number }[];
  topBrowsers: { browser: string; visitors: number }[];
}

export interface AnalyticsSummaryResponse {
  today: {
    visitors: number;
    change: number;
  };
  week: {
    visitors: number;
  };
  month: {
    visitors: number;
  };
  realTime: AnalyticsRealTimeResponse;
}


export interface AnalyticsRealTimeResponse {
  online: number;
  activeVisitors: number;
  topActivePages: { page: string; activeUsers: number }[];
  recentVisitors: { country: string; device: string; page: string; timestamp: string }[];
}

export type AnalyticsStreamEvent = AnalyticsRealTimeResponse;
