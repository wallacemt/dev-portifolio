import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { AiOutlineClose } from "react-icons/ai";
import { DepoButton } from "../DepoButton";
import { ImageLoading } from "../../ImageLoading";
import ReactMarkdown from "react-markdown";
import { SpiralSpinner } from "react-spinners-kit";
import fetchReadmeFromGitHub from "../../../services/api";
import "@tailwindcss/typography"

export const CardProjetos = ({ project }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [readmeFront, setReadmeFront] = useState("");
    const [readmeBack, setReadmeBack] = useState("");

    // Função de controle de modal
    const toggleModal = async () => {
        setModalOpen(!isModalOpen);
        if (!isModalOpen && !readmeFront && !readmeBack) {
            setLoading(true);
            const frontReadme = await fetchReadmeFromGitHub(
                "wallacemt",
                project.readmeFront
            );
            const backReadme = await fetchReadmeFromGitHub(
                "wallacemt",
                project.readmeBack
            );
            setReadmeFront(frontReadme);
            setReadmeBack(backReadme);
            setLoading(false);
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const Modal = () => (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 p-4"
            onClick={toggleModal}
            style={{zIndex: 9999}}
        >
            <div
                className="bg-DarkP rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto p-6 relative transform scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-black bg-Destaque rounded-full p-2"
                        onClick={toggleModal}
                    >
                        <AiOutlineClose size={28} color="#fff" />
                    </button>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-DarkA4 text-center absolute left-1/2 transform -translate-x-1/2">
                        {project.nome}
                    </h1>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        navigation: true,
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="mb-6 mt-16"
                >
                    <div className="swiper-button-next text-red-500"></div>
                    <div className="swiper-button-prev text-red-500"></div>
                    {project.screenshots.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={src}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-48 sm:h-60 md:h-72 lg:h-96 object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Accordion */}
                <details className="border rounded-lg mb-6">
                    <summary className="p-4 font-bold cursor-pointer text-gray-800">
                        Leia o README do Frontend
                    </summary>
                    <div className="p-4 text-gray-600 prose">
                        {/* Condicional para verificar se o README está carregado */}
                        {loading ? (
                            <div className="text-center text-gray-600">
                                 <p className="font-bold"><SpiralSpinner /> Carregando README...</p>
                            </div>
                        ) : (
                            <div>
                                {/* README Frontend */}
                                {readmeFront && (
                                    <div className="mb-6">
                                        <div className="prose">
                                            <ReactMarkdown>
                                                {readmeFront}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </details>

                <details className="border rounded-lg mb-6">
                    <summary className="p-4 font-bold cursor-pointer text-gray-800">
                        Leia o README do Backend
                    </summary>
                    <div className="p-4 text-gray-600 prose">
                        {/* Condicional para verificar se o README está carregado */}
                        {loading ? (
                            <div className="text-center text-gray-600">
                                <SpiralSpinner /> Carregando README...
                            </div>
                        ) : (
                            <div>
                                {/* README Backend */}
                                {readmeBack && (
                                    <div className="mb-6">
                                        <div className="prose">
                                            <ReactMarkdown>
                                                {readmeBack}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </details>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-4 justify-center">
                    {project.technologys.map((tech, idx) => (
                        <div
                            key={idx}
                            className="bg-Destaque text-white px-3 py-2 text-sm md:text-base rounded-lg shadow-md font-medium text-center"
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-DarkP2 rounded-lg shadow-2xl p-6 transition-transform duration-200 hover:scale-105">
            <h3 className="text-2xl text-center mb-6 font-bold text-gray-800 font-principal">
                {project.nome}
            </h3>

            <div
                className="relative overflow-hidden rounded-lg mb-6 cursor-pointer"
                onClick={toggleModal}
            >
                {/* Spinner de carregamento */}
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                        <ImageLoading />
                    </div>
                )}
                {/* Imagem */}
                <img
                    src={project.previewImage}
                    alt={`Preview do projeto ${project.nome}`}
                    className={`w-full h-60 object-cover transition-transform duration-300 hover:scale-110 ${
                        imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    loading="lazy"
                    onLoad={handleImageLoad}
                />
            </div>
            {/* Tecnologias */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.technologys.map((tech, idx) => (
                    <span
                        key={idx}
                        className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                        {tech}
                    </span>
                ))}
            </div>
            <div className="flex justify-end items-end align-baseline gap-4">
                <a
                    href={project.deployment}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <DepoButton />
                </a>
            </div>

            {/* Modal */}
            {isModalOpen && ReactDOM.createPortal(<Modal />, document.body)}
        </div>
    );
};
