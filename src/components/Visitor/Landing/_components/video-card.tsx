"use client";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { YoutubeVideo } from "@/types/youtube";
import { OptimizedImage } from "../../SEO/OptimizedImage";

interface VideoCardProps {
  video: YoutubeVideo;
  language: string;
}

export function VideoCard({ video, language }: VideoCardProps) {
  const publishedLabel = new Date(video.publishedAt).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US");

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full aspect-video rounded-2xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 [&>div]:h-full">
        <OptimizedImage src={video.thumbnailUrl} fill alt={video.title} title={video.title} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-roxo700 via-roxo700/20 to-transparent" />

      <PlayCircle className="absolute inset-0 m-auto h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-sm font-semibold text-foreground font-principal line-clamp-2">{video.title}</h3>
        <p className="text-xs text-foreground/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {publishedLabel}
        </p>
      </div>
    </motion.a>
  );
}
