import React, { useState, useEffect } from 'react';
import { Coffee, Heart, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

const FloatingCoffeeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const upiId = "9891703245@ybl"; // Replace with your actual UPI ID

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.tooltip-container') && !event.target.closest('.coffee-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Responsive positioning and sizing
  const getTooltipClasses = () => {
    if (windowWidth < 640) { // Mobile
      return "fixed bottom-20 left-4 right-4 z-50";
    } else if (windowWidth < 1024) { // Tablet
      return "fixed bottom-20 right-4 z-50 w-80 max-w-sm";
    } else { // Desktop
      return "fixed bottom-20 right-6 z-50 w-80 max-w-sm";
    }
  };

  const getButtonClasses = () => {
    if (windowWidth < 640) { // Mobile
      return "fixed bottom-6 right-4 z-50";
    } else { // Tablet and Desktop
      return "fixed bottom-6 right-6 z-50";
    }
  };

  const getArrowPosition = () => {
    if (windowWidth < 640) { // Mobile - center arrow
      return "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full";
    } else { // Tablet and Desktop - right positioned
      return "absolute bottom-0 right-8 transform translate-y-full";
    }
  };

  // Animation variants
  const tooltipVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1], // spring-like easing
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const coffeeIconVariants = {
    hover: {
      rotate: 12,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    animate: {
      y: [0, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className={getButtonClasses()}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="coffee-button group relative bg-gradient-to-br from-accent-brown to-dark-brown text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-out"
          aria-label="Buy me a coffee"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div
            variants={coffeeIconVariants}
            whileHover="hover"
            animate="animate"
          >
            <Coffee className="w-6 h-6" />
          </motion.div>
          
      
          {!isOpen && windowWidth >= 1024 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-dark-brown text-white text-sm rounded-lg whitespace-nowrap"
            >
              Buy me a coffee ☕
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-brown"></div>
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Large Tooltip with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`tooltip-container ${getTooltipClasses()}`}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-cream rounded-2xl shadow-2xl border border-light-tan overflow-hidden">
              {/* Header */}
              <motion.div
                className="relative bg-gradient-to-r from-accent-brown to-dark-brown p-4 text-white"
                variants={contentVariants}
              >
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
                
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 bg-brown bg-opacity-20 rounded-full "
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Coffee className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold font-quantico">Buy me a coffee</h2>
                    <p className="text-white text-opacity-90 text-sm font-quantico">Support my projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="p-4 space-y-3"
                variants={contentVariants}
              >
                {/* Project Description */}
                <motion.div
                  className="bg-light-tan rounded-lg p-3 border border-medium-tan"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-4 h-4 text-accent-brown" />
                    </motion.div>
                    <h3 className="font-semibold text-dark-brown text-sm">Support OmegaWorld</h3>
                  </div>
                  <p className="text-brown text-xs leading-relaxed">
                    Help us Build and Amazing CSGO Gaming Community with your support!
                  </p>
                  <div className="mt-2 flex items-center gap-1 flex-wrap">
                    <span className="text-xs text-blue-500"><FaGlobe /></span>
                    <motion.a
                      href="https://play.omegaindiaworld.win" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-brown hover:text-dark-brown text-xs font-medium underline transition-colors break-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      play.omegaindiaworld.win
                    </motion.a>
                  </div>
                </motion.div>

                {/* UPI Payment */}
                <motion.div
                  className="bg-medium-tan rounded-lg p-3 border border-brown"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold text-dark-brown mb-2 text-sm">UPI</h3>
                  <div className="flex items-center justify-between bg-white rounded-lg p-2 border gap-2">
                    <span className="text-brown font-mono text-xs flex-1 min-w-0 truncate">{upiId}</span>
                    <motion.button
                      onClick={() => copyToClipboard(upiId)}
                      className="flex items-center gap-1 px-2 py-1 bg-accent-brown text-white rounded-md hover:bg-dark-brown transition-colors text-xs whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={copied ? { rotate: 360 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </motion.div>
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Thank you message */}
                <motion.div
                  className="text-center"
                  variants={contentVariants}
                >
                  <p className="text-dark-brown text-xs">
                    Every contribution is deeply appreciated! 🙏
                  </p>
                </motion.div>
              </motion.div>

              {/* Tooltip Arrow */}
              <div className={getArrowPosition()}>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-cream"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCoffeeButton;