'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import { smoothPath, type Point } from '@/lib/motion';

const SLANT = 0.26; // the italic lean: sideways shift per unit of height above the baseline
const BASELINE = 470;
const pts = (s: string) =>
  s.split(' ').map(p => {
    const [x, y] = p.split(',').map(Number);
    return [x + (BASELINE - y) * SLANT, y] as Point;
  });

// One signature, stroke by stroke, in the order the pen moves. Each turn is a few close points, which keeps it round.
const STROKES = [
  { at: 0.05, for: 1.35, d: '-420,492 -160,486 60,472 220,420 340,310 420,215 462,172 480,168 476,205 448,320 410,430 390,482 384,492 396,478 430,395 485,285 545,205 588,170 604,172 598,215 568,330 540,425 532,462 546,478 572,462 600,436 580,428 556,444 552,466 568,476 590,458 606,434 602,458 612,474 630,470 652,440 664,436 660,456 652,474 668,450 686,436 698,440 694,460 700,474 716,470 734,440 730,462 740,474 758,466 780,436 790,456 778,472 758,476 778,478 800,468 832,430 872,360 894,312 888,298 872,320 848,390 828,466 824,482 840,448 862,434 878,440 874,460 882,474 905,470 932,456' },
  { at: 1.42, for: 1.35, d: '1140,262 1128,222 1090,205 1040,222 985,270 935,345 912,420 925,472 965,482 1015,458 1065,415 1100,378 1110,370 1106,395 1075,470 1020,565 965,635 938,655 928,640 945,600 1000,540 1070,490 1100,462 1122,440 1118,462 1128,476 1148,462 1166,440 1162,462 1172,476 1192,462 1212,440 1196,490 1176,550 1158,578 1150,570 1160,530 1190,468 1214,444 1238,436 1246,450 1230,470 1205,478 1225,478 1255,462 1290,410 1314,368 1306,362 1290,400 1274,450 1274,470 1288,476 1312,462 1340,438 1320,430 1298,446 1294,466 1308,476 1330,458 1348,436 1344,460 1354,476 1420,468 1560,452 1760,440 2100,430' },
  { at: 2.8, for: 0.14, d: '1254,420 1340,406' },
  { at: 2.96, for: 0.06, d: '708,414 709,416' },
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
      <svg viewBox="-90 -70 1880 980">
        {STROKES.map(s => (
          <path key={s.at} d={smoothPath(pts(s.d))} pathLength={1} style={{ animationDelay: `${s.at}s`, animationDuration: `${s.for}s` } as CSSProperties} />
        ))}
      </svg>
    </div>
  );
}
