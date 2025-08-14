import { API, ownerId, setupAuth, SimpleResponse } from "@/lib/axios";
import {
  AnalyticsRealTimeResponse,
  AnalyticsResponse,
  AnalyticsSummaryResponse,
  TrackVisitorPage,
  TrackVisitorRequest,
} from "@/types/analytics";



export const postTrackVisitor = async (trackingData: TrackVisitorRequest) => {
  try {
    const response = await API.post(`/analytics/${ownerId}/track-visitor`, trackingData);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error tracking visitor"
    );
  }
};

export const postTrackVisitorPageView = async (trackingPage: TrackVisitorPage) => {
  try {
    const res = await API.post(`/analytics/${ownerId}/track-pageview`, trackingPage);
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error tracking visitor"
    );
  }
};

export const analyticsDashboard = async (startDate: Date, endDate: Date): Promise<AnalyticsResponse> => {
  try {
   await setupAuth();
    
    const params = new URLSearchParams();
    if (startDate && endDate) {
      params.append("startDate", String(startDate.toLocaleDateString().replace("%", "")));
      params.append("endDate", String(endDate.toLocaleDateString().replace("%", "")));
    }

    console.log(startDate.toISOString(), endDate.toISOString());
    const res = await API.get<AnalyticsResponse>(
      `/analytics/private/dashboard?${startDate && "startDate=" + startDate.toISOString()}&${
        endDate && "endDate=" + endDate.toISOString()
      }`
    );
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
