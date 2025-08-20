"use client";
import { FormationResponse } from "@/types/formations";
import { motion } from "framer-motion";
import { FormationStats } from "./formation-stats";
import { FormationCard } from "./formation-card";
import { useFormations } from "../useFormations";
interface FormationsContentProps {
  formations: FormationResponse;
  language: string;
}
export const FormationsContent = ({ formations, language }: FormationsContentProps) => {
  const { activeFormation, handleFormationHover, getFormationStats } = useFormations();
  if (formations.formations.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "pt" ? "Nenhuma formação encontrada" : "No formations found"}
          </h2>
          <p className="text-gray-400">
            {language === "pt" ? "Não há formações disponíveis no momento." : "No formations available at the moment."}
          </p>
        </div>
      </section>
    );
  }
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-principal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {formations.texts.title}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-secundaria"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {formations.texts.description}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FormationStats stats={getFormationStats(formations.formations)} texts={formations.texts} />
        </motion.div>
        <div className="relative">
          <div className="relative z-10 space-y-8 pt-8">
            {formations.formations.map((formation, index) => (
              <div key={formation.id} id={`formation-${formation.id}`} className="scroll-mt-24">
                <FormationCard
                  formation={formation}
                  index={index}
                  texts={formations.texts.formationStatsText}
                  isActive={formation.id === activeFormation}
                  onHover={handleFormationHover}
                  language={language}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
