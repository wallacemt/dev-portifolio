"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { YoutubeLogoIcon } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { dateLocale } from "@/lib/date-locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { YoutubeVideo } from "@/types/youtube";
import { OptimizedImage } from "../../SEO/OptimizedImage";

interface VideoCardProps {
  video: YoutubeVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  const { language } = useLanguage();
  const publishedLabel = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: dateLocale(language),
  });

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full rounded-2xl overflow-hidden border border-roxo300/30 bg-roxo700 shadow-lg shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roxo100"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video [&>div]:h-full">
        <OptimizedImage src={video.thumbnailUrl} fill alt="" title={video.title} />
        <span className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-roxo700 shadow-lg transition-transform group-hover:scale-110" aria-hidden="true">
          <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
        </span>
      </div>

      <div className="p-5 md:p-6">
        <span className="mb-3 flex items-center gap-2 text-sm text-foreground/80"><YoutubeLogoIcon aria-hidden="true" className="h-5 w-5" />YouTube</span>
        <h3 className="text-lg md:text-xl font-semibold text-foreground font-principal leading-snug">
          {video.title}
        </h3>
        <p className="text-sm text-foreground/70 mt-1.5 capitalize">{publishedLabel}</p>
      </div>
    </motion.a>
  );
}
