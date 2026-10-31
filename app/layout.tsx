import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Motion from '@/components/Motion';
import { links, site } from '@/lib/content';
import './globals.css';

const display = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' });

export const viewport: Viewport = { themeColor: '#050505' };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s | Manish Gupta' },
  description: site.description,
  authors: [{ name: 'Manish Gupta', url: site.url }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: 'Manish Gupta',
    title: site.title,
    description: site.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'I build products that connect. Manish Gupta.' }],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/og-image.jpg'], creator: '@Manishg2204022' },
};

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Manish Gupta',
  url: site.url,
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'DropMyOrder', url: 'https://dropmyorder.com' },
  sameAs: [links.github, links.linkedin],
};

const GA = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Hides the hero lines only until GSAP takes over; removed after 3s if it never does. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-motion');setTimeout(function(){if(!('motionReady' in d.dataset))d.classList.remove('js-motion')},3000)})()`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <footer className="footer s-dark">
          <p>© {new Date().getFullYear()} Manish Gupta / {links.location}</p>
          <nav aria-label="Footer">
            <Link href="/GamingCareer">Gaming Career</Link>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.resume} target="_blank" rel="noreferrer">Resume</a>
          </nav>
        </footer>
        <Motion />
        {GA && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
