'use client';
import Demo, { type Build } from '@/components/Demo';
import { Piece } from './art';

const FILES = 'abcdefgh';
const BACK = 'rnbqkbnr';
const MOVES = [
  { san: 'e4', piece: 'wpe', from: 'e2', to: 'e4' },
  { san: 'c6', piece: 'bpc', from: 'c7', to: 'c6' },
  { san: 'd4', piece: 'wpd', from: 'd2', to: 'd4' },
  { san: 'd5', piece: 'bpd', from: 'd7', to: 'd5' },
];
const xy = (sq: string) => [FILES.indexOf(sq[0]) * 100, (8 - Number(sq[1])) * 100];

// Starting position with the four moves already played, which is the held final state.
const pieces = [
  ...[...BACK].map((k, i) => ({ id: `wb${i}`, kind: k, sq: `${FILES[i]}1`, dark: false })),
  ...[...BACK].map((k, i) => ({ id: `bb${i}`, kind: k, sq: `${FILES[i]}8`, dark: true })),
  ...[...FILES].map(f => ({ id: `wp${f}`, kind: 'p', sq: MOVES.find(m => m.piece === `wp${f}`)?.to ?? `${f}2`, dark: false })),
  ...[...FILES].map(f => ({ id: `bp${f}`, kind: 'p', sq: MOVES.find(m => m.piece === `bp${f}`)?.to ?? `${f}7`, dark: true })),
];

const build: Build = (tl, q, step) => {
  tl.call(step, ['The Caro-Kann, from the start.']);
  // Each piece's svg transform holds its final square, so tween the attribute back from its origin.
  MOVES.forEach((m, i) => {
    const [fx, fy] = xy(m.from);
    const [tx, ty] = xy(m.to);
    const num = Math.floor(i / 2) + 1;
    tl.fromTo(
      q(`.piece-${m.piece}`),
      { attr: { transform: `translate(${fx} ${fy})` } },
      { attr: { transform: `translate(${tx} ${ty})` }, duration: 0.55, ease: 'power2.inOut' },
      i === 0 ? '+=0.3' : '+=0.45',
    )
      .call(step, [i % 2 ? `${num}... ${m.san}` : `${num}. ${m.san}`], '<')
      .from(q(`.mv-${i}`), { opacity: 0.2, duration: 0.2 }, '<');
  });
};

export default function Board() {
  return (
    <Demo
      className="board-demo"
      label="A chessboard plays the first moves of the Caro-Kann: 1. e4 c6 2. d4 d5, then holds the final position."
      finalStep="1. e4 c6 2. d4 d5"
      note="Illustrative opening, not one of my games."
      build={build}
    >
      <svg viewBox="-24 -4 828 828" className="board">
        {Array.from({ length: 64 }, (_, i) => {
          const x = (i % 8) * 100;
          const y = Math.floor(i / 8) * 100;
          return (x + y) % 200 ? <rect key={i} className="sq-dark" x={x} y={y} width="100" height="100" /> : null;
        })}
        <rect className="board-edge" width="800" height="800" />
        {[...FILES].map((f, i) => <text key={f} x={i * 100 + 50} y="822" textAnchor="middle">{f}</text>)}
        {[8, 7, 6, 5, 4, 3, 2, 1].map((r, i) => <text key={r} x="-12" y={i * 100 + 58} textAnchor="middle">{r}</text>)}
        <path className="board-trail" d="M350 150 V350" />
        {pieces.map(p => {
          const [x, y] = xy(p.sq);
          return <Piece key={p.id} kind={p.kind} className={`${p.dark ? 'pc pc--dark' : 'pc'} piece-${p.id}`} transform={`translate(${x} ${y})`} />;
        })}
      </svg>
      <p className="board-moves">
        <span className="tiny dim">1.</span> <b className="mv-0">e4</b> <b className="mv-1">c6</b> <span className="tiny dim">2.</span> <b className="mv-2">d4</b> <b className="mv-3">d5</b>
      </p>
    </Demo>
  );
}
