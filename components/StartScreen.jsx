import React, { useState, useEffect } from 'react'

const StartScreen = ({ onComplete }) => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('entering'); 

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('displaying');
    }, 1000); 

    const timer2 = setTimeout(() => {
      setAnimationPhase('exiting');
    }, 2500);   

    const timer3 = setTimeout(() => {
      setShowStartScreen(false);
      if (onComplete) onComplete();
    }, 4000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const letters = "PORTFOLIO".split("");

  if (!showStartScreen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-cream z-50 overflow-hidden transition-opacity duration-1000 ${
      animationPhase === 'exiting' ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        animationPhase === 'entering' ? 'opacity-0 scale-110' : 
        animationPhase === 'displaying' ? 'opacity-5 scale-100' : 
        'opacity-0 scale-90'
      }`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-medium-tan via-transparent to-light-tan"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(176, 137, 104, 0.1) 2px, transparent 2px),
                           radial-gradient(circle at 80% 80%, rgba(221, 184, 146, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 40px 40px'
        }}></div>
      </div>

      {/* Desktop decorative elements */}
      <div className="hidden md:block">
        <div className={`absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-light-tan to-medium-tan transition-all duration-1000 ${
          animationPhase === 'entering' ? 'opacity-0 -translate-x-20 -translate-y-20 scale-0' :
          animationPhase === 'displaying' ? 'opacity-20 translate-x-0 translate-y-0 scale-100 animate-pulse-soft' :
          'opacity-0 translate-x-20 translate-y-20 scale-0'
        }`}></div>
        
        <div className={`absolute top-32 right-24 w-24 h-16 bg-gradient-to-r from-brown to-accent-brown transform rotate-12 transition-all duration-1000 delay-200 ${
          animationPhase === 'entering' ? 'opacity-0 translate-x-20 -translate-y-20 scale-0' :
          animationPhase === 'displaying' ? 'opacity-15 translate-x-0 translate-y-0 scale-100 animate-bounce-soft' :
          'opacity-0 -translate-x-20 translate-y-20 scale-0'
        }`}></div>
        
        <div className={`absolute bottom-28 left-32 transition-all duration-1000 delay-400 ${
          animationPhase === 'entering' ? 'opacity-0 -translate-x-20 translate-y-20 scale-0' :
          animationPhase === 'displaying' ? 'opacity-25 translate-x-0 translate-y-0 scale-100 animate-pulse-soft' :
          'opacity-0 translate-x-20 -translate-y-20 scale-0'
        }`} 
             style={{
               width: 0,
               height: 0,
               borderLeft: '40px solid transparent',
               borderRight: '40px solid transparent',
               borderBottom: '60px solid #ddb892'
             }}></div>
        
        <div className={`absolute bottom-40 right-40 w-20 h-20 rounded-full bg-gradient-to-tl from-dark-brown to-brown transition-all duration-1000 delay-600 ${
          animationPhase === 'entering' ? 'opacity-0 translate-x-20 translate-y-20 scale-0' :
          animationPhase === 'displaying' ? 'opacity-20 translate-x-0 translate-y-0 scale-100 animate-bounce-soft' :
          'opacity-0 -translate-x-20 -translate-y-20 scale-0'
        }`}></div>

        <div className={`absolute top-1/3 left-10 w-1 h-24 bg-gradient-to-b from-transparent via-medium-tan to-transparent transform rotate-12 transition-all duration-1000 delay-300 ${
          animationPhase === 'entering' ? 'opacity-0 -translate-y-10 scale-y-0' :
          animationPhase === 'displaying' ? 'opacity-30 translate-y-0 scale-y-100' :
          'opacity-0 translate-y-10 scale-y-0'
        }`}></div>
        <div className={`absolute bottom-1/3 right-16 w-1 h-32 bg-gradient-to-b from-transparent via-accent-brown to-transparent transform -rotate-12 transition-all duration-1000 delay-500 ${
          animationPhase === 'entering' ? 'opacity-0 translate-y-10 scale-y-0' :
          animationPhase === 'displaying' ? 'opacity-25 translate-y-0 scale-y-100' :
          'opacity-0 -translate-y-10 scale-y-0'
        }`}></div>
      </div>

      {/* Mobile decorative elements - smaller and fewer */}
      <div className="md:hidden">
        <div className={`absolute top-10 left-6 w-16 h-16 rounded-full bg-gradient-to-br from-light-tan to-medium-tan transition-all duration-1000 ${
          animationPhase === 'entering' ? 'opacity-0 -translate-x-10 -translate-y-10 scale-0' :
          animationPhase === 'displaying' ? 'opacity-15 translate-x-0 translate-y-0 scale-100 animate-pulse-soft' :
          'opacity-0 translate-x-10 translate-y-10 scale-0'
        }`}></div>
        
        <div className={`absolute top-16 right-6 w-12 h-8 bg-gradient-to-r from-brown to-accent-brown transform rotate-12 transition-all duration-1000 delay-200 ${
          animationPhase === 'entering' ? 'opacity-0 translate-x-10 -translate-y-10 scale-0' :
          animationPhase === 'displaying' ? 'opacity-10 translate-x-0 translate-y-0 scale-100 animate-bounce-soft' :
          'opacity-0 -translate-x-10 translate-y-10 scale-0'
        }`}></div>
        
        <div className={`absolute bottom-20 left-8 transition-all duration-1000 delay-400 ${
          animationPhase === 'entering' ? 'opacity-0 -translate-x-10 translate-y-10 scale-0' :
          animationPhase === 'displaying' ? 'opacity-20 translate-x-0 translate-y-0 scale-100 animate-pulse-soft' :
          'opacity-0 translate-x-10 -translate-y-10 scale-0'
        }`} 
             style={{
               width: 0,
               height: 0,
               borderLeft: '20px solid transparent',
               borderRight: '20px solid transparent',
               borderBottom: '30px solid #ddb892'
             }}></div>
        
        <div className={`absolute bottom-16 right-8 w-10 h-10 rounded-full bg-gradient-to-tl from-dark-brown to-brown transition-all duration-1000 delay-600 ${
          animationPhase === 'entering' ? 'opacity-0 translate-x-10 translate-y-10 scale-0' :
          animationPhase === 'displaying' ? 'opacity-15 translate-x-0 translate-y-0 scale-100 animate-bounce-soft' :
          'opacity-0 -translate-x-10 -translate-y-10 scale-0'
        }`}></div>
      </div>

      {/* Main text - responsive sizing */}
      <div className='relative z-10 flex flex-wrap justify-center px-4'>
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`text-foreground text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] font-bold font-geo transition-all duration-500 ${
              animationPhase === 'entering' 
                ? 'opacity-0 translate-y-20 scale-0' 
                : animationPhase === 'displaying'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-20 scale-110'
            }`}
            style={{
              transitionDelay: animationPhase === 'entering' 
                ? `${500 + index * 100}ms` 
                : animationPhase === 'exiting'
                ? `${index * 50}ms`
                : '0ms'
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Floating dots - responsive positioning */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className={`absolute -top-8 md:-top-20 -left-16 md:-left-32 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-brown transition-all duration-1000 delay-1000 ${
          animationPhase === 'entering' ? 'opacity-0 scale-0' :
          animationPhase === 'displaying' ? 'opacity-40 scale-100' :
          'opacity-0 scale-0'
        }`}></div>
        <div className={`absolute -bottom-8 md:-bottom-16 right-12 md:right-24 w-2 md:w-3 h-2 md:h-3 rounded-full bg-medium-tan transition-all duration-1000 delay-1200 ${
          animationPhase === 'entering' ? 'opacity-0 scale-0' :
          animationPhase === 'displaying' ? 'opacity-30 scale-100' :
          'opacity-0 scale-0'
        }`}></div>
        <div className={`absolute top-4 md:top-8 -right-20 md:-right-40 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-accent-brown transition-all duration-1000 delay-1400 ${
          animationPhase === 'entering' ? 'opacity-0 scale-0' :
          animationPhase === 'displaying' ? 'opacity-50 scale-100' :
          'opacity-0 scale-0'
        }`}></div>
        <div className={`absolute -top-6 md:-top-12 right-10 md:right-20 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-light-tan transition-all duration-1000 delay-1600 ${
          animationPhase === 'entering' ? 'opacity-0 scale-0' :
          animationPhase === 'displaying' ? 'opacity-35 scale-100' :
          'opacity-0 scale-0'
        }`}></div>
      </div>
    </div>
  )
}

export default StartScreen