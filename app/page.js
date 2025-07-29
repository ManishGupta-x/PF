import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import GamingCareerSection from "@/components/GamingCareerProfile";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export const metadata = {
  title: 'Home',
  description: 'Welcome to Manish Gupta\'s portfolio. Software Engineer and Full Stack Developer with expertise in C/C++, JavaScript, React, Next.js, and modern web technologies.',
  openGraph: {
    title: 'Manish Gupta - Software Engineer & Full Stack Developer',
    description: 'Welcome to my portfolio showcasing software development projects and professional experience.',
    url: 'https://dev.manishguptaji.co.in'
  }
}

export default function Home() {
  return (
    <div className=" ">
      {/* Structured Data - Critical for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Manish Gupta",
            "url": "https://dev.manishguptaji.co.in",
            "jobTitle": "Software Engineer",
            "description": "Software Engineer and Full Stack Developer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB with 500+ coding challenges solved.",
            "image": "https://dev.manishguptaji.co.in/og-image.jpg",
            "worksFor": {
              "@type": "Organization",
              "name": "DropMyOrder",
              "url": "https://dropmyorder.com"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "Maharaja Agrasen Institute of Technology",
              "sameAs": "https://www.mait.ac.in/"
            },
            "knowsAbout": [
              "C++",
              "JavaScript", 
              "TypeScript",
              "React.js",
              "Next.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "MySQL",
              "Python",
              "Django",
              "REST APIs",
              "WebSockets",
              "Tailwind CSS",
              "Data Structures and Algorithms",
              "System Design",
              "Database Architecture",
              "Full Stack Development",
              "Software Engineering"
            ],
            "sameAs": [
              "https://github.com/ManishGupta-x",
              "https://linkedin.com/in/manishgupta",
              "mailto:manishgupta220402@gmail.com"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN",
              "addressRegion": "Delhi"
            }
          })
        }}
      />
      
      <Hero />
      <About />
      <div className="border-t-2 border-dark-brown opacity-20 lg:mx-48 mx-10" />
      <Skills />
      <div className="border-t-2 border-dark-brown opacity-20 lg:mx-48 mx-10" />
      <Work />
      <GamingCareerSection />
      <ContactForm />
    </div>
  );
}