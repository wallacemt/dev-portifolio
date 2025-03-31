import React from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import {Apresentacao} from "../Apresentacao";

export const Home = () => {
  document.title = "Wallace Santana | Dev FullStack"
  return (
    <>
        <Apresentacao/>
    </>
  );
};

