'use client';
import { Children, useRef, type CSSProperties, type ReactNode } from 'react';
import { smoothPath, useGsap, type Point } from '@/lib/motion';

const LENS = 1000; // CSS perspective, px
const GAP = 1500; // depth between stops, px
const DWELL = 0.82; // 0 flies at a constant speed, 1 stops dead at each stop
const HOLD = 0.96; // share of the scroll that flies; the rest covers scrub lag before the stage unsticks
const SAMPLES = 48;
const MOBILE = 760;

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

// The markup is a plain index of the work. Under .js-motion the stops sit along z and a single
// camera value moves them; everything in the SVG is projected by hand with the same lens, so the
// thread, the frames and the portal stay locked to the DOM. The thread enters at the top of the
// stage and leaves at the bottom, right where the page's own thread goes under and comes back,
// and the portal fills the stage exactly as the next (ivory) section arrives.
export default function DepthTunnel({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const span = useRef<{ start: number; end: number } | null>(null);
  const stops = Children.count(children);
  const end = stops * GAP;

  useGsap(({ gsap }) => {
    const stage = root.current!.querySelector<HTMLElement>('.tunnel-stage')!;
    const world = stage.querySelector<HTMLElement>('.tunnel-world')!;
    const items = gsap.utils.toArray<HTMLElement>('[data-stop]', stage);
    const frames = gsap.utils.toArray<SVGRectElement>('.tunnel-frame', stage);
    const portal = stage.querySelector<SVGRectElement>('.tunnel-portal')!;
    const line = stage.querySelector<SVGPathElement>('.tunnel-thread')!;
    const tip = stage.querySelector<SVGGElement>('.tunnel-tip')!;
    const state = { p: 0 };

    const place = (rect: SVGRectElement, w: number, h: number, k: number) => {
      rect.setAttribute('x', String(w / 2 - (w / 2) * k));
      rect.setAttribute('y', String(h / 2 - (h / 2) * k));
      rect.setAttribute('width', String(w * k));
      rect.setAttribute('height', String(h * k));
    };

    const draw = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (!w) return; // already out of the page during a route change
      const u = clamp01(state.p / HOLD);
      const cam = end * (u - (DWELL * Math.sin(2 * Math.PI * stops * u)) / (2 * Math.PI * stops));
      const k = (depth: number) => LENS / (LENS - (cam - depth));
      world.style.transform = `translateZ(${cam}px)`;

      items.forEach((el, i) => {
        const d = cam - i * GAP;
        const o = Math.min(clamp01((d + 2.2 * GAP) / (1.6 * GAP)), clamp01(1 - (d - 0.1 * LENS) / (0.45 * LENS)));
        el.style.opacity = String(o);
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
      });

      frames.forEach((rect, i) => {
        const s = k(((i + 1) * GAP) / 2);
        const visible = s > 0 && s <= 1.02;
        rect.style.opacity = visible ? String(0.34 * Math.min(1, s * 3)) : '0';
        if (visible) place(rect, w, h, s);
      });
      // Lights up only as the last project passes, or it reads as a stray block behind the others.
      portal.style.opacity = String(clamp01((cam - (end - 0.95 * GAP)) / (0.35 * GAP)));
      place(portal, w + 2, h + 2, k(end));

      // Rests on the page thread's x at both ends: centre on desktop, right gutter on phones.
      const edge = w <= MOBILE ? 1 - 18 / w : 0;
      const at = (depth: number): Point => {
        const t = depth / end;
        const s = k(depth);
        const x = edge + 0.7 * Math.sin(t * Math.PI * 5) * Math.sqrt(Math.max(Math.sin(t * Math.PI), 0));
        return [w / 2 + ((x * w) / 2) * s, h / 2 + (((2 * t - 1) * h) / 2) * s];
      };
      const near = Math.max(0, cam - 0.8 * LENS);
      const far = Math.min(end, cam + 1.6 * GAP);
      const depths = [near];
      for (let i = 1; i < SAMPLES; i++) {
        const d = (i / SAMPLES) * end;
        if (d > near && d < far) depths.push(d);
      }
      depths.push(far);
      const points = depths.map(at);
      line.setAttribute('d', smoothPath(points));
      const [x, y] = points[points.length - 1];
      tip.setAttribute('transform', `translate(${x} ${y}) scale(${Math.min(1, 0.45 + k(far) * 0.55)})`);
      tip.style.display = u >= 1 ? 'none' : '';
      dispatchEvent(new Event('tunnelmove')); // the scrub outlasts the scroll, and the navbar only hears scrolling
    };

    const tween = gsap.to(state, {
      p: 1,
      ease: 'none',
      onUpdate: draw,
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.5, onRefresh: draw },
    });
    span.current = tween.scrollTrigger!;
    draw();
  });

  // Keyboard users tab through the stops, so bring the camera to whichever one has focus.
  const focus = (e: React.FocusEvent) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-stop]');
    if (!el || !span.current) return;
    const { start, end: stop } = span.current;
    scrollTo({ top: start + (stop - start) * HOLD * (Number(el.dataset.stop) / stops) });
  };

  return (
    <div ref={root} className="tunnel s-dark" onFocusCapture={focus} style={{ '--lens': `${LENS}px`, '--gap': `${GAP}px` } as CSSProperties}>
      <i className="t tunnel-t" data-t="" style={{ '--y': '0%' } as CSSProperties} />
      <div className="tunnel-stage">
        <svg className="tunnel-svg" aria-hidden="true">
          {['0', '100%'].flatMap(x => ['0', '100%'].map(y => <line key={x + y} className="tunnel-rail" x1={x} y1={y} x2="50%" y2="50%" />))}
          {Array.from({ length: stops * 2 - 1 }, (_, i) => <rect key={i} className="tunnel-frame" />)}
          {/* Nav.tsx reads s-ivory from the element under the bar, so it turns ivory as the portal reaches it. */}
          <rect className="tunnel-portal s-ivory" />
          <path className="tunnel-thread" />
          <g className="tunnel-tip thread-tip"><circle r="9" /><circle r="3" /></g>
        </svg>
        <div className="tunnel-world">{children}</div>
      </div>
      <i className="t tunnel-t" data-t="" style={{ '--y': '100%' } as CSSProperties} />
    </div>
  );
}
