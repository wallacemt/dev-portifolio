import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { OwnerResponse } from "@/types/owner";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AbboutProps {
  owner: OwnerResponse;
  language: string;
}

export const Abbout = ({ owner, language }: AbboutProps) => {
  return (
    <section className="w-screen mx-auto py-20 flex flex-col-reve md:flex-row items-center justify-center gap-10">
      <div className="flex flex-col text-left text-muted-foreground max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-principal">
          <BlurText text={owner.welcomeMessage} delay={150} animateBy="words" direction="top" />
        </h1>
        <p className="font-secundaria text-white/70 md:text-lg leading mb-6">
          {
            owner.about ||
            "Desenvolvedor apaixonado por tecnologia, interfaces modernas e boas experiências digitais. Aqui você encontrará meus projetos, ideias e mais sobre mim."
          }
         
        </p>

        <div className="flex gap-4">
          <Link
            href={language === "pt" ? owner.cvLinkPT : owner.cvLinkEN}
            target="_blank"
            className="px-4 py-2 bg-purple-primary text-whiterounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            {owner.buttons.curriculo}
            <Download />
          </Link>
          <Link
            href="/watch/pt/projects"
            className="px-4 py-2 border border-border rounded-lg hover:border-purple-primary hover:bg-roxo100 transition"
          >
            {owner.buttons.project}
          </Link>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Image
          src={owner.avatar}
          alt={owner.name}
          width={180}
          height={180}
          className="rounded-xl border border-border shadow-md"
        />
      </div>
    </section>
  );
};
