"use client";
import dynamic from "next/dynamic";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

export default Silk;
