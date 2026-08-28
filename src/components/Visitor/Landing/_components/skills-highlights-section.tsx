"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Skill } from "@/types/skills";

interface SkillsHighlightsSectionProps {
  skills: Skill[];
  language: string;
}

// Every 3rd tile spans two columns so the grid reads as an uneven bento
// layout instead of a flat icon wall.
function tileSpan(index: number) {
  return index % 3 === 0 ? "sm:col-span-2" : "";
}

export function SkillsHighlightsSection({ skills, language }: SkillsHighlightsSectionProps) {
  return (
    <section id="skills" className="w-full max-w-6xl mx-auto px-4 md:px-12 py-16">
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
                Stack em <span className="text-roxo100">uso</span>
              </>
            ) : (
              <>
                Current <span className="text-roxo100">stack</span>
              </>
            )}
          </h2>
          <p className="text-foreground/70 mt-2">
            {language === "pt"
              ? "As tecnologias mais presentes nos projetos em destaque acima."
              : "The technologies showing up most in the featured projects above."}
          </p>
        </div>
        <Link
          href={`/watch/${language}/skills`}
          className="shrink-0 text-roxo100 hover:text-roxo300 transition-colors font-medium"
        >
          {language === "pt" ? "Ver todas →" : "View all →"}
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={`glass rounded-xl p-4 flex items-center gap-3 hover:border-roxo100/50 hover:shadow-lg hover:shadow-roxo500/20 transition-[border-color,box-shadow] duration-300 ${tileSpan(index)}`}
          >
            <div className="shrink-0 w-11 h-11 rounded-full bg-roxo700/60 flex items-center justify-center">
              <Image src={skill.image} alt={skill.title} width={24} height={24} className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{skill.title}</p>
              <span className="inline-block mt-1 text-[0.65rem] uppercase tracking-wide text-roxo100/80 bg-roxo100/10 rounded-full px-2 py-0.5 truncate max-w-full">
                {skill.stack}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
