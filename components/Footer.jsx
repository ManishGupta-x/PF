"use client";
import { FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHomePage, setIsHomePage] = useState(false);

  const contactInfo = [
    {
      icon: (
        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: "manishgupta220402@gmail.com",
      href: "mailto:manishgupta220402@gmail.com"
    },
    {
      icon: (
        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: "+91 9891703245",
      href: "tel:+919891703245"
    },
    {
      icon: (
        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: "New Delhi, India",
      href: null
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/ManishGupta-X",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/manish-gupta-8861ba224/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/thecodingfreak_22/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM4.5 7.75a3.25 3.25 0 0 1 3.25-3.25h8.5a3.25 3.25 0 0 1 3.25 3.25v8.5a3.25 3.25 0 0 1-3.25 3.25h-8.5a3.25 3.25 0 0 1-3.25-3.25v-8.5Zm9.75 1.25a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 0 1.5h-.007a.75.75 0 0 1-.75-.75Zm-5.25 3A3 3 0 1 1 12 15a3 3 0 0 1-3-3Zm1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0Z" />
        </svg>
      )
    },
    {
      name: "Discord",
      href: "https://discord.com/users/550267183503114250",
      icon: <FaDiscord className="w-5 h-5" />
    }
  ];

  const quickLinks = isHomePage ? [
    { href: "#about", label: "About Me" },
    { href: "#work", label: "My Work" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
    { href: "/GamingCareer", label: "Gaming Career" }
  ] : [
    { href: "/", label: "Home" }
  ];

  useEffect(() => {
    const checkHomePage = () => {
      setIsHomePage(window.location.pathname === '/');
    };

    checkHomePage();

    window.addEventListener('popstate', checkHomePage);
    return () => {
      window.removeEventListener('popstate', checkHomePage);
    };
  }, []);

  return (
    <footer id="footer" className="border-t border-border bg-gradient-to-br from-light-tan/20 via-light-tan/30 to-light-tan/40 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">

        
        <div className="mb-8 lg:hidden">
          <div className="flex items-start space-x-4 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src="/mypic.jpg"
                alt="Manish Gupta"
                className="w-16 h-16 rounded-full object-contain border-2 border-accent-brown shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="font-quantico flex-1 min-w-0">
              <h2 className="font-bold text-primary text-xl mb-1">Manish Gupta</h2>
              <p className="text-sm text-muted-foreground mb-2">Full Stack Developer</p>
              <p className="text-dark-brown text-sm leading-relaxed">
                Creating innovative software solutions that make a difference. Passionate about coding, design, and technological innovation.
              </p>
            </div>
          </div>
        </div>

        
        <div className="hidden lg:grid grid-cols-4 gap-12 mb-8">
          
          <div className="text-left">
            <div className="flex items-center justify-start space-x-3 mb-4">
              <div className="relative flex-shrink-0">
                <img
                  src="/mypic.jpg"
                  alt="Manish Gupta"
                  className="w-12 h-12 rounded-full object-contain border-2 border-accent-brown shadow-md hover:shadow-lg transition-shadow duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="font-quantico flex-1">
                <span className="font-bold text-primary text-lg sm:text-xl block">Manish Gupta</span>
                <span className="text-xs text-muted-foreground">Full Stack Developer</span>
              </div>
            </div>
            <p className="text-dark-brown text-sm leading-relaxed font-quantico">
              Creating innovative software solutions that make a difference. Passionate about coding, design, and technological innovation.
            </p>
          </div>

          
          <div className="text-left font-signika">
            <h3 className="font-semibold text-primary mb-4 text-base sm:text-lg flex items-center justify-start">
              <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Get in Touch
            </h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center justify-start space-x-3 text-sm group">
                  <div className="p-2 rounded-lg bg-white/50 group-hover:bg-accent/10 transition-colors duration-200">
                    {contact.icon}
                  </div>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="hover:text-accent transition-colors duration-200 text-dark-brown break-words"
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className="text-dark-brown">{contact.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          
          <div className="text-left">
            <h3 className="font-semibold text-primary mb-4 text-base sm:text-lg flex items-center justify-start font-signika">
              <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Follow Me
            </h3>
            <div className="flex flex-wrap gap-3 justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/50 hover:bg-accent hover:text-white hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-lg group flex-shrink-0"
                  aria-label={social.name}
                  title={social.name}
                >
                  <div className="group-hover:rotate-12 transition-transform duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          
          <div className="text-left">
            <h3 className="font-semibold text-primary mb-4 text-base sm:text-lg flex items-center justify-start font-signika">
              <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Quick Links
            </h3>
            <div className="space-y-2 font-signika">
              {quickLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted-foreground hover:text-accent transition-all duration-200 text-sm py-1 px-2 rounded-lg hover:bg-white/60 relative overflow-hidden group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 bg-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        
        <div className="lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">

            
            <div className="space-y-6">
              
              <div className="text-left font-signika">
                <h3 className="font-semibold text-primary mb-4 text-lg flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Get in Touch
                </h3>
                <div className="space-y-3 flex justify-between flex-col">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm group justify-center">
                      <div className="p-2 rounded-lg bg-white/50 group-hover:bg-accent/10 transition-colors duration-200 flex-shrink-0">
                        {contact.icon}
                      </div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="hover:text-accent transition-colors duration-200 text-dark-brown break-words flex-1"
                        >
                          {contact.text}
                        </a>
                      ) : (
                        <span className="text-dark-brown flex-1">{contact.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="text-center">
                <h3 className="font-semibold text-primary mb-4 text-lg flex items-center font-signika just">
                  <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Follow Me
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/50 hover:bg-accent hover:text-white hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg group"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <div className="group-hover:rotate-12 transition-transform duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="text-left">
              <h3 className="font-semibold text-primary mb-4 text-lg flex items-center font-signika">
                <svg className="w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Quick Links
              </h3>
              <div className="space-y-2 font-signika">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-muted-foreground hover:text-accent transition-all duration-200 text-sm py-2 px-3 rounded-lg hover:bg-white/60 relative overflow-hidden group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border my-8"></div>

        
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <p className="text-dark-brown font-quantico text-sm">
              &copy; {currentYear} Manish Gupta. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-1 text-xs text-dark-brown font-bold font-quantico">
            <span>Made with</span>
            <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>& coffee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}