import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../Loading";

export const Formacao = () => {
  const [formacoes, setFormacoes] = useState([]);
  const [typedTexts, setTypedTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    const fetchFormacoes = async () => {
      try {
        const { data: formacoesData } = await axios.get("/database/formacao.json");
        setFormacoes(formacoesData);

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

    fetchFormacoes();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center p-8 mb-12">
      <div className="flex flex-wrap justify-center gap-6 w-full select-none">
        {formacoes.map((formacao, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative w-80 h-[380px] cursor-pointer"
            onClick={() => setFlipped((prev) => ({ ...prev, [index]: !prev[index] }))}
          >
            <motion.div
              className="absolute w-full h-full rounded-xl shadow-lg bg-white dark:bg-neutral90 transition-transform duration-500 border border-DarkA1"
              animate={{ rotateY: flipped[index] ? 180 : 0 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Frente do Card */}
              <div className="absolute w-full h-full flex flex-col items-center justify-center p-6">
                <img
                  src={formacao.imagePreview}
                  alt={formacao.nome}
                  className="w-40 h-40 border-DarkA2 object-contain rounded-full border-2"
                />
                <h3 className="text-xl font-semibold text-primary80 mt-4 text-center font-principal">
                  {typedTexts[index] || ""}
                </h3>
                <p className="text-md text-gray-600 dark:text-neutral10 underline">{formacao.instituicao}</p>
                <p className="text-sm text-DarkA3 mt-2">
                  {formacao.dataInicio} - {formacao.dataTermino}
                </p>
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
    </div>
  );
};
