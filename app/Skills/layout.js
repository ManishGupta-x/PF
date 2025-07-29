import Hero from "@/components/Hero";

export const metadata = {
  title: 'Technical Skills',
  description: 'Manish Gupta\'s technical skills including React, Next.js, JavaScript, Node.js, and full-stack development technologies.',
  openGraph: {
    title: 'Technical Skills - Manish Gupta',
    description: 'Technical expertise in modern web development technologies.',
    url: 'https://dev.manishguptaji.co.in/Skills'
  }
}

export default function SkillsLayout({ children }) {
  return (
    <div className="bg-light-brown">
      <Hero />
      {children}
    </div>
  );
}