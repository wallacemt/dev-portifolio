import { Project } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DepoButton } from "@/components/ui/depo-btn";


export default  function ProjectCard({ project }: { project: Project }) {
  
  return (
    <div className="mb-16 md:ms-6 relative">
      <div className="flex flex-col  gap-2 md:max-w-[90%] mx-auto">
        <div className="flex gap-2 ">
          <span className=" flex items-center justify-center w-5 h-5 animate-pulse bg-roxo100 rounded-full -start-2 ring-4 ring-neutral-900" />
          <time className="block text-sm text-gray-400 mb-2">
            {project.lastUpdate
              ? format(new Date(project.lastUpdate), "MMMM yyyy", { locale: ptBR })
              : "Data desconhecida"}
          </time>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-center">
          <Image
            src={project.previewImage}
            alt={project.title}
            width={500}
            height={500}
            className=" md:w-[60%] h-[100%] rounded-tl-md rounded-bl-md"
          />
          <div className="flex flex-col justify-between border-neutral-800 rounded-lg p-6 bg-gradient-to-b from-roxo700 to-roxo500 shadow-md transition-all hover:shadow-[0_0_5px_rgba(0,229,255,0.2)]">
            <h3 className="text-xl font-medium text-white font-principal">{project.title}</h3>
            <p className="text-sm text-gray-300 mt-2 mb-4 leading-relaxed tracking-wide">
              {project.description.slice(0, 100).concat("...")}
            </p>
            <div className="flex overflow-x-auto snap-x mb-4">
              <div className="overflow-hidden w-full ">
                <div className={`flex space-x-4 ${project.skills.length > 2 && "animate-marquee"}`} onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")} onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}>
                  {project.skills.map((sk) => (
                    <Image
                      key={`${sk.id}`}
                      src={sk.image}
                      alt={sk.title}
                      height={100}
                      width={100}
                      className="w-14 h-14 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            <Link
              href={`/watch/pt/projects/${project.id}`}
              className="inline-flex items-center gap-1 text-sky-400 text-sm  w-fit"
            >
              <DepoButton message="Ver Projeto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
