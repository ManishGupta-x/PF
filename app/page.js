import About from "@/components/About";
import GamingCareerSection from "@/components/GamingCareerProfile";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Work from "@/components/Work";

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

    </div>
  );
}