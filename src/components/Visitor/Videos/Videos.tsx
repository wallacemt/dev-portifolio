import { getYoutubeVideos } from "@/services/youtube";
import { SectionRetry } from "@/components/Visitor/Landing/_components/section-retry";
import { YoutubeVideo } from "@/types/youtube";
import { VideosHeader } from "./_components/videos-header";
import { VideosList } from "./_components/videos-list";

export default async function VideosContent({ language }: { language: string }) {
  let videos: YoutubeVideo[] | null = null;
  try {
    videos = await getYoutubeVideos();
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-12 py-16">
      <VideosHeader />

      {videos === null ? (
        <SectionRetry
          message={language === "pt" ? "Não deu pra carregar os vídeos." : "Couldn't load the videos."}
          retryLabel={language === "pt" ? "Tentar novamente" : "Try again"}
        />
      ) : videos.length === 0 ? (
        <p className="text-center text-foreground/60">
          {language === "pt" ? "Nenhum vídeo encontrado." : "No videos found."}
        </p>
      ) : (
        <VideosList videos={videos} />
      )}
    </section>
  );
}
