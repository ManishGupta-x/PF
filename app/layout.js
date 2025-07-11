"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StartScreen from "@/components/StartScreen";
import HourglassLoader from "@/components/HourGlassLoader";
import FloatingCoffeeButton from "@/components/FloatingCoffeeButton";
import TerminalModal from "@/components/TerminalModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


const setCookie = (name, value, days = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function RootLayout({ children }) {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const hasVisited = getCookie('portfolio_visited');
    
    if (hasVisited) {
      
      setShowStartScreen(false);
      setShowMainContent(true);
      setIsLoading(false);
    } else {
      
      setShowStartScreen(true);
      setIsLoading(false);
    }
  }, []);

  const handleStartScreenComplete = () => {
    
    setCookie('portfolio_visited', 'true', 1);
    setShowStartScreen(false);
    setShowMainContent(true);
  };

  
  if (isLoading) {
    return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ede0d4" />
          <link rel="icon" href="/favicon.ico" />
          <title>Manish Gupta - Portfolio</title>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Geo:ital@0;1&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@200..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Signika:wght@300..700&family=Silkscreen:wght@400;700&display=swap');`}
          </style>
        </head>
        <body className="antialiased bg-background text-foreground font-sans">
          <div className="min-h-screen flex items-center justify-center">
            <HourglassLoader />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ede0d4" />
        <link rel="icon" href="/favicon.ico" />
        <title>Manish Gupta - Portfolio</title>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Geo:ital@0;1&family=Iceland&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@200..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Signika:wght@300..700&family=Silkscreen:wght@400;700&display=swap');`}
        </style>
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        <FloatingCoffeeButton />
        <TerminalModal />
        
        {showStartScreen && (
          <StartScreen onComplete={handleStartScreenComplete} />
        )}
        
        
        <div className={`transition-opacity duration-1000 ${
          showMainContent 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}>
          <Header />
        </div>
        
        
        <div className={`min-h-screen flex flex-col pt-16 transition-all duration-1000 ${
          showMainContent 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          
          
          <main className={`flex-1 transition-all duration-1000 ${
            showMainContent 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            {children}
          </main>
          
          
          <div className={`transition-all duration-1000 ${
            showMainContent 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}