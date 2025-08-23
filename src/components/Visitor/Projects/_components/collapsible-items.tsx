"use client";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { Project } from "@/types/projects";
import Link from "next/link";
import { DepoButton } from "@/components/ui/depo-btn";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CollapsibleItemsProps {
  project: Project;
  title: string;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

function HeaderComponent({ title, open }: Omit<CollapsibleItemsProps, "project">) {
  return (
    <CollapsibleTrigger asChild>
      <div className="flex gap-2 items-center cursor-pointer w-fit">
        <h2 className=" text-xl md:text-4xl font-semibold text-gray-100 font-principal">{title}</h2>
        {open ? <ChevronsUpDown className="text-Destaque" /> : <ChevronsDownUp className="text-Destaque" />}
      </div>
    </CollapsibleTrigger>
  );
}

function Badges({ title, project, setIsOpen }: CollapsibleItemsProps) {
  return (
    <Collapsible defaultOpen={false} onOpenChange={setIsOpen} className="space-y-2">
      <HeaderComponent title={title} open={false} />
      <CollapsibleContent>
        <div className="flex flex-wrap gap-2">
          {project.techs.content.map((tech) => (
            <Badge key={tech} className="bg-roxo300 text-gray-50 px-3 py-1 rounded-full text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Buttons({ project, title, open, setIsOpen }: CollapsibleItemsProps) {
  return (
    <Collapsible open={open} onOpenChange={setIsOpen} className="space-y-2">
      <HeaderComponent title={title} open={open} />
      <CollapsibleContent>
        <ul className="flex flex-wrap gap-4">
          <li>
            {project.links.content.deployment.url && (
              <Link href={project.links.content.deployment.url} target="_blank" rel="noopener noreferrer">
                <DepoButton
                  bg="var(--textura-roxo-3-hex)"
                  hover="var(--textura-roxo-3-3-hex)"
                  message={project.links.content.deployment.title}
                />
              </Link>
            )}
          </li>
          <li>
            {project.links.content.frontend.url && (
              <Link href={project.links.content.frontend.url} target="_blank" rel="noopener noreferrer">
                <DepoButton
                  message={project.links.content.frontend.title}
                  bg="var(--textura-roxo-4-hex)"
                  hover="var(--textura-roxo-4-4-hex)"
                />
              </Link>
            )}
          </li>
          <li>
            {project.links.content.backend.url && (
              <Link href={project.links.content.backend.url} target="_blank" rel="noopener noreferrer">
                <DepoButton
                  message={project.links.content.backend.title}
                  bg="var(--textura-roxo-2-hex)"
                  hover="var(--textura-roxo-2-2-hex)"
                />
              </Link>
            )}
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Texts({ title, project, open, setIsOpen }: CollapsibleItemsProps) {
  return (
    <Collapsible open={open} onOpenChange={setIsOpen} className="space-y-2">
      <HeaderComponent title={title} open={open} />
      <CollapsibleContent>
        <div className="overflow-y-auto max-h-[150px] md:max-h-[200px] prose prose-sm md:prose-base  leading-relaxed">
          <p className="text-gray-300">{project.description.content}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Images({ project, title, open, setIsOpen }: CollapsibleItemsProps) {
  return (
    <Collapsible open={open} onOpenChange={setIsOpen} className="space-y-4 h-full">
      <HeaderComponent title={title} open={open} />
      <CollapsibleContent className=" w-full overflow-auto  ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          {project.skills.content.map((skill) => (
            <div key={skill.id} className=" rounded-lg shadow-sm">
              <div className="flex flex-col flex-wrap items-center gap-2 mb-2">
                <Image
                  src={skill.image}
                  alt={skill.title}
                  title={skill.title}
                  width={120}
                  height={200}
           
                />
                <p>{skill.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
export const CollapsibleItems = ({
  title,
  project,
  type,
}: CollapsibleItemsProps & { type: "text" | "badges" | "buttons" | "images" }) => {
  const [isOpen, setIsOpen] = useState(true);

  switch (type) {
    case "text":
      return <Texts title={title} project={project} open={isOpen} setIsOpen={setIsOpen} />;
    case "badges":
      return <Badges title={title} project={project} open={isOpen} setIsOpen={setIsOpen} />;
    case "buttons":
      return <Buttons title={title} project={project} open={isOpen} setIsOpen={setIsOpen} />;
    case "images":
      return <Images title={title} project={project} open={isOpen} setIsOpen={setIsOpen} />;
  }
};
