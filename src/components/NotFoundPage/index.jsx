import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NotFoundPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen p-6 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="./images/404.svg"
        alt="404 - Página Não Encontrada"
        className="w-full max-w-md h-auto mb-6"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      <motion.h2
        className="text-3xl font-principal text-neutral90 dark:text-neutral10 font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! Página não encontrada
      </motion.h2>

      <motion.p
        className="text-neutral10 font-secundaria mt-2 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Parece que você se perdeu... Mas não se preocupe, vou te ajudar a voltar!
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link to="/" className="px-6 py-3 bg-indigo-800 text-white rounded-lg shadow-md hover:bg-indigo-900 transition">
          Voltar para a Home
        </Link>
      </motion.div>
    </motion.div>
  );
};
