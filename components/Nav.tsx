'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { links } from '@/lib/content';

const ITEMS = [
  ['Work', '/#work'],
  ['Expertise', '/#capabilities'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
];

export default function Nav() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  const bar = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // The bar takes the colour of the section directly beneath it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!bar.current) return;
      const under = document.elementFromPoint(innerWidth / 2, bar.current.getBoundingClientRect().bottom + 1);
      bar.current.dataset.tone = under?.closest('.s-ivory, .s-dark')?.classList.contains('s-ivory') ? 'ivory' : 'dark';
      bar.current.dataset.scrolled = String(scrollY > 8);
    };
    const queue = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
    };
  }, [pathname]);

  return (
    <>
      <header ref={bar} className="nav">
        <Link href="/" className="nav-logo" aria-label="Manish Gupta, home">MG</Link>
        <nav aria-label="Main" className="nav-links">
          {ITEMS.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <a href={links.resume} target="_blank" rel="noreferrer">Resume</a>
        </nav>
        <button type="button" className="nav-menu" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}>Menu</button>
      </header>
      <dialog ref={menu} className="menu" aria-label="Menu" onClick={e => e.target === menu.current && close()}>
        <button type="button" className="menu-close" onClick={close}>Close</button>
        <nav aria-label="Mobile">
          {ITEMS.map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}</Link>)}
          <a href={links.resume} target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </dialog>
    </>
  );
}
