import ProjectTimelineSkeleton from "@/components/Visitor/Projects/_components/project-card-skeleton";
import ProjectTimeline from "@/components/Visitor/Projects/Projects";
import { Suspense } from "react";

interface ProjectsProps {
  params: Promise<{ language: string }>;
}
export default async function Projects({ params }: ProjectsProps) {
  const {language} = await params;
  return (
    <Suspense fallback={<ProjectTimelineSkeleton  />}>
      <ProjectTimeline language={language} />
    </Suspense>
  );
}
