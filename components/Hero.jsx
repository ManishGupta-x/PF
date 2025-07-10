'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const Hero = () => {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [textIndex, setTextIndex] = useState(0)

    const texts = ['Software Engineer 💻', 'Gamer 🎮', 'Melophile ❤️', 'Tech Geek 🤖']

    useEffect(() => {
        const currentText = texts[textIndex]
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentIndex < currentText.length) {
                    setDisplayText(currentText.substring(0, currentIndex + 1))
                    setCurrentIndex(currentIndex + 1)
                } else {
                    setTimeout(() => setIsDeleting(true), 2000)
                }
            } else {
                if (currentIndex > 0) {
                    setDisplayText(currentText.substring(0, currentIndex - 1))
                    setCurrentIndex(currentIndex - 1)
                } else {
                    setIsDeleting(false)
                    setTextIndex((textIndex + 1) % texts.length)
                }
            }
        }, isDeleting ? 50 : 100)
        
        return () => clearTimeout(timeout)
    }, [currentIndex, isDeleting, textIndex, texts])

    return (
        <div className="relative w-full h-[20vh] min-h-[400px] overflow-hidden border-b-4 border-dark-brown shadow-2xl">
            <Image
                src="/hero.jpg"
                alt="Hero Image"
                fill
                className="object-cover blur-[2px]"
                priority
            />

           
            <div className="md:hidden absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl sm:text-5xl text-medium-tan font-chakra font-bold mb-4 drop-shadow-2xl">
                    Manish Gupta
                </h1>
                <div className="h-8 flex items-center">
                    <p className="text-xl sm:text-2xl text-medium-tan font-geo drop-shadow-lg">
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </p>
                </div>
            </div>

         
            <div className="hidden md:block">
                <div className="absolute inset-0 bg-black/50" />
                
         
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-medium-tan to-transparent opacity-60" />
                <div className="absolute bottom-4 left-32 w-32 h-32 border border-medium-tan/30 rotate-45 rounded-lg" />
             
                
            
                <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 800 400">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ede0d4" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <line x1="0" y1="350" x2="300" y2="250" stroke="#ede0d4" strokeWidth="1" opacity="0.3"/>
                    <line x1="500" y1="350" x2="800" y2="280" stroke="#ede0d4" strokeWidth="1" opacity="0.3"/>
                </svg>

            
                <div className="absolute bottom-0 left-32 lg:left-48 xl:left-56">
                    <div className="relative">
                      
                        <div className="h-48 w-80 lg:w-96 bg-gradient-to-br from-black/95 to-black/85 rounded-t-3xl shadow-2xl border-t-2 border-l-2 border-r-2 border-medium-tan/40 backdrop-blur-sm">
                          
                            <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-br from-medium-tan/5 to-transparent" />
                            
                            {/* Corner decorations */}
                            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-medium-tan/60 rounded-tl-lg" />
                            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-medium-tan/60 rounded-tr-lg" />
                            
                            {/* Content - Adjusted spacing */}
                            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                                <div className="mb-4">
                                    <h1 className="text-3xl lg:text-4xl text-medium-tan font-chakra font-bold mb-2 tracking-wide">
                                        Manish Gupta
                                    </h1>
                                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-medium-tan to-transparent mx-auto" />
                                </div>
                                
                                <div className="h-10 flex items-center justify-center">
                                    <p className="text-lg lg:text-xl text-medium-tan font-geo tracking-wider">
                                        {displayText}
                                        <span className="animate-pulse text-medium-tan/80 ml-1">|</span>
                                    </p>
                                </div>
                                
                                {/* Subtle accent line */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-medium-tan/60 rounded-full" />
                            </div>  
                        </div>
                        
                        {/* Floating elements */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-medium-tan/60 rounded-full animate-pulse" />
                        <div className="absolute -top-4 right-12 w-2 h-2 bg-medium-tan/40 rounded-full animate-pulse delay-500" />
                        <div className="absolute top-8 -right-3 w-3 h-3 bg-medium-tan/50 rounded-full animate-pulse delay-1000" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero