import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Aos from "aos";
import { ImageLoading } from "../ImageLoading";
import { FaRegCircleCheck } from "react-icons/fa6";
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
    setImageLoading((prevState) => ({ ...prevState, [index]: true }));
  };

  if (loading) {
    return <Loading />;
  }

  const renderSkillItem = (skill, index) => (
    <div
      key={index}
      className="flex flex-col items-center bg-neutral10 dark:bg-[#1E2021] p-6 rounded-lg shadow-lg transition-all duration-200 ease-linear hover:bg-opacity-80 hover:shadow-2xl hover:border-2 border-Destaque cursor-pointer hover:scale-105 overflow-hidden"
      onClick={() => setSelectedSkill(skill)}
      data-aos="fade-right"
    >
      {!imageLoading[index] && (
        <div className="w-32 h-32 flex items-center justify-center mb-4">
          <ImageLoading />
        </div>
      )}
      <img
        src={skill.icon}
        alt={skill.nome}
        className={`w-32 h-32 mb-4 object-contain ${imageLoading[index] ? "block" : "hidden"}`}
        onLoad={() => handleImageLoad(index)}
      />
      <h3 className="text-lg md:text-xl font-extrabold mt-4 font-lato text-neutral90 dark:text-DarkP">{skill.nome}</h3>
    </div>
  );

  return (
    <section className="py-2 text-white mb-16">
      <div className="container mx-auto px-6">
        {/* FrontEnd */}
        <div className="mb-8 mt-4">
          <h2 className="font-principal text-Destaque dark:text-DarkP bg-neutral10 dark:bg-neutral90 w-fit mx-auto rounded-lg text-3xl mb-4 text-center p-1">
            FrontEnd
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 border-b-2 border-neutral90 dark:border-neutral10 p-2 rounded-md">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, idx) => <div key={idx} className="h-32 w-32 bg-gray-500 rounded-lg animate-pulse"></div>)
              : skillsData
                  .filter((skill) => skill.stack === "FrontEnd")
                  .map((skill, index) => renderSkillItem(skill, index))}
          </div>
        </div>

        {/* BackEnd */}
        <div className="mb-8">
          <h2 className="font-principal text-Destaque dark:text-DarkP bg-neutral10 dark:bg-neutral90 w-fit mx-auto rounded-lg text-3xl mb-4 text-center p-1">
            BackEnd
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 border-b-2 border-neutral90 dark:border-neutral10 p-2 rounded-md">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, idx) => <div key={idx} className="h-32 w-32 bg-gray-500 rounded-lg animate-pulse"></div>)
              : skillsData
                  .filter((skill) => skill.stack === "BackEnd")
                  .map((skill, index) => renderSkillItem(skill, index))}
          </div>
        </div>

        {/* DevOps */}
        <div className="mb-8">
          <h2 className="font-principal text-Destaque dark:text-DarkP bg-neutral10 dark:bg-neutral90 w-fit mx-auto rounded-lg text-3xl mb-4 text-center p-1">
            DevOps
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 text-center border-b-2 border-neutral90 dark:border-neutral10 p-2 rounded-md">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, idx) => <div key={idx} className="h-32 w-32 bg-gray-500 rounded-lg animate-pulse"></div>)
              : skillsData
                  .filter((skill) => skill.stack === "DevOps")
                  .map((skill, index) => renderSkillItem(skill, index))}
          </div>
        </div>
      </div>

      {/* Modal de Seleção de Habilidade */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100">
          <div className="bg-neutral80 p-6 rounded-lg shadow-lg max-w-lg w-[90%] md:w-full relative transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-0 right-0 bg-transparent text-white font-bold p-2 rounded-full transition-all transform hover:scale-110 hover:bg-Destaque hover:text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedSkill.icon}
              alt={selectedSkill.nome}
              className={`h-32 w-32 mx-auto mb-4  object-cover ${imageLoading[selectedSkill.id] ? "animate-spin" : ""}`}
            ></img>

            {/* Modal Title */}
            <h3 className="text-5xl font-bold font-principal mb-4 text-center text-primary80 bg-neutral10 rounded-lg w-fit mx-auto p-1">
              {selectedSkill.nome}
            </h3>

            {/* Skill List */}
            <ul className="list-disc pl-6 space-y-2 flex flex-col items-baseline gap-4">
              {selectedSkill.habilidades.map((habilidade, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-center text-2xl text-neutral10 font-bold font-secundaria hover:text-DarkP cursor-pointer transition-all duration-200 transform hover:translate-x-2 rounded-lg gap-2 border-b-2 w-full text-center"
                >
                  {habilidade}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
