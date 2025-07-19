"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { getTechsProject } from "@/services/projects";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const ProjectFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [techsList, setTechList] = useState<string[]>([]);
  const updateQueryParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  useEffect(() => {
    const fetchTechs = async () => {
      const res = await getTechsProject();
      setTechList(res);
      setTechList(res);
    };
    fetchTechs();
  }, []);
  return (
    <div className="flex md:flex-row flex-col max-w-xl mx-auto gap-4 mb-6">
      <Input
        placeholder="Buscar projeto"
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => updateQueryParam("search", e.target.value)}
        className="bg-neutral-900 text-white"
      />
      <Select
        defaultValue={searchParams.get("tech") || "all"}
        onValueChange={(value) => updateQueryParam("tech", value)}
      >
        <SelectTrigger className="bg-neutral-900 text-white w-full">Tecnologias</SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {techsList.map((tech) => (
            <SelectItem key={tech} value={tech}>
              <span className="capitalize">{tech}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
