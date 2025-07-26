import { getProjects } from "@/services/projects";
import { ProjectFilters } from "./_components/project-filters";
import ProjectTimelineList from "./_components/project-list";

export default async function ProjectTimeline({
  language,
  filters,
}: {
  language: string;
  filters?: { search?: string; tech?: string; orderBy?: string };
}) {
  const response = await getProjects(language, { ...filters, page: "1" });
  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8">
      <ProjectFilters />
      <ProjectTimelineList
        language={language}
        initialProjects={response.projects}
        initialMeta={response.meta}
        filters={filters || {}}
      />
    </section>
  );
}
