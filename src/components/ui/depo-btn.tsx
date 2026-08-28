"use client";
import React from "react";
import styled from "styled-components";

interface DepoButtonProps {
  message: string;
  bg?: string;
  hover?: string;
  onClick?: () => void;
}
export const DepoButton = ({
  message,
  bg = "var(--textura-roxo-5-hex)",
  hover = "var(--textura-roxo-2-hex)",
  onClick,
}: DepoButtonProps) => {
  const StyledWrapper = styled.div`
    .Btn-Container {
      display: flex;
      width: 100%;
      height: fit-content;
      background-color: ${bg};
      border-radius: 40px;
      justify-content: space-between;
      align-items: center;
      border: none;
      transition-duration: 1.5s;
      cursor: pointer;
    }
    .Btn-Container:hover {
      transition-duration: 1.5s;
      background-color: ${hover};
    }
    .icon-Container {
      width: 60px;
      height: 45px;
      background-color: var(--textura-roxo-1-hex);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 3px solid var(--textura-roxo-3-hex);
    }
    .text {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--foreground);
      font-weight: 400;
      font-size: 1em;
      letter-spacing: 1.2px;
    }
    .icon-Container svg {
      transition-duration: 1.5s;
    }
    .Btn-Container:hover .icon-Container svg {
      transition-duration: 1.5s;
      animation: arrow 1s linear infinite;
    }
    @keyframes arrow {
      0% {
        opacity: 0;
        margin-left: 0px;
      }
      100% {
        opacity: 1;
        margin-left: 10px;
      }
    }
  `;
  return (
    <StyledWrapper>
      <button className="Btn-Container" onClick={onClick}>
        <span className="text font-principal">{message}</span>
        <span className="icon-Container">
          <svg width={16} height={19} viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.61321" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="9.5" r="1.5" fill="black" />
            <circle cx="13.9811" cy="9.5" r="1.5" fill="black" />
            <circle cx="5.73583" cy="13.4434" r="1.5" fill="black" />
            <circle cx="9.85851" cy="13.4434" r="1.5" fill="black" />
            <circle cx="1.61321" cy="17.3868" r="1.5" fill="black" />
            <circle cx="5.73583" cy="17.3868" r="1.5" fill="black" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};
