"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skill } from "@/types/skills";
import { useSkillsFilter } from "../useSkillsFilter";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SkillTabContentProps {
  skills: Skill[];
  chooseText?: string;
  isLoading?: boolean;
}

export const SkillsTabContent = ({ skills, chooseText, isLoading = false }: SkillTabContentProps) => {
  const { activeCategory, setActiveCategory, categories, filteredSkills, categoryCount } = useSkillsFilter(skills);

  if (  isLoading) {
    window.scrollTo(0, 0);
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto max-w-6xl">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center max-w-4xl p-4 rounded-lg bg-background animate-pulse">
            <div className="w-full h-24 bg-roxo300/40 rounded-lg mb-4"></div>
            <div className="w-3/4 h-4 bg-roxo300/40 rounded mb-2"></div>
            <div className="w-1/2 h-3 bg-roxo300/40 rounded mb-4"></div>
            <div className="flex flex-wrap gap-2 w-full">
              <div className="w-1/3 h-6 bg-roxo300/40 rounded"></div>
              <div className="w-1/4 h-6 bg-roxo300/40 rounded"></div>
              <div className="w-1/2 h-6 bg-roxo300/40 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 ">
        <TabsList className="hidden md:flex bg-roxo500 w-full max-w-4xl mx-auto gap-2">
          <TabsTrigger value="all" className="border-2 flex-2 hover:bg-roxo200">
            All{" "}
          </TabsTrigger>
          <TabsTrigger value={activeCategory != "all" ? activeCategory : "frontend"}>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="border-none !bg-transparent select-none w-fit capitalize">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                {activeCategory === "all" && (
                  <SelectItem value="all">{chooseText || "Escolha uma categoria"}</SelectItem>
                )}
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category} ({categoryCount[category]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsTrigger>
        </TabsList>
        <div className="md:hidden block w-full">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="bg-neutral-900 text-white w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {activeCategory === "all" && <SelectItem value="all">Escolha uma categoria</SelectItem>}
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category} ({categoryCount[category]})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <TabsContent value={activeCategory} className="mt-6 w-full max-w-6xl mx-auto" style={{ userSelect: "none" }}>
        {filteredSkills.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-2">
            <Image
              src={"https://res.cloudinary.com/dg9hqvlas/image/upload/v1753482501/Research_sujy9z.svg"}
              height={250}
              width={250}
              title="No skills found"
              className="object-contain mx-auto"
              alt="No skills found"
            />
            <p className="text-center font-principal">Nenhuma habilidade encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center max-w-4xl p-4 rounded-lg bg-background hover:bg-background/80 transition-colors group relative"
              >
                <div className="relative mt-6 mb-2">
                  <Image
                    src={skill.image}
                    alt={skill.title}
                    width={200}
                    height={200}
                    className="w-full h-24 object-contain animate-float group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-xl font-principal text-center">{skill.title}</span>
                <Badge className="text-xs text-roxo100 bg-transparent border border-gray-700 absolute top-2 left-1 capitalize">
                  {skill.type}
                </Badge>
                <Separator className="my-4" />
                <div className="h-20  flex flex-wrap gap-3  justify-center  overflow-y-auto overflow-x-hidden">
                  {skill.subSkils &&
                    skill.subSkils.length > 0 &&
                    skill.subSkils.map((subSkill, index) => (
                      <Badge
                        key={index}
                        className={`text-sm text-white font-bold font-sec rounded-full truncate ${
                          index % 2 === 0 ? "bg-[var(--textura-roxo-3-3-hex)]" : "bg-[var(--textura-roxo-2-hex)]"
                        }`}
                      >
                        {subSkill.length <= 45 ? subSkill : subSkill.slice(0, 45).concat("...")}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
