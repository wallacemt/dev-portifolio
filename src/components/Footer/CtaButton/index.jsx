import React from "react";
import styled from "styled-components";
import { BsFiletypePdf } from "react-icons/bs";
import { useTranslation } from "react-i18next";
export const CtaButton = () => {
    const {t} = useTranslation();
    return (
        <StyledWrapper>
            <div className="button-borders">
                <button className="primary-button flex items-center"
                    onClick={() => window.open("/curriculo.pdf", "_blank")}
                >
                    <BsFiletypePdf color="#fff" className="hover:text-white mr-2"/>
                    {t('sobre.ctaBotao')}
                </button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .primary-button {
        font-family: "Manrope", sans-serif;
        text-transform: uppercase;
        color: white;
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 0.05rem;
        border: 1px solid #0e1822;
        padding: 1rem 4.1rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cdefs%3E%3Cstyle%3E .shape %7B fill: %23FF4655 /* fill: %230E1822; */ %7D %3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpolygon class='shape' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
        background-color: #0e1822;
        background-size: 200%;
        background-position: 200%;
        background-repeat: no-repeat;
        transition: 0.3s ease-in-out;
        transition-property: background-position, border, color;
        position: relative;
        z-index: 1;
    }

    .primary-button:hover {
        border: 1px solid #FF563C;
        color: white;
        background-position: 40%;
    }

    .primary-button:before {
        content: "";
        position: absolute;
        background-color: #0e1822;
        width: 0.2rem;
        height: 0.2rem;
        top: -1px;
        left: -1px;
        transition: background-color 0.15s ease-in-out;
    }

    .primary-button:hover:before {
        background-color: white;
    }

    .primary-button:after {
        background-color: white;
    }

    .primary-button svg {
        width: 1.5rem;
        height: 1.5rem;
        
    }

    .button-borders {
        position: relative;
        width: fit-content;
        height: fit-content;
    }

    .button-borders:before {
        content: "";
        position: absolute;
        width: calc(100% + 0.5em);
        height: 50%;
        left: -0.3em;
        top: -0.3em;
        border: 1px solid #0e1822;
        border-bottom: 0px;
        /* opacity: 0.3; */
    }

    .button-borders:after {
        content: "";
        position: absolute;
        width: calc(100% + 0.5em);
        height: 50%;
        left: -0.3em;
        bottom: -0.3em;
        border: 1px solid #0e1822;
        border-top: 0px;
        /* opacity: 0.3; */
        z-index: 0;
    }

    .shape {
        fill: #fff;
    }
`;

