import { getUiTexts, VideosTexts } from "@/services/uiTexts";
import { getYoutubeVideos } from "@/services/youtube";
import { SectionRetry } from "@/components/Visitor/Landing/_components/section-retry";
import { YoutubeVideo } from "@/types/youtube";
import { VideosHeader } from "./_components/videos-header";
import { VideosList } from "./_components/videos-list";

export default async function VideosContent({ language }: { language: string }) {
  const texts = await getUiTexts<VideosTexts>("videos", language);
  let videos: YoutubeVideo[] | null = null;
  try {
    videos = await getYoutubeVideos();
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-12 py-16">
      <VideosHeader texts={texts} />

      {videos === null ? (
        <SectionRetry
          message={texts.error}
          retryLabel={texts.retry}
        />
      ) : videos.length === 0 ? (
        <p className="text-center text-foreground/60">
          {texts.empty}
        </p>
      ) : (
        <VideosList videos={videos} />
      )}
    </section>
  );
}
