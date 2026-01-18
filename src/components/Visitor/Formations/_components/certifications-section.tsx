"use client";

import { Certification } from "@/types/badges";
import { CertificationCard } from "./certification-card";
import { motion } from "framer-motion";
import { FileCheck } from "lucide-react";

interface CertificationsSectionProps {
  certifications: Certification[];
  language: string;
}

export function CertificationsSection({ certifications, language }: CertificationsSectionProps) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  const title = language === "pt" ? "Certificações Profissionais" : "Professional Certifications";
  const description =
    language === "pt"
      ? "Certificações validadas que comprovam conhecimento e expertise técnica"
      : "Validated certifications that prove technical knowledge and expertise";

  return (
    <motion.section
      className="py-16 px-4 bg-secondary/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <FileCheck className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-principal">{title}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-secundaria">{description}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {certifications.map((certification, index) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <CertificationCard certification={certification} language={language} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
