import { Footer } from "../../components/Footer";
import { Formacao } from "../../components/Formacao";
import { Habilidades } from "../../components/Habilidades";
import { Home } from "../../components/Home";
import { Navbar } from "../../components/Navbar";
import { Projetos } from "../../components/Projetos";
import { ServicesPage } from "../../components/ServicesPage";
import { Sobre } from "../../components/Sobre";

export const SPA = () => {
    const screens = [<Home />, <Sobre />, <Habilidades />, <Projetos />,<ServicesPage />, <Formacao /> ]
    return (
        <>
            <Navbar />
            <div className="flex flex-col overflow-y-auto p-4">
                {screens.map((screen, index) => (
                    <div key={index} className={`h-full p-2 ${index !== screens.length - 1 ? "border-b-4" : "mb-0"}  mt-12 border-neutral90 dark:border-neutral10`}>
                        {screen}
                        {index === screens.length - 1 && 
                         <p className="text-center text-neutral10 h-16">
                         Copyright &copy; {new Date().getFullYear()} <a href="https://github.com/wallacemt" className="text-Destaque font-principal font-bold hover:underline" target="_blank">Wallace Santana</a> Todos os direitos reservados.
                     </p>}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

