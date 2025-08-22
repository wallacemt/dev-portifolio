import { API, ownerId, setupAuth, SimpleResponse } from "@/lib/axios";
import {
  AnalyticsRealTimeResponse,
  AnalyticsResponse,
  AnalyticsSummaryResponse,
  TrackVisitorPage,
  TrackVisitorRequest,
} from "@/types/analytics";
import { validateTimeSpent } from "@/lib/analytics-utils";

export const postTrackVisitor = async (trackingData: TrackVisitorRequest) => {
  try {
    const response = await API.post(`/analytics/${ownerId}/track-visitor`, trackingData);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.debug("Error tracking visitor:", error);
    return null;
  }
};

export const postTrackVisitorPageView = async (
  trackingPage: TrackVisitorPage,
  trackingVisitor: TrackVisitorRequest
) => {
  try {
    const sanitizedData = {
      pageView: {
        ...trackingPage,
        timeSpent: trackingPage.timeSpent ? validateTimeSpent(trackingPage.timeSpent) : undefined,
      },
      visitor: {
        ...trackingVisitor,
      },
    };

    const res = await API.post(`/analytics/${ownerId}/track-pageview`, sanitizedData);
    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.debug("Error tracking page view:", error);
    return null;
  }
};

export const analyticsDashboard = async (startDate: Date, endDate: Date): Promise<AnalyticsResponse> => {
  try {
    await setupAuth();

    const params = new URLSearchParams();
    if (startDate && endDate) {
      params.append("startDate", startDate.toISOString());
      params.append("endDate", endDate.toISOString());
    }

    const res = await API.get<AnalyticsResponse>(`/analytics/private/dashboard?${params.toString()}`);
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error loading analytics dashboard"
    );
  }
};

export const analyticsSummary = async (): Promise<AnalyticsSummaryResponse> => {
  try {
    await setupAuth();

    const res = await API.get<AnalyticsSummaryResponse>("/analytics/private/summary");
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error loading analytics summary"
    );
  }
};

export const analyticsRealTime = async (): Promise<AnalyticsRealTimeResponse> => {
  try {
    await setupAuth();

    const res = await API.get<AnalyticsRealTimeResponse>("/analytics/private/realtime");
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error loading real-time analytics"
    );
  }
};

export const analyticsUpdateDaily = async (date: string): Promise<SimpleResponse> => {
  try {
    await setupAuth();

    const res = await API.post<SimpleResponse>(`/analytics/private/update-daily`, { date });
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error updating daily analytics"
    );
  }
};
