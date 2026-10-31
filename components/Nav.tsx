'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { links } from '@/lib/content';

const ITEMS = [
  ['Work', '/#work'],
  ['Capabilities', '/#capabilities'],
  ['About', '/#about'],
  ['Contact', '/#contact'],
];

export default function Nav() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();

  return (
    <>
      <header className="nav">
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
