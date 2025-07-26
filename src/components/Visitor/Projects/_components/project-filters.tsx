"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTechsProject } from "@/services/projects";
import { useDebounce } from "@/utilis/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
export const ProjectFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [techsList, setTechList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const updateQueryParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    updateQueryParam("search", debouncedSearchValue);
  }, [debouncedSearchValue, updateQueryParam]);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await getTechsProject();
        setTechList(res);
      } catch (error) {
        console.error("Error fetching techs:", error);
      }
    };
    fetchTechs();
  }, []);

  const memoizedTechOptions = useMemo(
    () =>
      techsList.map((tech) => (
        <SelectItem key={tech} value={tech}>
          <span className="capitalize">{tech}</span>
        </SelectItem>
      )),
    [techsList]
  );
  return (
    <div className="flex md:flex-row flex-col max-w-xl mx-auto gap-4 mb-6">
      <Input
        placeholder="Search projects..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="bg-neutral-900 text-white"
        autoComplete="off"
      />
      <Select
        defaultValue={searchParams.get("tech") || "all"}
        onValueChange={(value) => updateQueryParam("tech", value)}
      >
        <SelectTrigger className="bg-neutral-900 text-white w-full">
          <SelectValue placeholder="Select tech" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {memoizedTechOptions}
        </SelectContent>
      </Select>
    </div>
  );
};
