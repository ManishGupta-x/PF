export const metadata = {
  title: 'Small Projects',
  description: 'Collection of Manish Gupta\'s small development projects, coding experiments, and innovative web solutions.',
  openGraph: {
    title: 'Small Projects - Manish Gupta',
    description: 'Development projects and coding experiments.',
    url: 'https://dev.manishgupta.co.in/SmallProjects'
  }
}

export default function SmallProjectsLayout({ children }) {
  return (
    <div className="bg-light-brown">
      {children}
    </div>
  );
}