'use client';
import { useEffect, type DependencyList } from 'react';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

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
