import React, { useEffect, useState } from "react";
import { CtaButton } from "../Footer/CtaButton";
import aos from "aos";
export const Sobre = () => {
  useEffect(() => {
    aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  });

  return (
    <>
      <section className="px-6 mb-20" data-aos="fade-right">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 z-50">
          <div className="relative flex justify-center md:justify-start flex-2">
            <div
              className={`bg-[url('/images/person.jpeg')] bg-center bg-cover w-80 h-96 md:h-[550px] rounded-full shadow-md border-2 border-DarkA1 hover:border-Destaque transition-transform duration-300 ease-in-out hover:scale-105 mx-auto filter backdrop-blur-md`}
            ></div>
          </div>

          <div className="text-center md:text-left max-w-3xl flex-1 px-4 md:px-0">
            <h1 className="font-principal text-4xl md:text-6xl font-bold text-DarkA1 leading-tight">Wallace Santana</h1>
            <h2 className="font-secundaria text-2xl md:text-1xl font-semibold text-DarkA1 mt-3">
              Desenvolvedor <span className="text-primary80">Full-Stack</span>
            </h2>
            <p className="font-secundaria text-lg md:text-xl text-neutral10 mt-6 leading-relaxed text-justify">
              Sou Wallace Santana, um Desenvolvedor FullStack com uma paixão constante pelo aprendizado e evolução.
              Adoto uma abordagem autodidata, sempre em busca de novas formas de aprimorar minhas habilidades técnicas e
              meu crescimento pessoal. Acredito que a excelência vai além do código e se reflete em todas as áreas da
              vida.
            </p>
            <p className="font-secundaria text-lg md:text-xl text-neutral10 mt-4 leading-relaxed text-justify">
              Tenho dois grandes sonhos profissionais: o primeiro é trabalhar no exterior, expandindo meus horizontes; o
              segundo é me tornar uma referência na tecnologia, influenciando positivamente o setor e contribuindo para
              a inovação.
            </p>
            <div className="mt-4 flex justify-center md:justify-start mb-20 md:mb-0">
              <CtaButton />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40 blur-md z-[-1] rounded-3xl"></div>
      </section>
    </>
  );
};
