import { getSkills } from "@/services/skillsApi";
import { SkillsTabContent } from "./_components/skills-tabs-content";
interface SkillsContentProps {
  language: string;
}

export default async function SkillsContent({ language }: SkillsContentProps) {
  const skills = await getSkills(language);

  return (
    <section className="w-full  md:min-w-screen mx-auto px-4 md:px-12 p-2">
      <SkillsTabContent skills={skills} />
    </section>
  );
}
