import React, { useEffect } from "react";
import { CtaButton } from "../Footer/CtaButton";
import aos from "aos";

export const Sobre = () => {
  useEffect(() => {
    aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="px-4 mb-0 mt-0 py-12 relative h-auto md:h-[80vh]" data-aos="fade-right" id="sobre">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 z-50 ">
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 text-center ">
          <h2 className="font-principal text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral10">
            Sobre Mim
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary80 mx-auto rounded-full"></div>
        </div>

        {/* Imagem */}
        <div className="relative  md:mt-0 mt-12 flex justify-center md:justify-start flex-1">
          <div className="bg-[url('/images/person.jpeg')] bg-center bg-cover w-64 md:w-96 h-96 md:h-[400px] lg:h-[600px] rounded-full shadow-lg border-4 border-neutral90 dark:border-DarkA1 hover:border-Destaque transition-all duration-300 ease-in-out transform hover:scale-105 mx-auto filter backdrop-blur-md"></div>
        </div>

        {/* Texto */}
        <div className="text-center md:text-left flex-1 px-4 md:px-0">
          <h1 className="font-principal text-4xl md:text-5xl font-bold  text-DarkA1 dark:text-neutral10  leading-tight">
            Wallace Santana
          </h1>
          <h2 className="font-secundaria text-xl md:text-lg font-semibold text-DarkA1 mt-3">
            Desenvolvedor <span className="text-primary80">Full-Stack</span>
          </h2>
          <p className="font-secundaria text-base md:text-lg text-neutral10 dark:text-neutral10 mt-6 leading-relaxed text-justify">
            Sou Wallace Santana, um Desenvolvedor FullStack com uma paixão constante pelo aprendizado e evolução. Adoto
            uma abordagem autodidata, sempre em busca de novas formas de aprimorar minhas habilidades técnicas e meu
            crescimento pessoal. Acredito que a excelência vai além do código e se reflete em todas as áreas da vida.
          </p>
          <p className="font-secundaria text-base md:text-lg text-neutral10 mt-4 leading-relaxed text-justify">
            Tenho dois grandes sonhos profissionais: o primeiro é trabalhar no exterior, expandindo meus horizontes; o
            segundo é me tornar uma referência na tecnologia, influenciando positivamente o setor e contribuindo para a
            inovação.
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
            <CtaButton />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30 blur-md z-[-1] rounded-3xl"></div>
      </div>
    </section>
  );
};
