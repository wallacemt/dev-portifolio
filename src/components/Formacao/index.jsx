import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../Loading";
import Aos from "aos";
import { useTranslation } from "react-i18next";

export const Formacao = () => {
  const [formacoes, setFormacoes] = useState([]);
  const [typedTexts, setTypedTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});
  const { t, i18n } = useTranslation();

  const fetchFormacoes = async () => {
    try {
      const { data: formacoesData } = await axios.get("/database/formacao.json");
      setFormacoes(formacoesData);

      formacoesData.forEach((item, index) => {
        item.descricao = t(`formacao.${item.nome.toLowerCase().replace(/\s+/g, "_")}.description`);
        item.nome = t(`formacao.${item.nome.toLowerCase().replace(/\s+/g, "_")}.name`);
      });

      formacoesData.forEach((item, index) => {
        let text = "";
        let i = 0;
        const interval = setInterval(() => {
          text += item.nome[i];
          setTypedTexts((prev) => {
            const newArr = [...prev];
            newArr[index] = text;
            return newArr;
          });

          if (++i === item.nome.length) clearInterval(interval);
        }, 50);
      });
    } catch (error) {
      console.error("Erro ao carregar as formações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormacoes();
  }, []);

  useEffect(() => {
    fetchFormacoes();
  }, [i18n.language]);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center p-8 mb-12" id="formacao">
      <div className="flex flex-wrap justify-center gap-6 w-full select-none relative">

        <div className=" absolute top-[-4rem] left-1/2 transform -translate-x-1/2 text-center ">
          <h2 className="font-principal text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral10">
            Formações
          </h2>
          <div className="mt-2 w-20 h-1 bg-primary80 mx-auto rounded-full"></div>
        </div>

        {formacoes.map((formacao, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative w-80 mt-10 h-[380px] cursor-pointer"
            onClick={() => setFlipped((prev) => ({ ...prev, [index]: !prev[index] }))}
          >
            <motion.div
              className="absolute w-full h-full rounded-xl shadow-lg bg-neutral90 dark:bg-neutral10 transition-transform duration-500 border border-DarkA1"
              animate={{ rotateY: flipped[index] ? 180 : 0 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Frente do Card */}
              <div
                className="absolute w-full h-full flex flex-col items-center justify-center p-6"
                data-aos="fade-right"
              >
                <img
                  src={formacao.imagePreview}
                  alt={formacao.nome}
                  className="w-40 h-40 border-DarkA2 object-contain rounded-full border-2"
                />
                <h3 className="text-xl font-semibold text-primary80 mt-4 text-center font-principal">
                  {typedTexts[index] || ""}
                </h3>
                <p className="text-md font-principal font-bold text-neutral10 dark:text-neutral90">
                  {formacao.instituicao}
                </p>
                <p className="text-sm text-neutral10 dark:text-neutral90 mt-2">
                  {formacao.dataInicio} - {formacao.dataTermino}
                </p>
                <div className="text-md mt-3 font-light bg-neutral10 font-principal dark:bg-neutral90 text-primary90 absolute p-1 rounded-lg top-0 right-2 first-letter:uppercase">
                  {formacao.tipo}
                </div>
              </div>

              {/* Verso do Card */}
              <motion.div
                className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-800 dark:bg-neutral80 text-white rounded-xl p-6"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <img
                  src={formacao.imagePreview}
                  alt={formacao.nome}
                  className="w-40 h-40 border-neutral90 object-contain rounded-full border-2"
                />
                <p className="text-center text-lg leading-relaxed">{formacao.descricao}</p>
                <p className="text-xs mt-3 font-light">⏳ {formacao.cargahoraria} horas</p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <footer className="text-center text-neutral10 h-16 mt-12">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/wallacemt"
          className="text-Destaque font-principal font-bold hover:underline"
          target="_blank"
        >
          Wallace Santana
        </a>{" "}
        {t(`copy`)}
      </footer>
    </div>
  );
};
