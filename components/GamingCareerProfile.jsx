"use client";
import React from 'react'
import { useState } from 'react'

const GamingCareerSection = () => {
  const [isHovered, setIsHovered] = useState(false)

  const handleRedirect = () => {
    window.location.href = '/GamingCareer'
  }

  return (
    <section className="relative py-16 overflow-hidden cursor-pointer mb-8 sm:mb-12 md:mb-16 lg:mb-20" onClick={handleRedirect}>
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-brown via-accent-brown to-brown"></div>
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-8 w-8 h-8 border-2 border-light-tan rotate-45"></div>
        <div className="absolute top-8 right-12 w-6 h-6 border-2 border-cream rotate-12"></div>
        <div className="absolute bottom-6 left-16 w-4 h-4 bg-light-tan rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-10 h-10 border-2 border-medium-tan rounded-full"></div>
        <div className="absolute top-12 left-1/4 w-3 h-3 bg-cream rotate-45"></div>
        <div className="absolute bottom-12 right-1/3 w-5 h-5 border border-light-tan rotate-12"></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-1/3 w-2 h-2 bg-light-tan rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-10 right-1/4 w-3 h-3 bg-cream rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-10 left-1/2 w-2 h-2 bg-medium-tan rounded-full animate-pulse opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2 
            className="font-chakra text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cream via-light-tan to-medium-tan bg-clip-text text-transparent hover:from-light-tan hover:via-cream hover:to-light-tan transition-all duration-500 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            EXPLORE MY
            <br />
            <span className="bg-gradient-to-r from-medium-tan via-light-tan to-cream bg-clip-text text-transparent">
              GAMING CAREER
            </span>
          </h2>
          
          {/* Subtle underline effect */}
          <div className={`mx-auto mt-4 h-1 bg-gradient-to-r from-light-tan to-medium-tan transition-all duration-500 ${isHovered ? 'w-40' : 'w-20'}`}></div>
        </div>
      </div>

      

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-brown to-accent-brown transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`}></div>
    </section>
  )
}

export default GamingCareerSection