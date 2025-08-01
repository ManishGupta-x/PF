"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StartScreen from "@/components/StartScreen";
import HourglassLoader from "@/components/HourGlassLoader";
import FloatingCoffeeButton from "@/components/FloatingCoffeeButton";
import TerminalModal from "@/components/TerminalModal";
import FloatingResume from "./FloatingResume";

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

export default function ClientWrapper({ children }) {
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

    // Track page views for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  const handleStartScreenComplete = () => {
    setCookie('portfolio_visited', 'true', 1);
    setShowStartScreen(false);
    setShowMainContent(true);
    
    // Track start screen completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'start_screen_completed', {
        event_category: 'engagement',
        event_label: 'first_visit'
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HourglassLoader />
      </div>
    );
  }

  return (
    <>
     {
      !showStartScreen && (
        <>
          <FloatingCoffeeButton />
          <TerminalModal />
          <FloatingResume />
        </>
      )
     }
      
      {showStartScreen && (
        <StartScreen onComplete={handleStartScreenComplete} />
      )}
      
      {/* Header with transition */}
      <div className={`transition-opacity duration-1000 ${
        showMainContent 
          ? 'opacity-100' 
          : 'opacity-0'
      }`}>
        <Header />
      </div>
      
      {/* Main content area */}
      <div className={`min-h-screen flex flex-col pt-16 transition-all duration-1000 ${
        showMainContent 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-1000 ${
          showMainContent 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          {children}
        </main>
        
        {/* Footer with transition */}
        <div className={`transition-all duration-1000 ${
          showMainContent 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <Footer />
        </div>
      </div>
    </>
  );
}