import { API } from "@/lib/axios";
import { YoutubeVideo } from "@/types/youtube";

export const getYoutubeVideos = async (limit?: number): Promise<YoutubeVideo[]> => {
  try {
    const response = await API.get("/utilis/youtube-videos", { params: limit ? { limit } : undefined });
    return response.data as YoutubeVideo[];
  } catch (error) {
    console.error("Error fetching youtube videos:", error);
    throw error;
  }
};
