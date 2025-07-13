"use client";
import { Project } from "@/types/projects";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ProjectTimeline from "./_components/project-card";

interface ProjectProps {
  projects: Project[];
  language: string;
}

export const ProjectsPage = ({ projects, language }: ProjectProps) => {
  const [filters, setFilters] = useState({ search: "", tech: "", orderBy: "" });

  const filteredProjects = projects.filter((pr) => {
    const matchSearch = pr.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchTech = filters.tech ? pr.techs.includes(filters.tech) : true;
    return matchSearch && matchTech;
  });
  return (
    <section className="min-w-screen mx-auto px-4 md:px-12 py-8">
      <div className="flex max-w-xl mx-auto gap-4 mb-6">
        <Input
          placeholder="Buscar projeto"
          value={filters.search}
          onChange={(v) => setFilters({ ...filters, search: String(v.target.value) })}
          className="bg-neutral-900 text-white"
        />
        <Select onValueChange={(v) => setFilters({ ...filters, tech: v })}>
          <SelectTrigger className="w-[150px] bg-neutral-900 text-white">
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
      <ol className="relative  flex flex-col justify-center items-center space-y-12">
        <div className="border-s    border-neutral-800">
          {filteredProjects.map((project) => (
            <ProjectTimeline key={project.id} project={project} />
          ))}
        </div>
      </ol>
      {/* <div className="flex justify-center mt-10">
        <Button className="bg-sky-400 hover:bg-sky-500 text-black">Carregar Mais</Button>
      </div> */}
    </section>
  );
};
