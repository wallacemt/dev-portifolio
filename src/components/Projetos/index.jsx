import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import { CardProjetos } from "./CardProjetos";

export const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/database/projetos.json");
        setProjects(response.data);
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <>
      <section className="bg-transparent" id="projetos">
        <div className="container mx-auto px-6 relative">
          
        <div className=" absolute top-[-4rem] left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="font-principal text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral10">
            Projetos
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary80 mx-auto rounded-full"></div>
        </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
            {projects.map((project, index) => (
              <CardProjetos key={index} project={project} projOne={index === 0 ? true:false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
