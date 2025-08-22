"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { SkillsPagination } from "@/types/skills";

interface SkillsPaginationControlsProps {
  pagination: SkillsPagination;
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  isLoading?: boolean;
}

export function SkillsPaginationControls({
  pagination,
  currentPage,
  limit,
  onPageChange,
  onLimitChange,
  onFirstPage,
  onLastPage,
  onNextPage,
  onPrevPage,
  isLoading = false,
}: SkillsPaginationControlsProps) {
  const { total, totalPages, hasNext, hasPrev } = pagination;

  const startItem = currentPage * limit + 1;
  const endItem = Math.min((currentPage + 1) * limit, total);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const start = Math.max(0, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-4">
      {/* Items info */}
      <div className="text-sm text-muted-foreground">
        Mostrando {startItem} - {endItem} de {total} habilidades
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* First page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFirstPage}
          disabled={!hasPrev || isLoading}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">Primeira página</span>
        </Button>

        {/* Previous page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={!hasPrev || isLoading}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              {page + 1}
            </Button>
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!hasNext || isLoading}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima página</span>
        </Button>

        {/* Last page */}
        <Button
          variant="outline"
          size="sm"
          onClick={onLastPage}
          disabled={!hasNext || isLoading}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Última página</span>
        </Button>
      </div>

      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Itens por página:</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))} disabled={isLoading}>
          <SelectTrigger className="h-8 w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
