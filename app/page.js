import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import GamingCareerSection from "@/components/GamingCareerProfile";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

export const metadata = {
  title: 'Home',
  openGraph: {
    title: 'Manish Gupta - Full Stack Developer & Gaming Professional',
    description: 'Welcome to my portfolio',
    url: 'https://dev.manishgupta.co.in'
  }
}

export default function Home() {
  return (
    <div className=" ">
      
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