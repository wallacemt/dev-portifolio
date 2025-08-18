"use client";
import { Project } from "@/types/projects";
import Image from "next/image";
import { DepoButton } from "@/components/ui/depo-btn";
import { useState } from "react";
import { ProjectModal } from "./project-modal-view";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <div className="mb-16 md:ms-6 relative">
        <div className="flex flex-col  gap-2 md:max-w-[90%] mx-auto">
          <div className="flex gap-2 ">
            <span className=" flex items-center justify-center w-5 h-5 animate-pulse bg-roxo100 rounded-full -start-2 ring-4 ring-neutral-900" />
            <time className="block text-sm text-gray-400 mb-2">
              {project.lastUpdate ? project.lastUpdateText : "Data desconhecida"}
            </time>
          </div>
          <div className="flex md:flex-row relative flex-col items-center justify-center">
            <Image
              src={project.previewImage}
              alt={project.title}
              width={500}
              height={400}
              className=" md:w-[60%] h-[100%] hover:scale-105 ease-in-out duration-300  rounded-md"
            />
            {project.isMostRecent && (
              <div className="absolute top-4 left-4">
                <Badge className="text-xs font-secundaria animate-pulse duration-500 bg-roxo500 font-semibold text-white">
                  Mais Recente
                </Badge>
              </div>
            )}
            <div className="flex flex-col justify-between border-neutral-800 rounded-lg p-6 bg-gradient-to-b from-roxo700 to-roxo500 shadow-md transition-all hover:shadow-[0_0_5px_rgba(0,229,255,0.2)]">
              <h3 className="text-xl font-medium text-white font-principal">{project.title}</h3>
              <p className="text-sm max-w-2xl text-gray-300 mt-2 mb-4 leading-relaxed tracking-wide">
                {project.description.content.slice(0, 100).concat("...")}
              </p>
              <div className="flex overflow-x-auto snap-x mb-4">
                <div className="overflow-hidden w-[60%] mx-auto ">
                  <div
                    className={`flex space-x-4 ${project.skills.content.length > 2 && "animate-marquee"}`}
                    onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                    onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
                  >
                    {project.skills.content.map((sk) => (
                      <Image
                        key={`${sk.id}`}
                        title={sk.title}
                        src={sk.image}
                        alt={sk.title}
                        height={100}
                        width={100}
                        className="w-14 h-14 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 text-sm  w-fit " onClick={handleOpen}>
                <DepoButton message={project.cta} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <ProjectModal project={project} open={open} setOpen={handleOpen} />}
    </>
  );
}
