import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const SwitchTheme = ({toggleTheme}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const root = document.getElementById("root");

   useEffect(() => {
    root.style.transition = "background 1s ease-in-out";
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        root.style.background = "url('/images/dark-gradient.jpg')"
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        root.style.background = "url('/images/light-gradient.jpg')"
        localStorage.setItem("theme", "light");
      }
      root.style.backgroundRepeat = "no-repeat";
        root.style.backgroundSize = "cover";
        root.style.backgroundPosition = "center";
        root.style.backgroundAttachment = "fixed";
        toggleTheme();
    }, [isDarkMode]);
  return (
    <StyledWrapper>
      <label htmlFor="switch" className="switch">
        <input
          id="switch"
          type="checkbox"
          checked={isDarkMode} // Marca o switch de acordo com o estado
          onChange={() => setIsDarkMode(!isDarkMode)} // Alterna o tema
        />
        <span className="slider" />
        <span className="decoration" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* O restante do código do switch permanece igual */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    cursor: pointer;
  }

  /* Esconde o checkbox padrão */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* O slider */
  .slider {
    --background: #20262c;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow: inset 8px -4px 0px 0px #ececd9, -4px 1px 4px 0px #dadada;
    background: var(--background);
    transition: 0.5s;
  }

  .decoration {
    position: absolute;
    content: "";
    height: 2px;
    width: 2px;
    border-radius: 50%;
    right: 20%;
    top: 15%;
    background: #e5f041e6;
    backdrop-filter: blur(10px);
    transition: all 0.5s;
    box-shadow: -7px 10px 0 #e5f041e6, 8px 15px 0 #e5f041e6, -17px 1px 0 #e5f041e6, -20px 10px 0 #e5f041e6,
      -7px 23px 0 #e5f041e6, -15px 25px 0 #e5f041e6;
  }

  input:checked ~ .decoration {
    transform: translateX(-20px);
    width: 10px;
    height: 10px;
    background: white;
    box-shadow: -12px 0 0 white, -6px 0 0 1.6px white, 5px 15px 0 1px white, 1px 17px 0 white, 10px 17px 0 white;
  }

  input:checked + .slider {
    background-color: #5494de;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px #efdf2b, 0 0 10px 0px #efdf2b;
  }

  /* Adiciona um tema escuro ao body */
  body.dark-mode {
    background-color: #121212;
    color: white;
  }
`;
