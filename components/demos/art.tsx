// Original line drawings shared by the project stages. Stroke follows currentColor.

export const Rack = ({ rows = 4 }: { rows?: number }) => (
  <svg viewBox={`0 0 120 ${rows * 30 + 12}`} className="line">
    <rect x="1" y="1" width="118" height={rows * 30 + 10} rx="3" />
    {Array.from({ length: rows }, (_, i) => (
      <g key={i} transform={`translate(8 ${8 + i * 30})`}>
        <rect width="104" height="24" rx="1.5" />
        <circle className="led" cx="10" cy="12" r="2.6" />
        <circle cx="19" cy="12" r="2.6" />
        {[40, 48, 56, 64, 72, 80, 88].map(x => (
          <path key={x} d={`M${x} 7 V17`} />
        ))}
      </g>
    ))}
  </svg>
);

export const Cylinder = () => (
  <svg viewBox="0 0 100 120" className="line cyl">
    <path d="M4 16 V104 C4 112 24 118 50 118 C76 118 96 112 96 104 V16" />
    <ellipse cx="50" cy="16" rx="46" ry="14" />
    <path d="M4 46 C4 54 24 60 50 60 C76 60 96 54 96 46" />
    <path d="M4 76 C4 84 24 90 50 90 C76 90 96 84 96 76" />
  </svg>
);

export const Boxes = () => (
  <svg viewBox="0 0 220 150" className="line">
    {[
      [6, 76],
      [80, 76],
      [43, 8],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
        <rect width="70" height="66" />
        <path d="M28 0 V20 H42 V0 M8 54 H24 M8 48 H18" />
      </g>
    ))}
    <path d="M160 142 V60 M160 60 H214 M214 60 V142 M154 142 H220 M160 100 H214 M170 142 V112 H204 V142" />
    <path d="M0 142 H150" />
  </svg>
);

export const Headphones = () => (
  <svg viewBox="0 0 200 200" className="line">
    <path d="M26 118 C26 54 58 18 100 18 C142 18 174 54 174 118" />
    <path d="M38 118 C38 66 64 32 100 32 C136 32 162 66 162 118" />
    <rect x="10" y="108" width="34" height="62" rx="14" />
    <rect x="156" y="108" width="34" height="62" rx="14" />
    <path d="M18 120 V158 M182 120 V158" />
  </svg>
);

const PIECES: Record<string, string> = {
  p: 'M50 22 a11 11 0 1 1 -.1 0 M41 44 C43 56 41 62 34 74 H66 C59 62 57 56 59 44 M30 80 H70',
  r: 'M32 22 H40 V30 H46 V22 H54 V30 H60 V22 H68 V40 L62 46 V68 L68 74 H32 L38 68 V46 L32 40 Z M28 80 H72',
  n: 'M36 74 C36 58 50 54 50 44 L38 50 L30 42 C38 28 44 18 58 18 C70 22 72 46 68 74 Z M28 80 H72 M50 28 h1',
  b: 'M50 14 a5 5 0 1 1 -.1 0 M50 24 C62 34 64 46 58 54 H42 C36 46 38 34 50 24 Z M42 58 L36 74 H64 L58 58 M28 80 H72 M46 40 H54 M50 36 V44',
  q: 'M28 30 L38 56 L42 26 L50 54 L58 26 L62 56 L72 30 L64 74 H36 Z M28 80 H72',
  k: 'M50 12 V24 M44 18 H56 M50 28 C66 22 74 40 62 56 L60 74 H40 L38 56 C26 40 34 22 50 28 Z M28 80 H72',
};

export const Piece = ({ kind, ...rest }: { kind: string } & React.SVGProps<SVGGElement>) => (
  <g {...rest}>
    <path d={PIECES[kind]} />
  </g>
);
