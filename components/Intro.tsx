'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import { smoothPath, type Point } from '@/lib/motion';

const pts = (s: string) => s.split(' ').map(p => p.split(',').map(Number) as Point);

// One signature, stroke by stroke, in the order the pen moves. A repeated point makes a sharp turn.
const STROKES = [
  { at: 0.15, for: 1.25, d: '-40,478 130,462 270,392 400,262 470,182 470,182 430,330 372,492 372,492 450,330 530,225 592,176 592,176 555,330 512,476 512,476 545,462 590,430 590,430 562,428 540,450 546,474 572,462 598,428 590,462 612,474 640,438 640,438 626,476 626,476 656,444 680,434 672,464 692,474 722,438 712,466 732,474 768,430 768,430 778,456 756,478 734,472 734,472 772,472 812,440 862,352 888,306 888,306 852,384 814,478 814,478 846,442 874,434 866,464 888,474 925,468' },
  { at: 1.42, for: 1.35, d: '1136,246 1108,206 1060,206 985,256 925,340 902,425 925,482 985,472 1055,422 1102,372 1102,372 1066,455 1005,565 948,642 928,650 932,620 996,540 1076,482 1116,440 1116,440 1106,466 1124,474 1156,440 1156,440 1146,466 1164,474 1198,438 1198,438 1168,530 1150,572 1150,572 1178,480 1208,444 1234,436 1226,464 1190,478 1190,478 1242,472 1274,438 1306,372 1306,372 1276,444 1276,470 1298,462 1336,436 1336,436 1308,438 1294,462 1308,474 1338,438 1338,438 1330,466 1348,474 1410,464 1490,452' },
  { at: 2.8, for: 0.14, d: '1240,418 1330,404' },
  { at: 2.96, for: 0.06, d: '697,414 698,416' },
];

// Server-rendered but display:none unless the head script in layout.tsx adds .js-intro, which it does
// once per tab session and never under reduced motion. The drawing and the fade are CSS, so a failed
// script can't leave the page covered; this only tells the page when to start and lets people skip.
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const html = document.documentElement;
    if (!html.classList.contains('js-intro')) return;
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
    const finish = () => {
      if ('signed' in html.dataset) return;
      html.dataset.signed = '';
      dispatchEvent(new Event('signed'));
    };
    const skip = () => {
      el.style.animation = 'intro-out .25s forwards';
      finish();
      events.forEach(e => removeEventListener(e, skip));
    };
    events.forEach(e => addEventListener(e, skip, { passive: true }));
    Promise.all(el.querySelector('svg')!.getAnimations({ subtree: true }).map(a => a.finished)).then(() => {
      finish();
      events.forEach(e => removeEventListener(e, skip));
    }, () => {});
    return () => events.forEach(e => removeEventListener(e, skip));
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <svg viewBox="0 120 1440 580">
        {STROKES.map(s => (
          <path key={s.at} d={smoothPath(pts(s.d))} pathLength={1} style={{ animationDelay: `${s.at}s`, animationDuration: `${s.for}s` } as CSSProperties} />
        ))}
      </svg>
    </div>
  );
}
