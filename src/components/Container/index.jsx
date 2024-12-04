import React from 'react'
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';


export const Container = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-auto">
                <div className="w-full max-w-5xl h-[70vh] mx-auto bg-DarkA3 opacity-30">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
} 

