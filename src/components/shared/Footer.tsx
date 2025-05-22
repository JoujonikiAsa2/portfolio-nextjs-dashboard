'use client'
import { useAppSelector } from '@/lib/hook';
import React from 'react';

const Footer = () => {
     const theme = useAppSelector((state) => state.theme.theme);
    return (
        <div className={`flex justify-center items-center h-16 max-w-7xl mx-auto z-30 text-xs ${theme === 'dark' ? 'text-white' : ""}`}>
          &copy; 2025 Joujoniki Asa Roy. All rights reserved.
        </div>
    );
};

export default Footer;