import { getProjects, getTechsProject } from "@/services/projects";
import { ProjectsContent } from "./_components/project-content";

export default async function ProjectTimeline({
  language,
  filters,
}: {
  language: string;
  filters?: { search?: string; tech?: string; orderBy?: string };
}) {
  const response = await getProjects(language, { ...filters, page: "1" }).catch((error) => {
    console.error("Error fetching projects:", error);
    return {
      projects: [],
      texts: {
        title: language === "pt" ? "Error ao carregar projetos" : "Error fetch projects",
        description: language === "pt" ? "Recarregue a pagina e tente novamente" : "Try-again",
      },
      meta: { total: 0, page: 1, limit: 1, hasNextPage: false },
    };
  });
  const techList = await getTechsProject();

  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8">
      <ProjectsContent response={response} language={language} filters={filters} techList={techList} />
    </section>
  );
}
