import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Home } from "./screens/Home";
import { Container } from "./components/Container";
import { Sobre } from "./components/Sobre";
import { Projetos } from "./components/Projetos";
import { Formacao } from "./components/Formacao";
import { Contato } from "./components/Contato";
import { Habilidades } from "./components/Habilidades";


export const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sobre" element={<Container children={<Sobre />}/>}/>
                <Route path="/projetos" element={<Container children={<Projetos />}/>}/>
                <Route path="/formação" element={<Container children={<Formacao />}/>}/>
                <Route path="/contato" element={<Container children={<Contato />}/>}/>
                <Route path="/habilidades" element={<Container children={<Habilidades />}/>}/>     
            </Routes>
        </BrowserRouter>
    );
};
