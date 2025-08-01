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
  metadataBase: new URL('https://dev.manishguptaji.co.in'),
  title: {
    default: 'Manish Gupta - Software Engineer & Full Stack Developer',
    template: '%s | Manish Gupta'
  },
  description: 'Manish Gupta - Software Engineer and Full Stack Developer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB. Member of Technical Staff at DropMyOrder with 500+ coding challenges solved.',
  keywords: [
    'Manish Gupta',
    'Manish Gupta dev',
    'Manish Gupta Portfolio',
    'Manish Gupta Software Engineer',
    'Manish Gupta Full Stack Developer',
    'Manish Gupta Developer',
    'Software Engineer',
    'Full Stack Developer',
    'C++ Developer',
    'Manish Gupta C++ Developer',
    'Manish Gupta Javascript Developer',
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
  authors: [{ name: 'Manish Gupta', url: 'https://dev.manishguptaji.co.in' }],
  creator: 'Manish Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dev.manishguptaji.co.in',
    siteName: 'Manish Gupta Portfolio',
    title: 'Manish Gupta - Software Engineer & Full Stack Developer',
    description: 'Software Engineer and Full Stack Developer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB. Member of Technical Staff at DropMyOrder.',
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
    google: 'your-google-site-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://dev.manishguptaji.co.in',
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
        
        {/* Explicit Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manish Gupta - Software Engineer & Full Stack Developer" />
        <meta property="og:description" content="Software Engineer and Full Stack Developer specializing in C/C++, JavaScript, React.js, Next.js, Node.js, and MongoDB. Member of Technical Staff at DropMyOrder." />
        <meta property="og:url" content="https://dev.manishguptaji.co.in" />
        <meta property="og:site_name" content="Manish Gupta Portfolio" />
        <meta property="og:image" content="https://dev.manishguptaji.co.in/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Manish Gupta - Software Engineer & Full Stack Developer" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google Fonts - Optimized loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Geo:ital@0;1&family=Iceland&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@200..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Signika:wght@300..700&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics - Fixed to always render */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-PLACEHOLDER'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? 
                `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });` : 
                '// GA not configured'
              }
            `,
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