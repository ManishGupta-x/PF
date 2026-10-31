'use client';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useGsap } from '@/lib/motion';

export type Build = (
  tl: gsap.core.Timeline,
  q: (selector: string) => Element[],
  step: (text: string) => void,
) => void;

// Position on a stage in em. CSS vars so the mobile stack can ignore them.
export const at = (x: number, y: number, w?: number, r = 0): CSSProperties =>
  ({ '--x': `${x}em`, '--y': `${y}em`, '--w': w ? `${w}em` : 'auto', '--r': `${r}deg` }) as CSSProperties;

// Thread anchor on a stage, outside the animated objects so measuring never sees a tween.
export const T = ({ x, y, w = 0, h = 0, pts }: { x: number; y: number; w?: number; h?: number; pts?: string }) => (
  <i className="t" data-t="" data-pts={pts} style={{ ...at(x, y, w), '--h': `${h}em` } as CSSProperties} />
);

type Props = {
  label: string; // what the sequence shows, for assistive technology
  finalStep: string;
  build: Build;
  className?: string;
  note?: string;
  children: ReactNode;
};

// One readable, finite sequence. The markup is the final state; the timeline only hides and
// replays parts of it, so reduced motion and failed scripts still show the complete story.
export default function Demo({ label, finalStep, build, className = '', note = 'Illustrated workflow · Sample data', children }: Props) {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const catchUp = useRef<gsap.core.Tween | null>(null);
  const [state, setState] = useState<'off' | 'ready' | 'playing' | 'paused' | 'done'>('off');
  const [step, setStep] = useState(finalStep);

  useGsap(({ gsap, ScrollTrigger }) => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setStep(finalStep);
        setState('done');
        pacing.kill();
      },
    });
    build(tl, gsap.utils.selector(root.current), setStep);
    timeline.current = tl;
    setState('ready');
    let started = false;
    // Plays in its own time, but never falls behind the page: a fast scroller shouldn't reach empty space.
    const pacing = ScrollTrigger.create({
      trigger: root.current,
      start: 'top 62%',
      end: () => `+=${Math.max((root.current!.offsetHeight - innerHeight * 0.38) * 0.8, innerHeight * 0.5)}`,
      onEnter: () => {
        if (started) return;
        started = true;
        tl.play();
        setState('playing');
      },
      onUpdate: self => {
        if (started && !tl.paused() && self.progress > tl.progress()) catchUp.current = gsap.to(tl, { progress: self.progress, duration: 0.4, ease: 'power1.out', overwrite: true });
      },
    });
  });

  const control = () => {
    const tl = timeline.current;
    if (!tl) return;
    if (state === 'playing') {
      catchUp.current?.kill();
      tl.pause();
      setState('paused');
    } else if (state === 'done' || state === 'ready') {
      tl.restart();
      setState('playing');
    } else {
      tl.play();
      setState('playing');
    }
  };

  return (
    <figure ref={root} className={`demo ${className}`} aria-label={label}>
      <div aria-hidden="true" className="demo-art">
        {children}
      </div>
      <figcaption className="demo-bar">
        <span className="sr">{label}</span>
        <span className="demo-step" aria-hidden="true">
          {step}
        </span>
        <span className="demo-note">{note}</span>
        {state !== 'off' && (
          <button type="button" className="demo-btn" onClick={control}>
            {state === 'playing' ? 'Pause' : state === 'paused' ? 'Resume' : state === 'done' ? 'Replay' : 'Play'}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
