import React from "react";
import { FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";
export const Footer = () => {
    return (
        <div className="relative md:absolute bottom-1 left-0 right-0 flex justify-center items-center h-12 w-64 mx-auto bg-[#1E2021] rounded-3xl transition-all duration-300 ease-in-out hover:shadow-md">
            <div className="flex items-center gap-8">
                <a href="https://github.com/wallacemt" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-8 h-8 invert hover:scale-110 transition-transform duration-500" />
                </a>

                <a href="https://discord.com/users/715397662479745044" target="_blank" rel="noopener noreferrer">
                    <FaDiscord className="w-8 h-8 hover:scale-110 transition-transform duration-500 invert" />
                </a>

                <a href="https://www.linkedin.com/in/wallace-santanak0" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-8 h-8 invert hover:scale-110 transition-transform duration-500" />
                </a>
            </div>
        </div>
    );
}

