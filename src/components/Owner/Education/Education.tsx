import { notFound } from "next/navigation";
import { CrudState } from "@/types/utilis";
import { getFormations } from "@/services/formationApi";
import { Formation } from "@/types/formations";
import { FormationClientManager } from "./EducationClientManager";

export async function EducationPageCRUD({ state }: { state: CrudState }) {
  const { state: formationState, id } = await state;

  let formations: Formation[] = [];
  let editFormation: Formation | null = null;
  if (formationState === "edit" && id) {
    ({ formations } = await getFormations());
    editFormation = formations.find((f) => f.id === id) || null;
    if (!editFormation) {
      notFound();
    }
  }

  return <FormationClientManager formation={formations} currentState={formationState} editFormation={editFormation} />;
}
