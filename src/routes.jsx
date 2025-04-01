import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Container } from "./components/Container";
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
