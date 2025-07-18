"use client";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Project } from "@/types/projects";

interface ProjectFiltersProps {
    projects: Project[];
}
export const ProjectFilters = ({}:ProjectFiltersProps) => {
  const [filters, setFilters] = useState({ search: "", tech: "", orderBy: "" });
//   const filteredProjects = projects.filter((pr) => {
//     const matchSearch = pr.title.toLowerCase().includes(filters.search.toLowerCase());
//     const matchTech = filters.tech ? pr.techs.includes(filters.tech) : true;
//     return matchSearch && matchTech;
//   });
  return (
    <div className="flex md:flex-row flex-col max-w-xl mx-auto gap-4 mb-6">
      <Input
        placeholder="Buscar projeto"
        value={filters.search}
        onChange={(v) => setFilters({ ...filters, search: String(v.target.value) })}
        className="bg-neutral-900 text-white"
      />
      <Select onValueChange={(v) => setFilters({ ...filters, tech: v })}>
        <SelectTrigger className="w-full md:w-[150px] bg-neutral-900 text-white">
          <SelectValue placeholder="Tecnologia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="Next.js">Next.js</SelectItem>
          <SelectItem value="React">React</SelectItem>
          <SelectItem value="Node.js">Node.js</SelectItem>
          <SelectItem value="Vue">Vue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
