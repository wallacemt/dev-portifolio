import {Skills as SK} from "@/components/Visitor/Skills/Skills";
import { SkillsContentSkeleton } from "@/components/Visitor/Skills/_components/skills-tabs-content-skeleton";

import { Suspense } from "react";

interface SkillProps {
  params: Promise<{ language: string }>;
}

export default async function Skills({ params }: SkillProps) {
  const { language } = await params;
  return (
    <Suspense fallback={<SkillsContentSkeleton />}>
      <SK language={language} />
    </Suspense>
  );
}
