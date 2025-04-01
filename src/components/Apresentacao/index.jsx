import React, { useState, useEffect } from "react";
import anime from "animejs";
import { FaGlobe, FaHandshake, FaCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Apresentacao = () => {
  const { t, i18n } = useTranslation();

  const animatedText = [
    { text: t("apresentacao.ola"), icon: <FaGlobe className="inline ml-2" /> },
    { text: t("apresentacao.eu"), icon: <FaCode className="inline ml-2" /> },
    { text: t("apresentacao.portfolio") },
    { text: t("apresentacao.bemvindo"), icon: <FaHandshake className="inline ml-2" /> },
  ];
  const [currentText, setCurrentText] = useState("");
  const [currentIcon, setCurrentIcon] = useState(null);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typeText = () => {
      setCurrentText("");
      setCurrentIcon(animatedText[index].icon);
      const text = animatedText[index].text;
      anime({
        targets: "#animated-text",
        duration: text.length * 200,
        easing: "easeInOutCubic",
        update: (anim) => {
          const progress = Math.floor((anim.progress / 100) * text.length);
          setCurrentText(text.slice(0, progress));
        },
        complete: () => {
          setTimeout(() => {
            index = (index + 1) % animatedText.length;
            typeText();
          }, 3500);
        },
      });
    };

    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    typeText();

    return () => {
      clearInterval(cursorBlink);
      i18n.on("languageChanged", () => {
        animatedText.forEach((item) => {
          item.text = t(item.text);
        });
        typeText();
      });
    };
  }, []);

  
  
  return (
    <section className="h-screen w-auto flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 shadow-sm ">
      <p
        id="animated-subtitle"
        className="text-6xl font-principal font-extrabold text-center sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex items-center"
      >
        <span id="animated-text" className="relative text-neutral90 dark:text-neutral10 ">
          {currentText}
          <span className="ml-2 text-neutral90 dark:text-neutral10">{currentIcon}</span>
          <span className={showCursor ? "opacity-100" : "opacity-0"}> |</span>
        </span>
      </p>
    </section>
  );
};
