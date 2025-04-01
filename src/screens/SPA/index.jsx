import { useTranslation } from "react-i18next";
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
    const {t}=  useTranslation();
    return (
        <>
            <Navbar />
            <div className="flex flex-col overflow-y-auto p-4">
                {screens.map((screen, index) => (
                    <div key={index} className={`h-full p-2 ${index !== screens.length - 1 ? "border-b-4" : "mb-0"}  mt-12 border-neutral90 dark:border-neutral10`}>
                        {screen}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

