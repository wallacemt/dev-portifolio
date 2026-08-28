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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className={`glass rounded-xl p-4 flex items-center gap-3 hover:border-roxo100/40 transition-colors ${tileSpan(index)}`}
          >
            <Image src={skill.image} alt={skill.title} width={32} height={32} className="w-8 h-8 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{skill.title}</p>
              <p className="text-xs text-foreground/60 truncate">{skill.stack}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
