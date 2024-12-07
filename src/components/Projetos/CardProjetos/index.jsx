import { RepoButton } from "../RepoButton";
import { DepoButton } from "../DepoButton";

export const CardProjetos = ({ project }) => {
    return (
        <div className="bg-DarkP2 rounded-lg shadow-2xl p-6 transition-transform duration-200 hover:scale-105">
            {/* Título */}
            <h3 className="text-2xl text-center mb-6 font-bold text-gray-800 font-principal">
                {project.nome}
            </h3>

            {/* Imagem de pré-visualização */}
            <div className="overflow-hidden rounded-lg mb-6">
                <img
                    src={project.previewImage}
                    alt={`Preview do projeto ${project.nome}`}
                    className="w-full h-60 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                />
            </div>

            {/* Descrição */}
            <p className="text-gray-600 mb-4">{project.desc}</p>

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

            {/* Botões */}
            <div className="flex justify-between items-center gap-4">
                <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <RepoButton/>
                </a>
                <a
                    href={project.deployment}
                    target="_blank"
                    rel="noopener noreferrer"
                 >
                    <DepoButton/>
                </a>
            </div>
        </div>
    );
};
