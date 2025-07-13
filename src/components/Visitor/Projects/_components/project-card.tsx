"use client";

import { Project } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

export default function ProjectTimelineItem({ project }: { project: Project }) {
  return (
    <li className="mb-16 ms-6 relative">
      <div className="flex gap-2 ">
        <span className=" flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full -start-2 ring-4 ring-neutral-900" />
        <time className="block text-sm text-gray-400 mb-2">
          {project.lastUpdate
            ? format(new Date(project.lastUpdate), "MMMM yyyy", { locale: ptBR })
            : "Data desconhecida"}
        </time>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Image src={project.previewImage} alt={project.title} width={500} height={500} className=" w-1/2 h-full rounded-lg" />
        <div className="flex flex-col justify-between border-neutral-800 rounded-lg p-6 bg-neutral-900/70 shadow-md transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]">
          <h3 className="text-xl font-semibold text-white font-mono">{project.title}</h3>
          <p className="text-sm text-gray-300 mt-2 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techs.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-neutral-800 border border-sky-500 text-sky-400 px-2 py-1 rounded font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
          <Link
            href={`/watch/pt/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-sky-400 text-sm hover:underline w-fit"
          >
            Ver projeto <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </li>
  );
}
