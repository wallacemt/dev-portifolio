import { getProjects } from "@/services/projects";
import { Button } from "@/components/ui/button";
import { ProjectFilters } from "./_components/project-filters";
import ProjectCard from "./_components/project-card";

export default async function ProjectTimeline({ language }: { language: string }) {
  let projectsPromise;
  try {
    projectsPromise = await getProjects(language);
  } catch (e) {
    console.error(e);
    throw new Error("API_ERROR");
  }
  return (
    <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 py-8">
      <ProjectFilters projects={projectsPromise.projects} />
      <ol className="flex flex-col items-start" style={{ listStyle: "none" }}>
        <li className="mx-auto md:border-s-2 border-roxo100/50">
          {projectsPromise?.projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </li>
      </ol>
      {projectsPromise.meta.hasNextPage && (
        <div className="flex justify-center mt-10">
          <Button className="bg-sky-400 hover:bg-sky-500 text-black">Carregar Mais</Button>
        </div>
      )}
    </section>
  );
}
