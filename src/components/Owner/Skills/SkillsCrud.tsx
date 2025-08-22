import { getSkillNotFilter } from "@/services/skillsApi";
import { CrudState } from "@/types/utilis";
import { SkillsManager } from "./SkillsManager";
import { Skill } from "@/types/skills";
import { notFound } from "next/navigation";

export async function SkillsCrud({ state }: { state: CrudState }) {
  const { state: skState, id } = await state;
  let editSk: Skill | null = null;
  const { skills } = await getSkillNotFilter();
  if (skState === "edit" && id) {
    editSk = skills.find((p) => p.id === id) || null;
    if (!editSk) {
      notFound();
    }
  }
  return <SkillsManager skills={skills} currentState={skState} editSkill={editSk} />;
}
