"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { YoutubeLogoIcon } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { YoutubeVideo } from "@/types/youtube";
import { OptimizedImage } from "../../SEO/OptimizedImage";

interface VideoCardProps {
  video: YoutubeVideo;
  language: string;
}

export function VideoCard({ video, language }: VideoCardProps) {
  const publishedLabel = formatDistanceToNow(new Date(video.publishedAt), {
    addSuffix: true,
    locale: language === "pt" ? ptBR : enUS,
  });

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full aspect-video rounded-2xl overflow-hidden border border-roxo300/30 shadow-lg shadow-black/20"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 [&>div]:h-full">
        <OptimizedImage src={video.thumbnailUrl} fill alt={video.title} title={video.title} />
      </div>

      {/* Always-on legibility gradient — content below must read without hover, for touch/no-hover input. */}
      <div className="absolute inset-0 bg-gradient-to-t from-roxo700 via-roxo700/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium text-foreground">
        <YoutubeLogoIcon weight="fill" className="h-4 w-4 text-red-500" />
        YouTube
      </span>

      <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-roxo700 opacity-80 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
        <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-base md:text-lg font-semibold text-foreground font-principal line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-sm text-foreground/70 mt-1.5 capitalize">{publishedLabel}</p>
      </div>
    </motion.a>
  );
}
