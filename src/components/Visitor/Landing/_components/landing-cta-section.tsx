"use client";
import { motion } from "framer-motion";

interface LandingCtaSectionProps {
  texts: { cta: string; ctaBtn: string };
  language: string;
}

export function LandingCtaSection({ texts, language }: LandingCtaSectionProps) {
  return (
    <motion.section
      id="contato"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 md:px-12 py-16 text-center"
    >
      <p className="text-lg text-foreground/80 mb-6">{texts.cta}</p>
      <motion.a
        href={
          language === "pt"
            ? "https://docs.google.com/forms/d/e/1FAIpQLSczC9kJC83PaHzbZ6Wm9qQW8AhqBqu-i2ZDo_UDXvUlNWMCCQ/viewform?usp=dialog"
            : "https://docs.google.com/forms/d/e/1FAIpQLSe0Rowb2t9yfThken7OnlsaXo9dPO44beQzszW7hdina56VIA/viewform?usp=dialog"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-roxo300 to-roxo100 text-white font-semibold rounded-full hover:from-roxo500 hover:to-roxo300 transition-all duration-300 shadow-lg hover:shadow-roxo100/25"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {texts.ctaBtn}
      </motion.a>
    </motion.section>
  );
}
