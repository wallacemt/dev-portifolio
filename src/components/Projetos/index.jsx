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

  const firstProject = projects.length > 0 ? projects[0] : null;
  const otherProjects = projects.slice(1);

  return (
    <section className="bg-transparent mb-20">
      <div className="container mx-auto px-6">
        {/* Projeto em destaque */}
        {firstProject && (
          <div className="mb-10">
            <CardProjetos project={firstProject} projOne= {true}	/>
          </div>
        )}

        {/* Outros projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <CardProjetos key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
