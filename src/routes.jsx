import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import { Container } from "./components/Container";
import { NotFoundPage } from "./components/NotFoundPage";
import { SPA } from "./screens/SPA";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SPA />} />
        <Route path="/en" element={<SPA lenguage="en" />} />
        <Route path="*" element={<Container children={<NotFoundPage />} />} />
      </Routes>
    </BrowserRouter>
  );
};
