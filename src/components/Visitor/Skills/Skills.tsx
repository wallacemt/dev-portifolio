"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getSkillNotFilter } from "@/services/skillsApi";
import { SkillsContent } from "./_components/skills-content";
import { useSkillsPagination } from "./useSkillsPagination";
import { useSkillsFilter } from "./useSkillsFilter";
import { SkillResponse } from "@/types/skills";
import { SkillsContentSkeleton } from "./_components/skills-tabs-content-skeleton";

interface SkillsContentProps {
  language: string;
}

export function Skills({ language }: SkillsContentProps) {
  // Holds *every* skill (unpaginated) — the filter and pagination below both
  // operate on this full set, not on a server-side page slice. That
  // page-slice-only filtering was the bug: picking a category only searched
  // whatever 6 items happened to be on the current page.
  const [skillsData, setSkillsData] = useState<SkillResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { currentPage, limit, isLoading, setIsLoading, goToPage, goToFirstPage, changeLimit } = useSkillsPagination({
    initialPage: 0,
    initialLimit: 6,
  });

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getSkillNotFilter(language);
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
  }, [language, limit, setIsLoading]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    goToFirstPage();
  }, [language, goToFirstPage]);

  const allSkills = useMemo(() => skillsData?.skills ?? [], [skillsData]);
  const { activeCategory, setActiveCategory, categories, filteredSkills, categoryCount } = useSkillsFilter(
    allSkills,
    goToFirstPage,
  );

  const pagedSkills = useMemo(
    () => filteredSkills.slice(currentPage * limit, (currentPage + 1) * limit),
    [filteredSkills, currentPage, limit],
  );

  const clientPagination = useMemo(() => {
    const total = filteredSkills.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return {
      total,
      page: currentPage,
      limit,
      totalPages,
      hasNext: currentPage + 1 < totalPages,
      hasPrev: currentPage > 0,
    };
  }, [filteredSkills.length, currentPage, limit]);

  const handlePageChange = useCallback((page: number) => goToPage(page), [goToPage]);
  const handleLimitChange = useCallback((newLimit: number) => changeLimit(newLimit), [changeLimit]);
  const handleNextPage = useCallback(() => {
    if (clientPagination.hasNext) goToPage(currentPage + 1);
  }, [clientPagination.hasNext, currentPage, goToPage]);
  const handlePrevPage = useCallback(() => {
    if (clientPagination.hasPrev) goToPage(currentPage - 1);
  }, [clientPagination.hasPrev, currentPage, goToPage]);
  const handleLastPage = useCallback(() => goToPage(clientPagination.totalPages - 1), [clientPagination.totalPages, goToPage]);

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
        res={{ ...skillsData, skills: pagedSkills, pagination: clientPagination }}
        pagination={{
          currentPage,
          limit,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange,
          onFirstPage: goToFirstPage,
          onLastPage: handleLastPage,
          onNextPage: handleNextPage,
          onPrevPage: handlePrevPage,
          isLoading,
        }}
        filter={{ activeCategory, setActiveCategory, categories, categoryCount }}
      />
    </section>
  );
}
