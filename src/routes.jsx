import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Home } from "./screens/Home";
import { Container } from "./components/Container";
import { Sobre } from "./components/Sobre";
import { Projetos } from "./components/Projetos";
import { Formacao } from "./components/Formacao";
import { Habilidades } from "./components/Habilidades";
import { ServicesPage } from "./components/ServicesPage";
import { NotFoundPage } from "./components/NotFoundPage";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Container children={<Sobre />} />} />
        <Route path="/projetos" element={<Container children={<Projetos />} />} />
        <Route path="/formacao" element={<Container children={<Formacao />} />} />
        <Route path="/habilidades" element={<Container children={<Habilidades />} />} />
        <Route path="/servicos" element={<Container children={<ServicesPage />} />} />
        <Route path="*" element={<Container children={<NotFoundPage />} />} />
      </Routes>
    </BrowserRouter>
  );
};
