import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Aos from "aos";
import { GooSpinner } from "react-spinners-kit";

export const Habilidades = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && selectedSkill) {
                setSelectedSkill(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedSkill]);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("/database/habilidades.json");
                setSkillsData(response.data);
            } catch (error) {
                console.error("Erro ao carregar as habilidades:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const handleImageLoad = (index) => {
        setImageLoading((prevState) => ({ ...prevState, [index]: false }));
    };

    const handleImageLoading = (index) => {
        setImageLoading((prevState) => ({ ...prevState, [index]: true }));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-2 text-white mb-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 xl:grid-cols-5">
                    {skillsData.map((skill, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-[#1E2021] p-6 rounded-lg shadow-lg transition-all duration-200 ease-linear hover:bg-opacity-80 hover:shadow-2xl hover:border-2 border-Destaque cursor-pointer hover:scale-105 overflow-hidden"
                            onClick={() => setSelectedSkill(skill)}
                            data-aos="fade-right"
                        >
                            {imageLoading[index] && (
                                <div className="w-32 h-32 flex items-center justify-center mb-4">
                                    <GooSpinner size={80} color="#FF2A00" />
                                </div>
                            )}
                            <img
                                src={skill.icon}
                                alt={skill.nome}
                                className={`w-32 h-32 mb-4 object-contain ${
                                    imageLoading[index] ? "hidden" : ""
                                }`}
                                loading="lazy"
                                onLoad={() => handleImageLoad(index)}
                                onLoadStart={() => handleImageLoading(index)}
                            />
                            <h3 className="text-lg md:text-xl font-extrabold mt-4 font-lato ">
                                {skill.nome}
                            </h3>
                        </div>
                    ))}
                </div>

                {selectedSkill && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-DarkA4 p-4 rounded-lg shadow-lg max-w-lg w-[90%] md:w-full relative">
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-0 right-0 bg-transparent text-white font-bold p-2 rounded-full transition-all hover:bg-Destaque hover:text-black"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <h3 className="text-3xl font-bold font-principal mb-4 text-center">
                                {selectedSkill.nome}
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                                {selectedSkill.habilidades.map(
                                    (habilidade, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center text-lg text-gray-300 font-secundaria hover:text-DarkP"
                                        >
                                            <svg
                                                className="w-6 h-6 mr-2 text-DarkA1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {habilidade}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
