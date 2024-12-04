import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [handleTheme, setHandleTheme] = useState(false);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleTheme = () => {
        setHandleTheme(!handleTheme);
    };
    const handleMenuClick = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <div className="p-4">
            <div className="w-full h-20 bg-[#1E2021] rounded-3xl shadow-2xl m-auto">
                <nav className="flex items-center justify-between h-full px-6 pr-24">
                    <div onClick={() => navigate("/")}>
                        <img
                            src="/images/logo.svg"
                            alt="Logo"
                            className="w-20 h-16 absolute top-6 cursor-pointer"
                            style={{zIndex: 99999999}}
                        />
                    </div>

                    <ul className="hidden lg:flex items-center space-x-6">
                        {[
                            "Sobre",
                            "Habilidades",
                            "Projetos",
                            "Formação",
                            "Contato",
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="px-3 py-2 text-2xl font-bold text-DarkA4 cursor-pointer 
                  transition-all duration-300 ease-in-out hover:text-DarkP hover:scale-110"
                                onClick={() =>
                                    handleMenuClick(`/${item.toLowerCase()}`)
                                }
                            >
                                {item}
                            </li>
                        ))}
                        <li className="px-3 py-2 text-2xl font-bold text-DarkA4 cursor-pointer bg-DarkP rounded-sm hover:bg-DarkA4 hover:text-DarkP">
                            EN
                        </li>

                        <li
                            className="px-4 py-3 text-2xl cursor-pointer transition-colors bg-DarkP rounded-sm duration-300 ease-in-out hover:text-DarkA2"
                            aria-label="Toggle Theme Mode"
                            onClick={toggleTheme}
                        >
                            {handleTheme ? (
                                <FaMoon className="text-2xl text-DarkA2" />
                            ) : (
                                <FaSun className="text-2xl" />
                            )}
                        </li>
                    </ul>

                    {/* Menu hamburguer para mobile */}
                    <div className="block lg:hidden">
                        <input id="toggleChecker" type="checkbox" className="hidden" />
                        <label
                            htmlFor="toggleChecker"
                            className="cursor-pointer flex flex-col gap-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{ position: "fixed", zIndex: 9999, right: "7em", top: "2.5em" }}
                        >
                            <div className={`h-1 w-8 bg-DarkA2 transition-transform ${menuOpen && "rotate-45 translate-y-2"}`}></div>
                            <div className={`h-1 w-8 bg-DarkP2 transition-transform ${menuOpen && "hidden"}`}></div>
                            <div className={`h-1 w-8 bg-DarkA2 transition-transform ${menuOpen && "-rotate-45 -translate-y-1"}`}></div>
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
                            {[
                                "Sobre",
                                "Habilidades",
                                "Projetos",
                                "Formação",
                                "Contato",
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    className="menu-item text-DarkA3 hover:bg-DarkA4 hover:text-DarkP transition-transform duration-300 cursor-pointer"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleMenuClick(`/${item.toLowerCase()}`);
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="text-lg font-bold text-DarkA3 hover:text-DarkP transition duration-300 rounded-full p-2 hover:scale-150"
                            >
                                {handleTheme ? <FaMoon size={25} className="m-auto"/> : <FaSun size={25} className="m-auto"/>}
                            </button>
                         
                            <button
                                onClick={() => handleMenuClick("/en")}
                                className="text-lg font-bold text-DarkA3  transition duration-300 rounded-full p-2 hover:scale-150"
                            >
                                EN
                            </button>
                        </Menu>
                    </div>
                </nav>
            </div>
        </div>
    );
};
