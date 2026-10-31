'use client';
import { usePathname } from 'next/navigation';
import { useGsap } from '@/lib/motion';

// Page-level entrances, driven by attributes so the sections stay server components:
// [data-hero-line] on load, [data-reveal] blocks, [data-stagger] children, [data-parallax] px.
export default function Motion() {
  const pathname = usePathname();

  useGsap(({ gsap, ScrollTrigger }) => {
    const html = document.documentElement;
    html.dataset.motionReady = '';

    const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
    if (lines.length) {
      gsap.fromTo(
        lines,
        { y: 48, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out', clearProps: 'filter,transform' },
      );
    }
    gsap.utils.toArray<HTMLElement>('[data-hero-fade]').forEach(el =>
      gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power2.out' }),
    );

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
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}
