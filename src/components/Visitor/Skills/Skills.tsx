import { getSkills } from "@/services/skillsApi";
import { SkillsTabContent } from "./_components/skills-tabs-content";
interface SkillsContentProps {
  language: string;
}

export default async function SkillsContent({ language }: SkillsContentProps) {
  const res = await getSkills(language).catch((error) => {
    console.error("Error fetching skills:", error);
    return { skills: [], chooseText: "" };
  });
  if (!res.skills || res.skills.length === 0) {
    return (
      <section className="w-full md:min-w-screen mx-auto px-4 md:px-12 p-2">
        <h2 className="text-2xl font-bold text-white">No Skills Found</h2>
        <p className="text-gray-400">It seems like there are no skills available at the moment.</p>
      </section>
    );
  }
  return (
    <section className="w-full  md:min-w-screen mx-auto px-4 md:px-12 p-2">
      <SkillsTabContent skills={res.skills} chooseText={res.chooseText} />
    </section>
  );
}
