"use client";
import { motion } from "framer-motion";
import { YoutubeVideo } from "@/types/youtube";
import { VideoCard } from "@/components/Visitor/Landing/_components/video-card";

interface VideosListProps {
  videos: YoutubeVideo[];
}

export function VideosList({ videos }: VideosListProps) {
  const [latest, ...rest] = videos;

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <VideoCard video={latest} />
      </motion.div>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
