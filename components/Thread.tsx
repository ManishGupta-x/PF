'use client';
import { useEffect, useRef } from 'react';
import { loadGsap, prefersReducedMotion, scrollStops, smoothPath, whenSigned, type Point } from '@/lib/motion';

const NS = 'http://www.w3.org/2000/svg';
const MOBILE = 760;
const HEAD_LINE = 0.72; // viewport height the thread's tip tracks

type Seg = { from: number; to: number; over: boolean; onLoad: boolean; el: HTMLElement };

// Every [data-t] in document order adds to one continuous line. An anchor is a point at
// its centre, or data-pts / data-pts-m: "x,y x,y" in percent of the anchor's own box.
// display:none anchors are skipped, which is how desktop and mobile get separate geometry.
function measure(main: HTMLElement) {
  const origin = main.getBoundingClientRect();
  const mobile = innerWidth <= MOBILE;
  const points: Point[] = [];
  const segs: Seg[] = [];
  main.querySelectorAll<HTMLElement>('[data-t]').forEach(el => {
    const r = el.getBoundingClientRect();
    if (!el.getClientRects().length) return;
    const spec = (mobile && el.dataset.ptsM) || el.dataset.pts;
    const local: Point[] = spec
      ? spec.trim().split(/\s+/).map(s => {
          const [x, y] = s.split(',').map(Number);
          return [r.left - origin.left + (x / 100) * r.width, r.top - origin.top + (y / 100) * r.height];
        })
      : [[r.left - origin.left + r.width / 2, r.top - origin.top + r.height / 2]];
    const from = Math.max(points.length - 1, 0);
    points.push(...local);
    segs.push({ from, to: points.length - 1, over: 'over' in el.dataset, onLoad: 'load' in el.dataset, el });
  });
  return { points, segs: segs.filter(s => s.to > s.from), size: [main.clientWidth, main.scrollHeight] };
}

export default function Thread() {
  const under = useRef<SVGSVGElement>(null);
  const over = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const main = document.getElementById('main');
    if (!main || !under.current || !over.current) return;
    const layers = [under.current, over.current];
    const reduced = prefersReducedMotion();
    let revert = () => {};
    let cancelled = false;
    let introPlayed = false;

    const build = async () => {
      revert();
      revert = () => {};
      const { points, segs, size } = measure(main);
      layers.forEach(svg => {
        svg.replaceChildren();
        svg.setAttribute('viewBox', `0 0 ${size[0]} ${size[1]}`);
        svg.style.height = `${size[1]}px`;
      });
      if (!segs.length) return;

      const paths = segs.map(s => {
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', smoothPath(points, s.from, s.to));
        layers[s.over ? 1 : 0].append(path);
        return path;
      });
      const head = document.createElementNS(NS, 'g');
      head.setAttribute('class', 'thread-head');
      head.innerHTML = '<circle r="9"/><circle r="3"/>';
      layers[1].append(head);
      const moveHead = (x: number, y: number) => head.setAttribute('transform', `translate(${x} ${y})`);
      const end = points[points.length - 1];
      moveHead(end[0], end[1]);
      const hideAtEnd = 'nohead' in segs[segs.length - 1].el.dataset;
      if (hideAtEnd) head.style.display = 'none';

      if (reduced) {
        segs.forEach(s => s.el.classList.add('on'));
        return;
      }

      const { gsap, ScrollTrigger } = await loadGsap();
      if (cancelled) return;
      const lengths = paths.map(p => p.getTotalLength());
      const ctx = gsap.context(() => {
        // Start the pattern well inside the gap, or a round cap shows as a speck on undrawn segments.
        paths.forEach((p, i) => gsap.set(p, { strokeDasharray: `${lengths[i] + 1} ${lengths[i] + 40}`, strokeDashoffset: lengths[i] + 20 }));
        const vh = innerHeight;
        const maxScroll = Math.max(document.documentElement.scrollHeight - vh, 1);
        const scrolled = segs.flatMap((s, i) => (s.onLoad ? [] : [{ i, y: points[s.to][1] - vh * HEAD_LINE, len: lengths[i] }]));
        const stops = new Map(scrollStops(scrolled).map((stop, k) => [scrolled[k].i, stop]));
        let cursor = 0;
        const intro = gsap.timeline({ paused: true });
        const drawn = paths.map(() => 0);

        segs.forEach((s, i) => {
          const path = paths[i];
          const len = lengths[i];
          // Scrubbed tweens settle in any order after a jump, so the furthest drawn segment owns the tip.
          const tip = () => {
            drawn[i] = Math.max(0, len - Number(gsap.getProperty(path, 'strokeDashoffset')));
            let k = drawn.length - 1;
            while (k > 0 && drawn[k] <= 0) k--;
            const q = paths[k].getPointAtLength(drawn[k]);
            moveHead(q.x, q.y);
            if (hideAtEnd) head.style.display = k === drawn.length - 1 && drawn[k] >= lengths[k] - 1 ? 'none' : '';
          };
          const toggle = (done: boolean) => s.el.classList.toggle('on', done);

          if (s.onLoad) {
            const dur = Math.min(0.95, Math.max(0.2, len / 1900));
            intro.to(path, { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut', onUpdate: tip, onComplete: () => toggle(true) });
            return;
          }
          const start = Math.min(cursor, maxScroll - 2);
          const stop = Math.min(Math.max(start + 1, stops.get(i)!), maxScroll);
          cursor = stop;
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              start,
              end: stop,
              scrub: 0.35,
              onUpdate: self => {
                toggle(self.progress > 0.98);
              },
              onRefresh: self => toggle(self.progress > 0.98),
            },
            onUpdate: tip,
          });
        });

        if (introPlayed) intro.progress(1);
        else {
          // A rebuild while the signature is still being written waits too, so the line stays undrawn.
          whenSigned().then(() => {
            if (cancelled) return;
            intro.delay(0.35).play();
            introPlayed = true;
          });
        }
      });
      ScrollTrigger.refresh();
      revert = () => ctx.revert();
    };

    let timer = 0;
    const later = () => {
      clearTimeout(timer);
      timer = window.setTimeout(build, 140);
    };
    const ro = new ResizeObserver(later);
    ro.observe(main);
    document.fonts?.ready.then(later);
    addEventListener('load', later);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      ro.disconnect();
      removeEventListener('load', later);
      revert();
    };
  }, []);

  return (
    <>
      <svg ref={under} className="thread" aria-hidden="true" />
      <svg ref={over} className="thread thread--over" aria-hidden="true" />
    </>
  );
}
