"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const { scrollY } = useScroll();

  // Check if current page is home page
  useEffect(() => {
    const checkHomePage = () => {
      setIsHomePage(window.location.pathname === '/');
    };
    
    checkHomePage();
    // Listen for route changes
    window.addEventListener('popstate', checkHomePage);
    
    return () => {
      window.removeEventListener('popstate', checkHomePage);
    };
  }, []);

  // Track scroll position and direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Add background blur/opacity when scrolled
    setIsScrolled(latest > 50);
    
    // Improved scroll logic with better thresholds
    if (latest > previous && latest > 150) {
      // Scrolling down - hide header
      setHidden(true);
    } else if (latest < previous && (previous - latest > 10 || latest < 100)) {
      // Scrolling up - show header only if:
      // 1. Scrolled up by more than 10px, OR
      // 2. Near the top of the page (less than 100px)
      setHidden(false);
    }
    // If none of the above conditions are met, keep current state
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Updated navLinks to redirect to home page with hash
  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#work", label: "Work" },
    { href: "/#contact", label: "Contact" },
  ];

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for menu items
  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Animation variants for the hamburger icon
  const hamburgerVariants = {
    closed: {
      rotate: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      rotate: 90,
      transition: {
        duration: 0.2
      }
    }
  };

  // Header animation variants
  const headerVariants = {
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    hidden: {
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Floating navbar animation variants
  const floatingNavVariants = {
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: 0.2
      }
    },
    hidden: {
      y: -50,
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border transition-all duration-300 ${
          isScrolled 
            ? 'bg-muted/98 backdrop-blur-md shadow-lg' 
            : 'bg-muted/95 backdrop-blur-sm shadow-2xl'
        }`}
        variants={headerVariants}
        animate={hidden ? "hidden" : "visible"}
        initial={false}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex h-16 items-center justify-between"
            animate={{
              scale: isScrolled ? 0.95 : 1,
              paddingTop: isScrolled ? "0.25rem" : "0rem",
              paddingBottom: isScrolled ? "0.25rem" : "0rem"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 rounded-full overflow-hidden shadow-md border-2 border-accent-brown flex-shrink-0"
                animate={{
                  scale: isScrolled ? 0.9 : 1,
                  rotate: isScrolled ? 0 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/mypic.jpg"
                  alt="ManishGupta"
                  className="w-full h-full object-contain object-top"
                />
              </motion.div>
              <motion.span 
                className="font-bold text-primary text-xl tracking-tight font-signika cursor-pointer"
                animate={{
                  fontSize: isScrolled ? "1.125rem" : "1.25rem"
                }}
                transition={{ duration: 0.3 }}
                
              >
                <a href="/">Manish Gupta</a>
              </motion.span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {isHomePage ? (
                // Show navigation links only on home page
                navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-dark-brown hover:text-primary transition-colors duration-200 font-medium font-signika text-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))
              ) : (
                // Show "Back to Portfolio" link on other pages
                <motion.a
                  href="/"
                  className="text-dark-brown hover:text-primary transition-colors duration-200 font-medium font-signika text-lg flex items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Portfolio
                </motion.a>
              )}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <motion.div 
                className="bg-dark-brown p-2 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://drive.google.com/file/d/1KgRhoBu6uCN5dYcK4SXuFvgp6V8kZpc7/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center text-cream transition-colors duration-200 font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </a>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  variants={hamburgerVariants}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                >
                  {isMobileMenuOpen ? (
                    <>
                      <motion.path
                        d="M18 6L6 18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        d="M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </>
                  ) : (
                    <>
                      <motion.path
                        d="M3 12H21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        d="M3 6H21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                      <motion.path
                        d="M3 18H21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                    </>
                  )}
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden border-t border-border bg-muted/95 backdrop-blur-sm overflow-hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <nav className="py-4 space-y-2">
                  {isHomePage ? (
                    // Show navigation links only on home page
                    navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-dark-brown hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium rounded-md mx-2"
                        variants={itemVariants}
                        custom={index}
                      >
                        {link.label}
                      </motion.a>
                    ))
                  ) : (
                    // Show "Back to Portfolio" link on other pages
                    <motion.a
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-dark-brown hover:text-primary hover:bg-muted/50 transition-colors duration-200 font-medium rounded-md mx-2  items-center"
                      variants={itemVariants}
                      custom={0}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Portfolio
                    </motion.a>
                  )}
                  <motion.div
                    className="px-6 pt-4"
                    variants={itemVariants}
                    custom={isHomePage ? navLinks.length : 1}
                  >
                    <a
                      href="https://drive.google.com/file/d/1KgRhoBu6uCN5dYcK4SXuFvgp6V8kZpc7/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline w-full flex items-center text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </a>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

     
      <AnimatePresence>
        {hidden && (
          <motion.div
            className="fixed left-1/2 top-8 transform -translate-x-1/2 z-40 hidden md:block"
            variants={floatingNavVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.nav 
              className="bg-gradient-to-r from-[#2a0f02] via-[#712500] to-[#3d1502] border-2 border-border rounded-full px-6 py-3 shadow-xl font-quantico font-bold"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-6">
                {isHomePage ? (
                  // Show navigation links only on home page
                  navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="text-cream hover:text-amber-100 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-full hover:bg-amber-900"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}  
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.a>
                  ))
                ) : (
                  // Show "Back to Portfolio" link on other pages
                  <motion.a
                    href="/"
                    className="text-cream hover:text-amber-100 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-full hover:bg-amber-900 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Portfolio
                  </motion.a>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hidden && (
          <motion.div
            className="fixed left-4 right-4 top-6 z-40 md:hidden"
            variants={floatingNavVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.nav 
               className="bg-gradient-to-r from-[#2a0f02] via-[#712500] to-[#3d1502] border-2 border-border  rounded-full px-6 py-3 shadow-xl font-quantico font-bold"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4 ">
                  {isHomePage ? (
                    // Show navigation links only on home page
                    navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        className="text-cream hover:text-amber-100 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-full hover:bg-amber-900 whitespace-nowrap"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.label}
                      </motion.a>
                    ))
                  ) : (
                    // Show "Back to Portfolio" link on other pages
                    <motion.a
                      href="/"
                      className="text-cream hover:text-amber-100 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-full hover:bg-amber-900 whitespace-nowrap flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Portfolio
                    </motion.a>
                  )}
                </div>
              
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}