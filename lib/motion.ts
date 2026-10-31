'use client';
import { useEffect, type DependencyList } from 'react';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

// Resolves once the landing signature is written; at once on any visit that doesn't have one.
export const whenSigned = () =>
  new Promise<void>(resolve => {
    const html = document.documentElement;
    if (!html.classList.contains('js-intro') || 'signed' in html.dataset) resolve();
    else addEventListener('signed', () => resolve(), { once: true });
  });

type Gsap = Awaited<ReturnType<typeof loadGsap>>;

// GSAP loads lazily, so server-rendered markup is the complete final state: under
// reduced motion, or if the import fails, setup never runs and nothing is hidden.
export function useGsap(setup: (g: Gsap) => void, deps: DependencyList = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let revert = () => {};
    let cancelled = false;
    loadGsap()
      .then(g => {
        if (cancelled) return;
        const ctx = g.gsap.context(() => setup(g));
        revert = () => ctx.revert();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type Point = [number, number];

// Scroll position where each segment of a winding line should finish. A segment that doubles
// back reaches no new depth, so it shares the scroll up to the next new depth with its
// neighbours, and the tip can't fall behind the page however much the line winds.
export function scrollStops(segs: { y: number; len: number }[]) {
  const stops: number[] = [];
  let cursor = 0;
  let deepest = -Infinity;
  let run: number[] = [];
  const close = (target: number) => {
    const total = run.reduce((sum, i) => sum + segs[i].len, 0) || 1;
    const stop = Math.max(target, cursor + Math.min(total * 0.12, 120));
    let done = 0;
    run.forEach(i => {
      done += segs[i].len;
      stops[i] = cursor + (stop - cursor) * (done / total);
    });
    cursor = stop;
    run = [];
  };
  segs.forEach((s, i) => {
    run.push(i);
    if (s.y > deepest) {
      deepest = s.y;
      close(s.y);
    }
  });
  if (run.length) close(cursor);
  return stops;
}

// Spline through points; tangents take direction from the neighbours and length from
// the segment, so unevenly spaced points don't overshoot.
export function smoothPath(p: Point[], from = 0, to = p.length - 1) {
  const dir = (i: number): Point => {
    const a = p[Math.max(i - 1, 0)];
    const b = p[Math.min(i + 1, p.length - 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  };
  let d = `M ${p[from][0].toFixed(1)} ${p[from][1].toFixed(1)}`;
  for (let i = from; i < to; i++) {
    const k = Math.hypot(p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]) * 0.38;
    const [ax, ay] = dir(i);
    const [bx, by] = dir(i + 1);
    d +=
      ` C ${(p[i][0] + ax * k).toFixed(1)} ${(p[i][1] + ay * k).toFixed(1)},` +
      ` ${(p[i + 1][0] - bx * k).toFixed(1)} ${(p[i + 1][1] - by * k).toFixed(1)},` +
      ` ${p[i + 1][0].toFixed(1)} ${p[i + 1][1].toFixed(1)}`;
  }
  return d;
}
