'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGsap, whenSigned } from '@/lib/motion';

const LENS = 1100;

// Page-level entrances, driven by attributes so the sections stay server components:
// [data-hero-line] on load, [data-reveal] blocks, [data-stagger] children, [data-parallax] px,
// [data-fly] and [data-depth] px along z. Keep [data-t] anchors out of anything that moves.
export default function Motion() {
  const pathname = usePathname();

  // Ends the image shimmer in globals.css. Set after hydration, and in capture because load doesn't bubble.
  useEffect(() => {
    const mark = (e: Event) => {
      if (e.target instanceof HTMLImageElement) e.target.dataset.loaded = '';
    };
    document.querySelectorAll('img').forEach(img => {
      if (img.complete) img.dataset.loaded = '';
    });
    document.addEventListener('load', mark, true);
    document.addEventListener('error', mark, true);
    return () => {
      document.removeEventListener('load', mark, true);
      document.removeEventListener('error', mark, true);
    };
  }, []);

  useGsap(({ gsap, ScrollTrigger }) => {
    const html = document.documentElement;
    html.dataset.motionReady = '';

    const entrance = gsap.timeline({ paused: true });
    const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
    if (lines.length) {
      entrance.fromTo(
        lines,
        { y: 48, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out', clearProps: 'filter,transform' },
        0,
      );
    }
    gsap.utils.toArray<HTMLElement>('[data-hero-fade]').forEach(el =>
      entrance.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.7),
    );
    whenSigned().then(() => entrance.play());

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el =>
      gsap.from(el, {
        y: 36,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'filter',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      }),
    );

    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(el =>
      gsap.from(el.children, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 84%', once: true },
      }),
    );

    if (innerWidth > 760) {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el =>
        gsap.fromTo(
          el,
          { y: Number(el.dataset.parallax) },
          { y: -Number(el.dataset.parallax), ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.4 } },
        ),
      );
    }

    // z-axis, scrubbed: [data-fly] heads past the camera as its section leaves, [data-depth] arrives from
    // behind the page. Clamped so nothing is left part-way at either end of the page.
    gsap.utils.toArray<HTMLElement>('[data-fly]').forEach(el =>
      gsap.fromTo(
        el,
        { z: 0, opacity: 1, transformPerspective: LENS },
        { z: Number(el.dataset.fly), opacity: 0, ease: 'power1.in', scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top top', end: 'bottom 25%', scrub: 0.4 } },
      ),
    );
    gsap.utils.toArray<HTMLElement>('[data-depth]').forEach(el =>
      gsap.fromTo(
        el,
        { z: -Number(el.dataset.depth), rotateX: 16, opacity: 0, transformPerspective: LENS, transformOrigin: '50% 100%' },
        { z: 0, rotateX: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'clamp(top bottom)', end: 'clamp(top 58%)', scrub: 0.4 } },
      ),
    );
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}
