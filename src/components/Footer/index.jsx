import React from "react";
import { FaGithub, FaDiscord, FaLinkedin, FaWhatsapp } from "react-icons/fa";
export const Footer = () => {
    return (
        <footer className="fixed bottom-1 z-40 left-0 right-0 flex justify-center items-center h-12 w-64 mx-auto bg-[#1E2021] dark:bg-DarkP2 rounded-3xl transition-all duration-300 ease-in-out hover:shadow-md">
            <div className="flex items-center gap-8">
                <a href="https://github.com/wallacemt" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-8 h-8 invert dark:filter-none hover:scale-110 transition-transform duration-500 "  />
                </a>

                <a href="https://discord.com/users/715397662479745044" target="_blank" rel="noopener noreferrer">
                    <FaDiscord className="w-8 h-8 hover:scale-110 transition-transform duration-500 invert dark:filter-none" />
                </a>

                <a href="https://www.linkedin.com/in/wallace-santanak0" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-8 h-8 invert dark:filter-none hover:scale-110 transition-transform duration-500" />
                </a>

                <a href="https://wa.me/5571992581081?text=Ol%C3%A1%2C+gostaria+de+falar+com+voc%C3%AA+sobre+um+projeto!" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="w-8 h-8 invert dark:filter-none hover:scale-110 transition-transform duration-500" />
                </a>
            </div>
        </footer>
    );
}

