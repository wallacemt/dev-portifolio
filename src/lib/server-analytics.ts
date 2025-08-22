import { VisitorData, PageViewData } from "@/lib/analytics-utils";

const ANALYTICS_API_URL = process.env.API_URL || "";
const OWNER_ID = process.env.OWNER_ID || "";

export class ServerAnalytics {
  private static async makeRequest(endpoint: string, data: unknown): Promise<void> {
    try {
      const response = await fetch(`${ANALYTICS_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        console.error(`Analytics API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }

  static async trackVisitor(visitorData: VisitorData): Promise<void> {
    await this.makeRequest(`/analytics/${OWNER_ID}/track-visitor`, visitorData);
  }

  static async trackPageView(pageViewData: PageViewData, visitorData?: Partial<VisitorData>): Promise<void> {
    const payload = visitorData ? { pageView: pageViewData, visitor: visitorData } : pageViewData;

    await this.makeRequest(`/analytics/${OWNER_ID}/track-pageview`, payload);
  }

  static trackVisitorAsync(visitorData: VisitorData): void {
    this.trackVisitor(visitorData).catch(() => {});
  }

  static trackPageViewAsync(pageViewData: PageViewData, visitorData?: Partial<VisitorData>): void {
    this.trackPageView(pageViewData, visitorData).catch(() => {});
  }
}
