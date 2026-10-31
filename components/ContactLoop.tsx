'use client';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { loadGsap, prefersReducedMotion, smoothPath, type Point } from '@/lib/motion';

const LOOP: Point[] = [
  [260, 0], [270, 60], [230, 120], [120, 130], [50, 210], [90, 320], [210, 340], [320, 270], [330, 160],
  [240, 100], [140, 170], [110, 290], [170, 400], [290, 420], [370, 340], [340, 240], [240, 240], [190, 330], [210, 450],
];
const END: Point = [260, 560];
const tangled: Point[] = [...LOOP, END];
const straight: Point[] = tangled.map((_, i) => [260, (i / (tangled.length - 1)) * 640]);
const PULL_PX = 170;

export default function ContactLoop() {
  const path = useRef<SVGPathElement>(null);
  const handle = useRef<HTMLButtonElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [open, setOpen] = useState(false);
  const [canDrag, setCanDrag] = useState(false);
  const state = useRef({ t: 0, drag: null as null | { y: number; t: number }, moved: false });
  const gsapRef = useRef<Awaited<ReturnType<typeof loadGsap>>['gsap'] | null>(null);

  const draw = (t: number) => {
    const pts = tangled.map(([x, y], i): Point => [x + (straight[i][0] - x) * t, y + (straight[i][1] - y) * t]);
    path.current?.setAttribute('d', smoothPath(pts));
    const [hx, hy] = pts[pts.length - 1];
    if (handle.current) {
      handle.current.style.left = `${(hx / 400) * 100}%`;
      handle.current.style.top = `${(hy / 640) * 100}%`;
    }
  };

  const animateTo = (target: number) => {
    const g = gsapRef.current;
    if (!g) return;
    g.to(state.current, {
      t: target,
      duration: target ? 0.8 : 1.3,
      ease: target ? 'power3.out' : 'elastic.out(1, 0.45)',
      overwrite: true,
      onUpdate: () => draw(state.current.t),
    });
  };

  useEffect(() => {
    draw(0);
    if (prefersReducedMotion()) return;
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      gsapRef.current = gsap;
      setCanDrag(true);
      const ctx = gsap.context(() => {
        gsap.fromTo(
          path.current,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: svg.current, start: 'top 70%', end: 'center 55%', scrub: 0.4 } },
        );
      });
      revert = () => ctx.revert();
    }).catch(() => {});
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  const onDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    gsapRef.current?.killTweensOf(state.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    state.current.drag = { y: e.clientY, t: state.current.t };
    state.current.moved = false;
  };
  const onMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const { drag } = state.current;
    if (!drag) return;
    if (Math.abs(e.clientY - drag.y) > 4) state.current.moved = true;
    state.current.t = Math.min(1, Math.max(0, drag.t + (e.clientY - drag.y) / PULL_PX));
    draw(state.current.t);
  };
  const onUp = () => {
    if (!state.current.drag) return;
    state.current.drag = null;
    // A drag springs back. A press without movement falls through to onClick, the toggle.
    if (state.current.moved) {
      animateTo(0);
      setOpen(false);
    }
  };
  const onClick = () => {
    if (state.current.moved) {
      state.current.moved = false;
      return;
    }
    animateTo(open ? 0 : 1);
    setOpen(!open);
  };

  return (
    <div className="loop" aria-hidden={canDrag ? undefined : true}>
      <i className="t loop-start" data-t="" data-nohead="" />
      <svg ref={svg} viewBox="0 0 400 640" className="loop-svg" aria-hidden="true">
        <path ref={path} pathLength={1} strokeDasharray="1" />
      </svg>
      {canDrag ? (
        <button
          ref={handle}
          type="button"
          className="loop-handle"
          style={{ left: `${(END[0] / 400) * 100}%`, top: `${(END[1] / 640) * 100}%` }}
          aria-pressed={open}
          aria-label={open ? 'Let the thread loop return' : 'Straighten the thread'}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClick={onClick}
        >
          <i />
          <span>{open ? 'LET GO' : 'PULL TO STRAIGHTEN'}</span>
        </button>
      ) : null}
    </div>
  );
}
