"use client";
import dynamic from "next/dynamic";

const DarkVeil = dynamic(() => import("./DarkVeil"), { ssr: false });

export default DarkVeil;
