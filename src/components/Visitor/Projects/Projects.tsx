import { getProjects, getTechsProject } from "@/services/projects";
import { ProjectFilters } from "./_components/project-filters";
import ProjectTimelineList from "./_components/project-list";

export default async function ProjectTimeline({
  language,
  filters,
}: {
  language: string;
  filters?: { search?: string; tech?: string; orderBy?: string };
}) {
  const response = await getProjects(language, { ...filters, page: "1" }).catch((error) => {
    console.error("Error fetching projects:", error);
    return { projects: [], meta: { total: 0, page: 1, limit: 1, hasNextPage: false } };
  });
  const techList = await getTechsProject();

  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8">
      <ProjectFilters techsList={techList} />
      <ProjectTimelineList
        language={language}
        initialProjects={response.projects}
        initialMeta={response.meta}
        filters={filters || {}}
      />
    </section>
  );
}
