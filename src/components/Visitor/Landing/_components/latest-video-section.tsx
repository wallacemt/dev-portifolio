"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { YoutubeVideo } from "@/types/youtube";
import { VideoCard } from "./video-card";

interface LatestVideoSectionProps {
  video: YoutubeVideo;
  language: string;
}

export function LatestVideoSection({ video, language }: LatestVideoSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
      >
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold font-principal text-foreground">
            {language === "pt" ? (
              <>
                Último <span className="text-roxo100">vídeo</span>
              </>
            ) : (
              <>
                Latest <span className="text-roxo100">video</span>
              </>
            )}
          </h2>
          <p className="text-foreground/70 mt-2">
            {language === "pt"
              ? "Acompanhe no YouTube o desenvolvimento dos meus projetos."
              : "Follow along on YouTube as I build my projects."}
          </p>
        </div>
        <Link
          href={`/watch/${language}/videos`}
          className="shrink-0 text-roxo100 hover:text-roxo300 transition-colors font-medium"
        >
          {language === "pt" ? "Ver todos →" : "View all →"}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <VideoCard video={video} language={language} />
      </motion.div>
    </section>
  );
}
