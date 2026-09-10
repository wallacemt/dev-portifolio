"use client";

import { useEffect, useId, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StackType, SkillTypeValues } from "@/types/skills";
import { FormationTypeValues } from "@/types/formations";
import { getTechsProject } from "@/services/projects";
import { OwnerCollection, useOwnerList } from "./use-owner-list";

type ListState = ReturnType<typeof useOwnerList<unknown>>;
export function OwnerListControls({ list, collection }: { list: ListState; collection: OwnerCollection }) {
  const id = useId();
  const [techs, setTechs] = useState<string[]>([]);
  useEffect(() => {
    if (collection !== "projects") return;
    let active = true;
    getTechsProject().then(values => { if (active) setTechs(values); });
    return () => { active = false; };
  }, [collection]);
  const select = (name: string, label: string, values: [string, string][]) => (
    <label className="flex flex-col gap-1 text-sm" key={name}>
      {label}
      <select className="h-10 rounded-md border border-input bg-background px-3 text-foreground focus-visible:outline-2 focus-visible:outline-ring" value={list.query[name] || ""} onChange={event => list.filter(name, event.target.value)}>
        <option value="">{name === "orderBy" ? "Mais recentes (padrão)" : "Todos"}</option>
        {values.map(([label, value]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
  );
  return <div className="mb-4 space-y-3">
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-48 flex-1 flex-col gap-1">
        <label htmlFor={id} className="text-sm">Buscar {({ projects: "projetos", skills: "skills", formations: "formações", badges: "badges", certifications: "certificações" })[collection]}</label>
        <Input id={id} type="search" value={list.search} onChange={event => list.setSearch(event.target.value)} placeholder={collection === "formations" ? "Curso ou instituição" : collection === "skills" ? "Título ou stack" : collection === "projects" ? "Título ou descrição" : "Título ou emissor"} />
      </div>
      {collection === "projects" && <>
        {select("tech", "Tecnologia", techs.map(tech => [tech, tech]))}
        {select("activate", "Status", [["Ativo", "true"], ["Inativo", "false"]])}
        {select("orderBy", "Ordenação", [["Mais recentes", "desc"], ["Mais antigos", "asc"]])}
      </>}
      {collection === "skills" && <>
        {select("stack", "Stack", Object.entries(StackType))}
        {select("type", "Tipo", Object.entries(SkillTypeValues))}
      </>}
      {collection === "formations" && <>
        {select("type", "Tipo", Object.entries(FormationTypeValues))}
        {select("concluded", "Situação", [["Concluída", "true"], ["Em andamento", "false"]])}
      </>}
      <div className="flex gap-1" role="group" aria-label="Visualização">
        <Button variant="outline" size="icon" aria-label="Visualização em grade" aria-pressed={list.view === "grid"} onClick={() => list.changeView("grid")}><LayoutGrid /></Button>
        <Button variant="outline" size="icon" aria-label="Visualização em lista" aria-pressed={list.view === "list"} onClick={() => list.changeView("list")}><List /></Button>
      </div>
    </div>
    {list.error && <div role="alert" className="flex flex-wrap items-center gap-2"><span>{list.error}</span><Button variant="outline" onClick={list.refresh}>Tentar novamente</Button></div>}
    <div className="flex flex-wrap items-center justify-between gap-2" aria-live="polite">
      <span className="text-sm">{list.loading ? "Carregando…" : `Página ${list.meta.page} · ${list.meta.total} resultados`}</span>
      <nav className="flex gap-2" aria-label="Paginação">
        <Button variant="outline" disabled={list.loading || Number(list.query.page) <= 1} onClick={() => list.page(Number(list.query.page) - 1)}>Anterior</Button>
        <Button variant="outline" disabled={list.loading || !!list.error || !list.meta.hasNextPage} onClick={() => list.page(Number(list.query.page) + 1)}>Próxima</Button>
      </nav>
    </div>
  </div>;
}
