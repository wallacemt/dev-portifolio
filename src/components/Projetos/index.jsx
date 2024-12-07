import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import {CardProjetos} from "./CardProjetos";

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

  // Enquanto estiver carregando, exibe o componente Loading
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-trasparent mb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <CardProjetos key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
