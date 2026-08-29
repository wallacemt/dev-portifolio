"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skill } from "@/types/skills";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

interface SkillTabContentProps {
  // Already filtered (by activeCategory) AND paginated by the parent — this
  // component only renders, it doesn't slice the dataset (that used to be
  // the bug: filtering ran on the current page's 6 items instead of all
  // skills, see useSkillsFilter's caller in Skills.tsx).
  skills: Skill[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  categoryCount: Record<string, number>;
  chooseText?: string;
  isLoading?: boolean;
  skillProjectCounts: Record<string, number>;
}

export const SkillsTabContent = ({
  skills: filteredSkills,
  activeCategory,
  setActiveCategory,
  categories,
  categoryCount,
  chooseText,
  isLoading = false,
  skillProjectCounts,
}: SkillTabContentProps) => {
  const { language } = useLanguage();
  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  if (isLoading) {
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
            <p>{language == "pt" ? "Todas" : "All"}</p>
          </TabsTrigger>
          {/* asChild: this trigger only exists for Radix's active-state styling
              (the real interaction happens in the nested Select) — rendering it
              as a <div> instead of TabsTrigger's default <button> avoids nesting
              the Select's own <button> inside another <button>, which is invalid
              HTML and was causing a hydration warning. */}
          <TabsTrigger value={activeCategory != "all" ? activeCategory : "frontend"} asChild>
            <div>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="border-none !bg-transparent select-none w-fit capitalize">
                  <SelectValue placeholder={chooseText || "Filtre por uma categoria"} />
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
            </div>
          </TabsTrigger>
        </TabsList>
        <div className="md:hidden block w-full">
          <Label htmlFor="category-select" className="mb-2">
            {chooseText}
          </Label>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="bg-neutral-900 text-white w-full" id="category-select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {activeCategory === "all" && <SelectItem value="all">Escolha uma categoria</SelectItem>}
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
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
            {filteredSkills.map((skill) => {
              const projectCount = skillProjectCounts[skill.id] ?? 0;
              return (
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
                  {projectCount > 0 && (
                    <Badge className="text-xs text-roxo100 bg-transparent border border-gray-700 absolute top-2 right-1">
                      {language === "pt"
                        ? projectCount === 1
                          ? "1 projeto"
                          : `${projectCount} projetos`
                        : projectCount === 1
                          ? "1 project"
                          : `${projectCount} projects`}
                    </Badge>
                  )}
                  <Separator className="my-4" />
                  <div className="h-20 w-full flex flex-wrap gap-3  justify-center  overflow-y-auto overflow-x-hidden">
                    {skill.subSkils &&
                      skill.subSkils.length > 0 &&
                      skill.subSkils.map((subSkill, index) => (
                        <Badge
                          key={index}
                          className={`text-xs text-white font-bold font-secundaria rounded-full truncate ${
                            index % 2 === 0 ? "bg-[var(--textura-roxo-3-3-hex)]" : "bg-[var(--textura-roxo-2-hex)]"
                          }`}
                        >
                          {subSkill.length <= 45 ? subSkill : subSkill.slice(0, 45).concat("...")}
                        </Badge>
                      ))}
                  </div>
                  {projectCount > 0 && (
                    <Link
                      href={`/watch/${language}/projects?tech=${encodeURIComponent(skill.title)}`}
                      className="mt-4 text-sm text-roxo100 hover:text-roxo300 transition-colors font-medium"
                    >
                      {language === "pt" ? "Ver projetos →" : "View projects →"}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
