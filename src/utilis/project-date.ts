import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { Project } from "@/types/projects";

// ponytail: only 2 labels, no dictionary system exists on the frontend yet — add real i18n keys here if one shows up.
const DATE_LABELS: Record<NonNullable<Project["dateLabelKey"]>, { pt: string; en: string }> = {
  updatedAt: { pt: "Ultima Atualização", en: "Last Update" },
  addedAt: { pt: "Adicionado Em", en: "Added On" },
};

/**
 * Builds the "label + formatted date" string shown on project cards/modals.
 * Falls back to the legacy pre-formatted `lastUpdateText` when the backend
 * hasn't sent `lastUpdate`/`dateLabelKey` yet.
 */
export function formatProjectDate(project: Project, language: string): string | null {
  const rawDate = project.lastUpdate ?? project.createdAt;

  if (!project.dateLabelKey || !rawDate) {
    return project.lastUpdateText ?? null;
  }

  const formattedDate = new Intl.DateTimeFormat(language, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(rawDate));

  const label = DATE_LABELS[project.dateLabelKey][language === "pt" ? "pt" : "en"];
  return `${label} ${formattedDate}`;
}

/**
 * "atualizado há 3 dias" / "updated 3 days ago" — used for the GitHub-driven
 * recency badge on Featured Projects, distinct from formatProjectDate's
 * absolute-date label.
 */
export function formatRelativeUpdate(date: Date, language: string): string {
  const distance = formatDistanceToNow(date, {
    addSuffix: true,
    locale: language === "pt" ? ptBR : enUS,
  });
  return language === "pt" ? `Atualizado ${distance}` : `Updated ${distance}`;
}
