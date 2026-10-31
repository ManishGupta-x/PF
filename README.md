# Manish Gupta portfolio

Next.js 15, TypeScript, GSAP + ScrollTrigger, plain CSS.

```bash
npm install
npm run dev                      # http://localhost:3000
npm run build && npm start -- -p 3100
npm run check                    # browser checks against :3100, needs Chrome
```

- Copy, project facts and links: `lib/content.ts`
- The orange thread: `components/Thread.tsx`. Every `[data-t]` element in document order adds to one line.
- Project sequences: `components/demos/`. Markup is the final state, and timelines only replay it.
