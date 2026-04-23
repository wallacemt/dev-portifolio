import { VisitorData, PageViewData } from "@/lib/analytics-utils";
import { API, ownerId } from "./axios";

export class ServerAnalytics {
  private static async makeRequest(endpoint: string, data: unknown): Promise<void> {
    try {
      const response = await API.post(endpoint, data, {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.data) {
        console.error(`Analytics API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  }

  static async trackVisitor(visitorData: VisitorData): Promise<void> {
    await this.makeRequest(`/analytics/${ownerId}/track-visitor`, visitorData);
  }

  static async trackPageView(pageViewData: PageViewData, visitorData?: Partial<VisitorData>): Promise<void> {
    const payload = visitorData ? { pageView: pageViewData, visitor: visitorData } : pageViewData;

    await this.makeRequest(`/analytics/${ownerId}/track-pageview`, payload);
  }

  static trackVisitorAsync(visitorData: VisitorData): void {
    this.trackVisitor(visitorData).catch(() => {});
  }

  static trackPageViewAsync(pageViewData: PageViewData, visitorData?: Partial<VisitorData>): void {
    this.trackPageView(pageViewData, visitorData).catch(() => {});
  }
}
