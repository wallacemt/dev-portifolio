import { API, setupAuth } from "@/lib/axios";
import {
  AnalyticsRealTimeResponse,
  AnalyticsResponse,
  AnalyticsSummaryResponse,
} from "@/types/analytics";

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

