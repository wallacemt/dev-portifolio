import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { SwitchTheme } from "./SwitchTheme";
import Scroll from "locomotive-scroll";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [handleTheme, setHandleTheme] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setDark] = useState(false);
  const [scroll, setScroll] = useState(null);
  const [showDp, setShowDp] = useState(false);

  const toggleTheme = () => {
    setHandleTheme(!handleTheme);
  };

  const menuItens = [
    {
      name: t("menu.sobre"), 
      path: "sobre",
    },
    {
      name: t("menu.habilidades"),
      path: "habilidades",
    },
    {
      name: t("menu.projetos"),
      path: "projetos",
    },
    {
      name: t("menu.servicos"),
      path: "servicos",
    },
    {
      name: t("menu.formacao"),
      path: "formacao",
    },
  ];

  useEffect(() => {
    const el = document.querySelector("[data-scroll-container]");
    if (!el) return;

    const scrollInstance = new Scroll({
      el,
      smooth: true,
    });

    setScroll(scrollInstance);
    return () => {
      scrollInstance.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, [handleTheme]);

  
  const changeLanguage = (lng) => {
    localStorage.setItem("leng", lng)
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-0 xl:p-4 fixed top-0 left-0 right-0 z-50">
      <div
        className={`w-[100%] xl:w-[75%] h-20 transition-all duration-300 ${
          scrollY > 0 ? " bg-neutral90 dark:bg-white" : "bg-[#1e202179] dark:bg-[#bdbdbd79]"
        } rounded-3xl shadow-2xl m-auto`}
      >
        <nav className="flex items-center justify-between h-full px-6 pr-24">
          <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="w-20 h-16 relative top-0 cursor-pointer"
              style={{
                zIndex: 9999,
                transform: menuOpen ? "rotate(360deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(360deg)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = menuOpen ? "rotate(360deg)" : "rotate(0deg)")}
            />
          </div>

          <ul className="hidden lg:flex items-center space-x-6">
            {menuItens.map((item, index) => (
              <li
                key={index}
                className={`px-3 py-2 text-2xl md:text-[1.3rem] font-bold cursor-pointer 
                  transition-all duration-300 ease-in-out hover:scale-110 text-neutral10 dark:text-neutral90 hover:underline`}
                onClick={() => {
                  const section = document.getElementById(item.path);
                  if (section) {
                    window.scrollTo({
                      top: section.offsetTop - 200,
                      behavior: "smooth",
                    });
                    navigate(`#${item.path}`);
                  }
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4" style={{ zIndex: 9990 }}>
            {/* Dropdown de idiomas */}
            <div className="relative">
              <div
                className="text-Destaque hover:bg-neutral90 dark:hover:bg-DarkP px-2 py-4 text-1xl md:text-[1.1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 rounded-full text-center"
                onClick={() => changeLanguage(i18n.language === "en" ? "pt" : "en")}
              >
                {i18n.language.toUpperCase()}
              </div>
              
            </div>

            <SwitchTheme toggleTheme={toggleTheme} />
          </div>

          {/* Menu hamburguer para mobile */}
          <div className="block lg:hidden">
            <input id="toggleChecker" type="checkbox" className="hidden" />
            <label
              htmlFor="toggleChecker"
              className="cursor-pointer flex flex-col gap-2  p-2 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ position: "relative", zIndex: 9999, left: "100%", top: "0" }}
            >
              <div
                className={`h-1 w-8 bg-Destaque transition-transform ${menuOpen && "rotate-45 translate-y-2"}`}
              ></div>
              <div className={`h-1 w-8 bg-DarkA1 transition-transform ${menuOpen && "hidden"}`}></div>
              <div
                className={`h-1 w-8 bg-Destaque transition-transform ${menuOpen && "-rotate-45 -translate-y-1"}`}
              ></div>
            </label>
            <Menu
              right
              isOpen={menuOpen}
              burgerButtonClassName="text-branco"
              menuClassName="bg-dark bg-opacity-50"
              overlayClassName="bg-dark bg-opacity-50"
              styles={{
                bmBurgerButton: {
                  display: "none",
                },
                bmMenuWrap: {
                  position: "fixed",
                  height: "100%",
                  width: "100%",
                  top: "0",
                },
                bmMenu: {
                  background: `${isDark ? "#E5E5E5" : "#1A1A1A"}`,
                  padding: "4em 2em",
                  fontSize: "1.2em",
                  overflow: "hidden",
                },
                bmItemList: {
                  display: "flex",

                  flexDirection: "column",
                  marginTop: "2em",
                  gap: "20px",
                },
                bmItem: {
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  padding: "0.5rem 0",
                  fontWeight: "bold",
                  borderRadius: "0.25rem",
                  transition: "color 0.3s, background 0.3s",
                  borderBottom: "2px solid #AD343E",
                  textTransform: "uppercase",
                },
              }}
            >
              {menuItens.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMenuOpen(false);
                    const section = document.getElementById(item.path);
                    if (section) {
                      window.scrollTo({
                        top: section.offsetTop - 100,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`menu-item transition-transform duration-300 cursor-pointer hover:scale-110 text-neutral10 dark:text-neutral90`}
                >
                  {item.name}
                </button>
              ))}
            </Menu>
          </div>
        </nav>
      </div>
    </div>
  );
};
