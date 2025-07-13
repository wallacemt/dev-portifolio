import { ProjectsPage } from "@/components/Visitor/Projects/Projects";
import { getProjects } from "@/services/projects";

export default async function Projects({ params }: { params: Promise<{ language: string }> }) {
  try {
    const { language } = await params;
    const projectsResponse = await getProjects(language);
    return <ProjectsPage projects={projectsResponse.projects} language={language} />;
  } catch (err) {
    console.log(err);
  }
}
