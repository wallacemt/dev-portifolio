"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/types/projects";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DepoButton } from "@/components/ui/depo-btn";
import Link from "next/link";
interface ProjectModalProps {
  project: Project;
  open: boolean;
  setOpen: () => void;
}
export function ProjectModal({ project, open, setOpen }: ProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        fullscreen
        className="overflow-y-auto  flex flex-col gap-6 bg-gradient-to-b from-roxo600 to-60% to-roxo700"
      >
        <DialogHeader>
          <DialogTitle className="text-center font-principal text-3xl">
            <span className="text-Destaque">{project.title}</span>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col items-center gap-4 max-w-6xl mx-auto p-2">
          <Carousel className="w-full max-w-4xl mx-auto ">
            <CarouselContent>
              {project.screenshots.map((img) => (
                <CarouselItem key={project.id + img}>
                  <Image
                    src={img}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className="w-full max-h-4xl h-[26rem] rounded-lg shadow-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Separator />
          <Image
            src={"https://res.cloudinary.com/dg9hqvlas/image/upload/v1753224597/ght_ippe91.svg"}
            height={220}
            width={220}
            alt="Image ilustration"
            className=" left-0 absolute mx-auto animate-pulse duration-200 opacity-30 z-[-1]"
          />

          <div className="flex flex-col relative  gap-8 space-y-4 max-w-4xl mx-auto">
            <section className="space-y-2">
              <h2 className="text-4xl font-semibold text-gray-100 font-principal">Descrição</h2>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </section>
            <section className="space-y-2">
              <h2 className="text-4xl font-semibold text-gray-100 font-principal">Tecnologias</h2>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <Badge key={tech} className="bg-roxo300 text-gray-50 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
            <section className="space-y-2 ">
              <h2 className="text-4xl font-semibold text-gray-100 font-principal">Links do Projeto</h2>
              <ul className="flex flex-wrap gap-4">
                <li>
                  <Link href={project.deployment} target="_blank" rel="noopener noreferrer">
                    <DepoButton bg="var(--textura-roxo-3-hex)" hover="var(--textura-roxo-3-3-hex)" message="Deploy" />
                  </Link>
                </li>
                <li>
                  <Link href={project.frontend} target="_blank" rel="noopener noreferrer">
                    <DepoButton message="Frontend" bg="var(--textura-roxo-4-hex)" hover="var(--textura-roxo-4-4-hex)" />
                  </Link>
                </li>
                <li>
                  <Link href={project.backend} target="_blank" rel="noopener noreferrer">
                    <DepoButton message="Backend" bg="var(--textura-roxo-2-hex)" hover="var(--textura-roxo-2-2-hex)" />
                  </Link>
                </li>
              </ul>
            </section>
            <section className="space-y-2">
              <h2 className="text-4xl font-semibold text-gray-100 font-principal">Skills Utilizadas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.skills.map((skill) => (
                  <div key={skill.id} className=" rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Image src={skill.image} alt={skill.title} width={40} height={40} className="rounded" />
                      <span className="font-semibold text-gray-700">{skill.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {project.lastUpdate && (
            <section className="flex w-fit self-end items-center gap-2 px-3 py-1 bg-card border border-border rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs">
                {" "}
                Última atualização:{" "}
                {new Date(project.lastUpdate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
