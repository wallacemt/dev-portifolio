import TiltedCard from "@/blocks/Components/TiltedCard/TiltedCard";
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
    <section
      className="w-full lg:w-screen mx-auto flex flex-col lg:flex-row items-center justify-center gap-10"
      style={{ userSelect: "none" }}
    >
      <div className="flex flex-col md:text-left  md:max-w-xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 font-principal">
          <BlurText text={owner.welcomeMessage} delay={150} animateBy="words" direction="top" />
        </h1>
        <p className="font-secundaria w-full text-white/80 text-[1rem] md:text-lg text-justify  mb-6">
          {owner.about ||
            "Desenvolvedor apaixonado por tecnologia, interfaces modernas e boas experiências digitais. Aqui você encontrará meus projetos, ideias e mais sobre mim."}
        </p>

        <div className="flex w-full gap-4">
          <Link
            href={language === "pt" ? owner.cvLinkPT : owner.cvLinkEN}
            target="_blank"
            className="px-4 py-2 bg-purple-primary border-purple-500 border text-white hover:bg-purple-700 transition flex items-center gap-2 rounded-xl"
          >
            {owner.buttons.curriculo}
            <Download />
          </Link>
          <Link href="/watch/pt/projects" className="px-4 py-2   text-white rounded-lg  hover:bg-roxo700 hover:border border-white transition">
            {owner.buttons.project}
          </Link>
        </div>
      </div>
      <div className="flex-shrink-0">
        <TiltedCard
          imageSrc={owner.avatar}
          altText="Owner image"
          className="hidden md:block"
          captionText={owner.name}
          containerHeight="480px"
          imageHeight={"480px"}
          containerWidth={"320px"}
          rotateAmplitude={18}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
        />
        <Image src={owner.avatar} width={280} height={380} alt="Owner image" className="lg:hidden rounded-xl" />
      </div>
    </section>
  );
};
