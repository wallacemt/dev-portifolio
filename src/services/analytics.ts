import { API, handleToken, ownerId, SimpleResponse } from "@/lib/axios";
import { cookieUtils } from "@/lib/cookies";
import {
  AnalyticsRealTimeResponse,
  AnalyticsResponse,
  AnalyticsSummaryResponse,
  TrackVisitorPage,
  TrackVisitorRequest,
} from "@/types/analytics";

const setupAuth = async () => {
  let token = cookieUtils.getAuthToken();
  if (!token && typeof window === "undefined") {
    try {
      token = await cookieUtils.getServerAuthToken();
    } catch (error) {}
  }
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
  return token;
};

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
    const token = await setupAuth();
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    console.log(
      "Fetching analytics dashboard with dates:",
      String(new Date(startDate).toISOString()),
      new Date(endDate).toISOString()
    );
    const params = new URLSearchParams();
    if (startDate && endDate) {
      params.append("startDate", String(startDate.toLocaleDateString().replace("%", "")));
      params.append("endDate", String(endDate.toLocaleDateString().replace("%", "")));
    }

    const res = await API.get<AnalyticsResponse>(`/analytics/private/dashboard`, { params });
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error loading analytics dashboard"
    );
  }
};

export const analyticsSummary = async (): Promise<AnalyticsSummaryResponse> => {
  try {
    const token = await setupAuth();
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
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
    const token = await setupAuth();
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
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
    const token = await setupAuth();
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const res = await API.post<SimpleResponse>(`/analytics/private/update-daily`, { date });
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error updating daily analytics"
    );
  }
};
