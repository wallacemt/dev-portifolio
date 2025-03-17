import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DepoButton } from "../DepoButton";
import { ImageLoading } from "../../ImageLoading";
import "@tailwindcss/typography";
import aos from "aos";
import { ModalProject } from "../ModalProjetos";
import { LazyImage } from "../LazyImage";


export const CardProjetos = ({ project, projOne = false }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState(Array(project.screenshots.length).fill(true));

  useEffect(() => {
    aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div
      className={`rounded-lg shadow-2xl p-6 transition-transform duration-200 overflow-y-hidden
  ${
    projOne
      ? "bg-gradient-to-r from-Destaque to-primary80 border-4 border-white scale-105 "
      : "bg-DarkA1 hover:bg-DarkA3"
  }`}
      data-aos="fade-right"
    >
      <h3
        className={`text-center mb-6 font-bold transform-cpu duration-300 border-b-2 rounded-md ${
          projOne
            ? "text-DarkP border-neutral10 bg-gradient-to-r from-Destaque to-primary80 text-3xl"
            : "text-neutral90 border-neutral90 bg-gradient-to-r from-DarkA1 to-DarkA3 text-2xl"
        } font-principal`}
      >
        {project.nome}
      </h3>

      <div className="relative overflow-hidden rounded-lg mb-6 cursor-pointer" onClick={toggleModal}>
        {/* Spinner de carregamento */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <ImageLoading />
          </div>
        )}
        <LazyImage
          src={project.previewImage}
          alt={`Preview do projeto ${project.nome}`}
          className={`border-2 border-neutral90 w-full ${
            projOne ? "h-auto" : "h-60"
          } object-cover transition-transform duration-300 hover:scale-110 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleImageLoad}
          projOne={projOne}
        />
      </div>
      {/* Tecnologias */}
      <div className="flex flex-wrap gap-2 mb-12">
        {project.technologys.map((tech, idx) => (
          <span
            key={idx}
            className="bg-purple-200 hover:border-2 hover:border-Destaque text-purple-800 text-sm font-medium px-3 py-1 rounded-full border-2 border-DarkA4 cursor-pointer"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="absolute bottom-2 right-2">
        <a href={project.deployment} target="_blank" rel="noopener noreferrer">
          <DepoButton message={"Deploy"} />
        </a>
      </div>

        
      {/* Modal */}
      <ModalProject
        isOpen={isModalOpen}
        onClose={toggleModal}
        project={project}
        imageLoadingStates={imageLoadingStates}
        setImageLoadingStates={setImageLoadingStates}
        projOne={projOne}
      />
    </div>
  );
};
