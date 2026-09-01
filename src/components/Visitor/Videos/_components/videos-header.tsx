"use client";
import { motion } from "framer-motion";

export function VideosHeader({ language }: { language: string }) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-4 font-principal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {language === "pt" ? (
          <>
            Vídeos <span className="text-roxo100">recentes</span>
          </>
        ) : (
          <>
            Recent <span className="text-roxo100">videos</span>
          </>
        )}
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-secundaria"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {language === "pt"
          ? "Acompanhando o desenvolvimento dos meus projetos, direto do canal no YouTube."
          : "Following the development of my projects, straight from the YouTube channel."}
      </motion.p>
    </motion.div>
  );
}
