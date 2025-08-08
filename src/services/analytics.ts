import { API, ownerId } from "@/lib/axios";
import { TrackVisitorPage, TrackVisitorRequest } from "@/types/analytics";

export const postTrackVisitor = async (trackingData: TrackVisitorRequest) => {
  try {
    console.log(trackingData)
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
    console.log(trackingPage)
    const res = await API.post(`/analytics/${ownerId}/track-pageview`, trackingPage);
    return res.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error tracking visitor"
    );
  }
};
