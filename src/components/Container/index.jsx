import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import 'aos/dist/aos.css';

export const Container = ({ children }) => {
    document.title = `${location.pathname.split("/")[1].toUpperCase()} | Dev FullStack`;
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-auto" >
                <div className="w-full max-w-5xl h-full mx-auto">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
} 

