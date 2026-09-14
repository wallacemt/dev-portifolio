"use client";
import type { LandingTexts } from "@/services/uiTexts";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { YoutubeVideo } from "@/types/youtube";
import { VideoCard } from "./video-card";

interface LatestVideoSectionProps {
  texts: LandingTexts;
  video: YoutubeVideo;
}

export function LatestVideoSection({ video, texts }: LatestVideoSectionProps) {
  const { language } = useLanguage();
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
            {texts.latestVideoTitle}
          </h2>
          <p className="text-foreground/70 mt-2">
            {texts.latestVideoDescription}
          </p>
        </div>
        <Link
          href={`/watch/${language}/videos`}
          className="shrink-0 text-roxo100 hover:text-roxo300 transition-colors font-medium"
        >
          {texts.viewAll}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <VideoCard video={video} />
      </motion.div>
    </section>
  );
}
