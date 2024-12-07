import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";
import { useNavigate, useLocation } from "react-router-dom";
import {SwitchTheme} from "./SwitchTheme";
export const Navbar = () => {
    const [handleTheme, setHandleTheme] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleTheme = () => {
        setHandleTheme(!handleTheme);
    };
    const handleMenuClick = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const menuItens = [
        {
            name: "Sobre",
            path: "/sobre",
        },
        {
            name: "Habilidades",
            path: "/habilidades",
        },
        {
            name: "Projetos",
            path: "/projetos",
        },
        {
            name: "Formação",
            path: "/formacao",
        },
        {
            name: "Contato",
            path: "/contato",
        },
    ]
    return (
        <div className="p-0 xl:p-4">
            <div className="w-[100%] xl:w-[75%] h-20 bg-[#1e202179] rounded-3xl shadow-2xl m-auto">
                <nav className="flex items-center justify-between h-full px-6 pr-24">
                    <div onClick={() => navigate("/")}>
                        <img
                            src="/images/logo.svg"
                            alt="Logo"
                            className="w-20 h-16 relative top-0 cursor-pointer"
                            style={{
                                zIndex: 9999,
                                transform: menuOpen ? "rotate(360deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "rotate(580deg)",
                                },
                            }}
                        />
                    </div>

                    <ul className="hidden lg:flex items-center space-x-6">
                        {menuItens.map((item, index) => (
                            <li
                                key={index}
                                className={`px-3 py-2 text-2xl md:text-[1.3rem] font-bold cursor-pointer 
                  transition-all duration-300 ease-in-out hover:scale-110 ${
                                    location.pathname === item.path
                                        ? "text-Destaque underline underline-offset-4"
                                        : "text-DarkA4 hover:text-DarkP"
                                }`}
                                onClick={() =>
                                    handleMenuClick(item.path)
                                }
                            >
                                {item.name}
                            </li>
                        ))}
                       
                    </ul>
                    <div className="flex items-center space-x-4" style={{zIndex: 9990}}>
                        <div className="text-Destaque hover:bg-DarkP px-2 py-4 text-1xl md:text-[1.1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 rounded-full text-center">
                            EN
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
                            <div className={`h-1 w-8 bg-Destaque transition-transform ${menuOpen && "rotate-45 translate-y-2"}`}></div>
                            <div className={`h-1 w-8 bg-DarkA1 transition-transform ${menuOpen && "hidden"}`}></div>
                            <div className={`h-1 w-8 bg-Destaque transition-transform ${menuOpen && "-rotate-45 -translate-y-1"}`}></div>
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
                                    background: "#182226",
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
                                    handleMenuClick(item.path);
                                }}
                                className={`menu-item transition-transform duration-300 cursor-pointer ${
                                    location.pathname === item.path
                                        ? "text-Destaque underline underline-offset-4"
                                        : "text-DarkA3 hover:bg-DarkA4 hover:text-DarkP"
                                }`}
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
