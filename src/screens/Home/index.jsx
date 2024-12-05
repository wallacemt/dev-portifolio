import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import {Apresentacao} from "../../components/Apresentacao";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Apresentacao/>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </>
  );
};

