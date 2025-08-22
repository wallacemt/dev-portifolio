"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/types/projects";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { Separator } from "@/components/ui/separator";
import { DetailsCard } from "./details-card";
import { CollapsibleItems } from "./collapsible-items";
import BlurText from "@/components/blocks/TextAnimations/BlurText/BlurText";
import { OptimizedImage } from "../../SEO/OptimizedImage";
interface ProjectModalProps {
  project: Project;
  open: boolean;
  setOpen: () => void;
}
export function ProjectModal({ project, open, setOpen }: ProjectModalProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          fullscreen
          className="overflow-y-auto  overflow-x-hidden flex flex-col gap-6 bg-gradient-to-b from-roxo600 to-60% to-roxo700"
        >
          <DialogHeader className="">
            <DialogTitle className="text-center font-principal -mb-4 mt-6 md:mt-0 md:mb-0 text-xl md:text-3xl">
              <BlurText
                text={project.title}
                className="text-Destaque flex items-center justify-center"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </DialogTitle>
          </DialogHeader>
          <Separator />

          <div className="flex flex-col relative  min-w-full">
            <DetailsCard />
            <div className="max-w-6xl p-2 mx-auto gap-2 space-y-4">
              <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }} autoplay={{ dalay: 7500 }}>
                <CarouselContent>
                  {project.screenshots.map((img) => (
                    <CarouselItem key={project.id + img}>
                      <OptimizedImage
                        src={img}
                        title={project.title}
                        alt={project.title}
                        width={1200}
                        height={0}
                        className="w-full max-h-4xl md:h-[25rem] rounded-lg shadow-lg"
                      />
                     
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="md:inline-flex hidden" />
                <CarouselNext className="md:inline-flex hidden" />
              </Carousel>
              <Separator />
              <div className="flex flex-col relative  gap-8 space-y-4 max-w-4xl mx-auto">
                <CollapsibleItems title={project.description.title} type={"text"} project={project} />
                <CollapsibleItems title={project.techs.title} type={"badges"} project={project} />
                <CollapsibleItems title={project.links.title} type="buttons" project={project} />
                <CollapsibleItems title={project.skills.title} type="images" project={project} />
              </div>
              {project.lastUpdate && (
                <section className="flex w-fit absolute right-0 bottom-2 items-center gap-2 px-3 py-1 bg-card border border-border rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs">{project.lastUpdateText}</span>
                </section>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
