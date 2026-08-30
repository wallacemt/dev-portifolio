import { getYoutubeVideos } from "@/services/youtube";
import { VideoCard } from "@/components/Visitor/Landing/_components/video-card";
import { SectionRetry } from "@/components/Visitor/Landing/_components/section-retry";
import { YoutubeVideo } from "@/types/youtube";

export default async function VideosContent({ language }: { language: string }) {
  let videos: YoutubeVideo[] | null = null;
  try {
    videos = await getYoutubeVideos();
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16">
      <h1 className="text-3xl md:text-4xl font-bold font-principal text-foreground mb-2">
        {language === "pt" ? (
          <>
            Vídeos <span className="text-roxo100">recentes</span>
          </>
        ) : (
          <>
            Recent <span className="text-roxo100">videos</span>
          </>
        )}
      </h1>
      <p className="text-foreground/70 mb-8">
        {language === "pt" ? "Todos os vídeos do meu canal no YouTube." : "All the videos from my YouTube channel."}
      </p>

      {videos === null ? (
        <SectionRetry
          message={language === "pt" ? "Não deu pra carregar os vídeos." : "Couldn't load the videos."}
          retryLabel={language === "pt" ? "Tentar novamente" : "Try again"}
        />
      ) : videos.length === 0 ? (
        <p className="text-foreground/60">{language === "pt" ? "Nenhum vídeo encontrado." : "No videos found."}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} language={language} />
          ))}
        </div>
      )}
    </section>
  );
}
