import type { IconType } from 'react-icons';
import {
  SiAndroid, SiAstro, SiCplusplus, SiCss, SiDiscorddotjs, SiElectron, SiExpress, SiFastify, SiGit, SiGithub, SiGooglechrome,
  SiHtml5, SiJavascript, SiJetpackcompose, SiKotlin, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiOpenapiinitiative, SiOpenjdk, SiPnpm,
  SiPostgresql, SiPostman, SiPrisma, SiPwa, SiPython, SiReact, SiRedux, SiSelenium, SiSocketdotio, SiSqlite,
  SiTailwindcss, SiTanstack, SiTypescript, SiVite, SiVitest, SiZod,
} from 'react-icons/si';
import { TbBrandVscode, TbCloudOff, TbCpu, TbDice5, TbSql } from 'react-icons/tb';
import { projects } from '@/lib/content';

// `uses` names the entries in a project's tech list that count as this tool; it defaults to the tool's name.
export type Tool = { name: string; icon: IconType; uses?: string[]; note?: string };

export const toolkit: { title: string; tools: Tool[] }[] = [
  {
    title: 'Languages',
    tools: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Kotlin', icon: SiKotlin },
      { name: 'SQL', icon: TbSql, uses: ['PostgreSQL', 'SQLite', 'SQLite WASM'] },
      { name: 'C++', icon: SiCplusplus, note: 'Where I started, with competitive programming.' },
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: SiOpenjdk },
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
    ],
  },
  {
    title: 'Frontend',
    tools: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Astro', icon: SiAstro },
      { name: 'Vite', icon: SiVite },
      { name: 'Redux Toolkit', icon: SiRedux },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'TanStack', icon: SiTanstack, uses: ['TanStack Router', 'TanStack Query', 'TanStack Table'] },
    ],
  },
  {
    title: 'Desktop, mobile & offline',
    tools: [
      { name: 'Android', icon: SiAndroid },
      { name: 'Jetpack Compose', icon: SiJetpackcompose },
      { name: 'Electron', icon: SiElectron },
      { name: 'PWA tooling', icon: SiPwa },
      { name: 'Web Workers', icon: TbCpu, uses: ['Web Worker'] },
      { name: 'Service workers', icon: TbCloudOff, uses: ['Service worker'] },
    ],
  },
  {
    title: 'Backend & real time',
    tools: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Fastify', icon: SiFastify },
      { name: 'Express', icon: SiExpress },
      { name: 'Zod', icon: SiZod },
      { name: 'OpenAPI', icon: SiOpenapiinitiative },
      { name: 'Socket.io', icon: SiSocketdotio, uses: ['Socket.io client'] },
      { name: 'Discord.js', icon: SiDiscorddotjs },
    ],
  },
  {
    title: 'Data',
    tools: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'SQLite', icon: SiSqlite, uses: ['SQLite', 'SQLite WASM'] },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Prisma', icon: SiPrisma },
    ],
  },
  {
    title: 'Testing & tools',
    tools: [
      { name: 'Vitest', icon: SiVitest },
      { name: 'fast-check', icon: TbDice5 },
      { name: 'Selenium', icon: SiSelenium },
      { name: 'pnpm', icon: SiPnpm, uses: ['pnpm workspaces'] },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: TbBrandVscode },
      { name: 'Postman', icon: SiPostman },
      { name: 'Chrome DevTools', icon: SiGooglechrome },
    ],
  },
];

const byName = new Map(toolkit.flatMap(group => group.tools).map(tool => [tool.name, tool]));
export const toolsNamed = (names: string[]) =>
  names.map(name => {
    const tool = byName.get(name);
    if (!tool) throw new Error(`Unknown tool: ${name}`);
    return tool;
  });

// Derived from each project's tech list, so this page cannot drift from the case studies.
export const projectsUsing = (tool: Tool) => {
  const names = tool.uses ?? [tool.name];
  return projects.filter(p => p.tech.some(group => group.items.some(item => names.includes(item))));
};
export const shortTitle = (title: string) => title.replace(' Ecosystem', '');

