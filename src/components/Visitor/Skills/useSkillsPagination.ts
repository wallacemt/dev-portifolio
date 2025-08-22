"use client";

import { useState, useCallback, useMemo } from "react";
import {  SkillsPagination } from "@/types/skills";

export interface UseSkillsPaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

export function useSkillsPagination(options: UseSkillsPaginationOptions = {}) {
  const { initialPage = 0, initialLimit = 12 } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [isLoading, setIsLoading] = useState(false);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goToNextPage = useCallback((pagination: SkillsPagination) => {
    if (pagination.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const goToLastPage = useCallback((pagination: SkillsPagination) => {
    setCurrentPage(pagination.totalPages - 1);
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(0); // Reset to first page when changing limit
  }, []);

  const paginationInfo = useMemo(
    () => ({
      currentPage,
      limit,
      isLoading,
    }),
    [currentPage, limit, isLoading]
  );

  const paginationActions = useMemo(
    () => ({
      goToPage,
      goToNextPage,
      goToPrevPage,
      goToFirstPage,
      goToLastPage,
      changeLimit,
      setIsLoading,
    }),
    [goToPage, goToNextPage, goToPrevPage, goToFirstPage, goToLastPage, changeLimit]
  );

  return {
    ...paginationInfo,
    ...paginationActions,
  };
}
