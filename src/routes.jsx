import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Home } from "./components/Home";
import { Container } from "./components/Container";
import { Sobre } from "./components/Sobre";
import { Projetos } from "./components/Projetos";
import { Formacao } from "./components/Formacao";
import { Habilidades } from "./components/Habilidades";
import { ServicesPage } from "./components/ServicesPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { SPA } from "./screens/SPA";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SPA/>} />
        <Route path="*" element={<Container children={<NotFoundPage />} />} />
      </Routes>
    </BrowserRouter>
  );
};
