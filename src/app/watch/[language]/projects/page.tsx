import ProjectTimelineSkeleton from "@/components/Visitor/Projects/_components/project-card-skeleton";
import ProjectTimeline from "@/components/Visitor/Projects/Projects";
import { Suspense } from "react";

interface ProjectsProps {
  params: Promise<{ language: string }>;
  searchParams: Promise<{ search?: string; tech?: string; orderBy?: string }>;
}
export default async function Projects({ params, searchParams }: ProjectsProps) {
  const { language } = await params;
  const filters = await searchParams
  return (
    <Suspense fallback={<ProjectTimelineSkeleton />} >
      <ProjectTimeline language={language} filters={filters} />
    </Suspense>
  );
}
