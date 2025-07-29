import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO Metadata
export const metadata = {
  metadataBase: new URL('https://dev.manishgupta.co.in'),
  title: {
    default: 'Manish Gupta - Software Engineer ',
    template: '%s | Manish Gupta'
  },
  description: 'Manish Gupta - Software Engineer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB.',
  keywords: [
    'Manish Gupta',
    'Software Engineer',
    'Full Stack Developer',
    'C++ Developer',
    'Manish Gupta C++ Developer',
    'Manish Gupta Javascript Developer' ,
    'Manish Gupta React.js Developer',
    'Manish Gupta Next.js Developer',
    'Manish Gupta Node.js Developer',
    'Manish Gupta MongoDB Developer',
    'Manish Gupta MySQL Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'React.js Developer',
    'Next.js Developer',
    'Node.js Developer',
    'MongoDB Developer',
    'MySQL Developer',
    'Express.js',
    'REST APIs',
    'WebSockets',
    'Tailwind CSS',
    'Data Structures and Algorithms',
    'LeetCode',
    'CodeChef',
    'System Design',
    'Database Architecture',
    'DropMyOrder',
    'Member of Technical Staff',
    'Technical Lead',
    'MAIT',
    'Maharaja Agrasen Institute',
    'Information Technology',
    'Python Developer',
    'Django',
    'Discord.js',
    'LSB Steganography',
    'Food Service Ecosystem',
    'Music Streaming Service',
    'Portfolio Website'
  ],
  authors: [{ name: 'Manish Gupta', url: 'https://dev.manishgupta.co.in' }],
  creator: 'Manish Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dev.manishgupta.co.in',
    siteName: 'Manish Gupta Portfolio',
    title: 'Manish Gupta - Software Engineer ',
    description: 'Software Engineer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB. ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Manish Gupta - Software Engineer & Full Stack Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manish Gupta - Software Engineer & Full Stack Developer',
    description: 'Software Engineer specializing in full-stack development with expertise in C/C++, JavaScript, and modern web technologies.',
    images: ['/og-image.jpg'],
    creator: '@Manishg2204022' 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', 
  },
  alternates: {
    canonical: 'https://dev.manishgupta.co.in',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Theme and viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ede0d4" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Google Fonts - Optimized loading */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Geo:ital@0;1&family=Iceland&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@200..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Signika:wght@300..700&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Manish Gupta",
              "url": "https://dev.manishgupta.co.in",
              "jobTitle": "Software Engineer",
              "description": "Software Engineer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB ",
              "worksFor": {
                "@type": "Organization",
                "name": "DropMyOrder"
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
                "addressCountry": "IN"
              }
            })
          }}
        />
        
      
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
 
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}