export const areas = [
  {
    number: '01',
    title: 'Product interfaces',
    short: 'Customer and operations screens that stay clear at the pace of real work.',
    summary: 'The screens people depend on during service: a customer placing an order, a counter taking payment, a manager checking stock. Each role gets a workspace focused on its own job.',
    points: [
      'Customer ordering from restaurant discovery and menu browsing through cart, checkout, and order updates.',
      'Separate workspaces by responsibility: BackOffice for outlet teams, Inv-Next for warehouse and central administration.',
      'Android apps for the people away from a desk: delivery riders, and outlet and warehouse staff.',
      'Dedicated Next.js applications for each Service Hub role, sharing an API and a UI package.',
      'Loading performance treated as a design constraint, shaped by limited connectivity in Shimla.',
    ],
    tools: ['React', 'Next.js', 'Astro', 'Android', 'Jetpack Compose', 'Redux Toolkit', 'Tailwind CSS', 'TanStack'],
    seenIn: ['dropmyorder-ecosystem', 'service-hub', 'dmo-saas'],
  },
  {
    number: '02',
    title: 'Offline-first systems',
    short: 'Software that keeps the counter working when the internet does not.',
    summary: 'A restaurant still has to bill when the connection drops. That makes local storage and synchronization product decisions, not background details.',
    points: [
      'An Electron POS with on-device SQLite, so bills do not wait on a server response.',
      'Database work kept apart from the interface to keep the billing workflow responsive.',
      'A dedicated service prepares local transactions for upload, while connection status decides when they sync.',
      'SQLite WebAssembly in a Web Worker for a browser counter, with an explicit limit on unsynced bills.',
      'A rider app that saves each pickup and delivery on the phone first, then uploads them when it can.',
    ],
    tools: ['Electron', 'Android', 'SQLite', 'Web Workers', 'PWA tooling', 'Service workers'],
    seenIn: ['dropmyorder-ecosystem', 'dmo-saas'],
  },
  {
    number: '03',
    title: 'Real-time experiences',
    short: 'Queues, lobbies, and chat that keep every participant on the same step.',
    summary: 'When ten players are choosing a map, everyone needs to see the same state and know what happens next.',
    points: [
      'Matchmaking queues and lobby interfaces connected through Socket.io.',
      'A post-pairing map veto where clients derive the same session from match or roster data, with timeouts that keep selection moving.',
      'Team, match-wide, and queue chat that follows the right participants.',
      'Live server discovery, status, and ping measurement.',
      'Shared Discord listening with coordinated queues and audio filters.',
    ],
    tools: ['Socket.io', 'Next.js', 'Discord.js', 'Node.js'],
    seenIn: ['back2csgo', 'jarvis'],
  },
  {
    number: '04',
    title: 'Shared business logic',
    short: 'One tested source of truth for the rules that decide a bill.',
    summary: 'An offline counter and a connected server have to reach the same total. Keeping pricing and tax rules in one place makes that part of the architecture.',
    points: [
      'Shared packages for money, India GST, pricing, POS rules, synchronization, and receipts, used by both counter and API.',
      'Every bill records the engine version that calculated it, so rule changes stay traceable.',
      'Server-side pricing validation for transactions created offline.',
      'Automated checks on the shared packages with Vitest and fast-check.',
    ],
    tools: ['TypeScript', 'Vitest', 'fast-check', 'pnpm'],
    seenIn: ['dmo-saas'],
  },
  {
    number: '05',
    title: 'APIs & data',
    short: 'Typed contracts and data models that hold up across connected products.',
    summary: 'Contracts between services and clear rules around data keep connected applications from drifting apart.',
    points: [
      'Fastify and Zod over PostgreSQL, with row-level security and immutability rules.',
      'An OpenAPI contract connecting the API to the back office, and pg-boss for background work.',
      'A Prisma and PostgreSQL stock ledger tracking parts received, reserved, fitted, and returned.',
      'MongoDB persistence that keeps users and playlists available across restarts.',
    ],
    tools: ['Fastify', 'Zod', 'OpenAPI', 'PostgreSQL', 'Prisma', 'MongoDB'],
    seenIn: ['dmo-saas', 'service-hub', 'jarvis'],
  },
];
