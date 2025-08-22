"use client";
import { motion } from "framer-motion";
import { SkillsTabContent } from "./skills-tabs-content";
import { SkillsPaginationControls } from "./skills-pagination";
import { SkillResponse } from "@/types/skills";

interface PaginationProps {
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (newLimit: number) => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  isLoading: boolean;
}

interface SkillsContentProps {
  res: SkillResponse;
  pagination: PaginationProps;
}

export const SkillsContent = ({ res, pagination }: SkillsContentProps) => {
  return (
    <>
      <motion.div
        className="text-center mb-8"
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
          {res.texts.title}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-secundaria"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {res.texts.description}
        </motion.p>
      </motion.div>

      <SkillsTabContent skills={res.skills} chooseText={res.texts.chooseText} isLoading={pagination.isLoading} />

      {res.pagination && res.pagination.totalPages > 1 && (
        <SkillsPaginationControls
          pagination={res.pagination}
          currentPage={pagination.currentPage}
          limit={pagination.limit}
          onPageChange={pagination.onPageChange}
          onLimitChange={pagination.onLimitChange}
          onFirstPage={pagination.onFirstPage}
          onLastPage={pagination.onLastPage}
          onNextPage={pagination.onNextPage}
          onPrevPage={pagination.onPrevPage}
          isLoading={pagination.isLoading}
        />
      )}
    </>
  );
};
