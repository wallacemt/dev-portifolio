"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkillWithCount } from "@/utilis/skill-project-count";

interface SkillsHighlightsSectionProps {
  skills: SkillWithCount[];
}

// Every 3rd tile spans two columns so the grid reads as an uneven bento
// layout instead of a flat icon wall.
function tileSpan(index: number) {
  return index % 3 === 0 ? "sm:col-span-2" : "";
}

function projectCountLabel(count: number, language: string) {
  if (language === "pt") return count === 1 ? "1 projeto" : `${count} projetos`;
  return count === 1 ? "1 project" : `${count} projects`;
}

export function SkillsHighlightsSection({ skills }: SkillsHighlightsSectionProps) {
  const { language } = useLanguage();
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
              ? "As tecnologias mais presentes no meu portfólio. Clique numa delas para ver os projetos."
              : "The technologies showing up most across my portfolio. Click one to see its projects."}
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
        {skills.map(({ skill, count }, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={tileSpan(index)}
          >
            <Link
              href={`/watch/${language}/projects?tech=${encodeURIComponent(skill.title)}`}
              className="glass rounded-xl p-4 flex items-center gap-3 h-full hover:border-roxo100/50 hover:shadow-lg hover:shadow-roxo500/20 transition-[border-color,box-shadow] duration-300"
            >
              <div className="shrink-0 w-11 h-11 rounded-full bg-roxo700/60 flex items-center justify-center">
                <Image src={skill.image} alt={skill.title} width={24} height={24} className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{skill.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[0.65rem] uppercase tracking-wide text-roxo100/80 bg-roxo100/10 rounded-full px-2 py-0.5 truncate">
                    {skill.stack}
                  </span>
                  <span className="text-[0.65rem] text-foreground/50 shrink-0">{projectCountLabel(count, language)}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
