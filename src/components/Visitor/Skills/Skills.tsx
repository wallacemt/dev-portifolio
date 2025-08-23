"use client";

import { useState, useEffect, useCallback } from "react";
import { getSkills } from "@/services/skillsApi";
import { SkillsContent } from "./_components/skills-content";
import { useSkillsPagination } from "./useSkillsPagination";
import { SkillResponse } from "@/types/skills";
import { SkillsContentSkeleton } from "./_components/skills-tabs-content-skeleton";

interface SkillsContentProps {
  language: string;
}

export function Skills({ language }: SkillsContentProps) {
  const [skillsData, setSkillsData] = useState<SkillResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    currentPage,
    limit,
    isLoading,
    setIsLoading,
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    changeLimit,
  } = useSkillsPagination({
    initialPage: 0,
    initialLimit: 6,
  });

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getSkills(language, currentPage, limit);
      setSkillsData(response);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError(language === "pt" ? "Erro ao carregar habilidades" : "Error loading skills");
      setSkillsData({
        skills: [],
        texts: {
          title: language === "pt" ? "Erro ao carregar Habilidades" : "Error loading skills",
          description: language === "pt" ? "Recarregue a página e tente novamente" : "Please reload and try again",
          chooseText: "",
        },
        pagination: {
          total: 0,
          page: 0,
          limit,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [language, currentPage, limit, setIsLoading]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    goToFirstPage();
  }, [language, goToFirstPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      goToPage(page);
    },
    [goToPage]
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      changeLimit(newLimit);
    },
    [changeLimit]
  );

  const handleNextPage = useCallback(() => {
    if (skillsData?.pagination) {
      goToNextPage(skillsData.pagination);
    }
  }, [goToNextPage, skillsData?.pagination]);

  const handleLastPage = useCallback(() => {
    if (skillsData?.pagination) {
      goToLastPage(skillsData.pagination);
    }
  }, [goToLastPage, skillsData?.pagination]);

  if (isLoading && !skillsData) {
    return (
      <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 p-2">
        <SkillsContentSkeleton />
      </section>
    );
  }

  if (error && (!skillsData || skillsData.skills.length === 0)) {
    return (
      <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 p-2">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === "pt" ? "Erro ao carregar habilidades" : "Error loading skills"}
          </h2>
          <p className="text-gray-400 mb-4">
            {language === "pt"
              ? "Não foi possível carregar as habilidades. Tente novamente mais tarde."
              : "Unable to load skills. Please try again later."}
          </p>
          <button
            onClick={fetchSkills}
            className="px-4 py-2 bg-roxo600 text-white rounded hover:bg-roxo700 transition-colors"
            disabled={isLoading}
          >
            {isLoading
              ? language === "pt"
                ? "Carregando..."
                : "Loading..."
              : language === "pt"
              ? "Tentar novamente"
              : "Try again"}
          </button>
        </div>
      </section>
    );
  }

  if (!skillsData || skillsData.skills.length === 0) {
    return (
      <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 p-2">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === "pt" ? "Nenhuma habilidade encontrada" : "No skills found"}
          </h2>
          <p className="text-gray-400">
            {language === "pt"
              ? "Parece que não há habilidades disponíveis no momento."
              : "It seems like there are no skills available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 p-2">
      <SkillsContent
        res={skillsData}
        pagination={{
          currentPage,
          limit,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange,
          onFirstPage: goToFirstPage,
          onLastPage: handleLastPage,
          onNextPage: handleNextPage,
          onPrevPage: goToPrevPage,
          isLoading,
        }}
      />
    </section>
  );
}
