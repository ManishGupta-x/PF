export const links = {
  email: 'manishgupta220402@gmail.com',
  github: 'https://github.com/ManishGupta-X',
  linkedin: 'https://www.linkedin.com/in/manish-gupta-8861ba224/',
  resume: 'https://drive.google.com/file/d/1LCIeO9p8W49yqbNcLmb-CreENAlBRFMw/view?usp=sharing',
  chess: 'https://www.chess.com/member/nightmare_22',
  clips: 'https://allstar.gg/u/Nightmare_fuel?game=7302&view=Clips',
  location: 'New Delhi, India',
};

export const site = {
  url: 'https://dev.manishguptaji.co.in',
  title: 'Manish Gupta. Software Engineer & Full-Stack Developer',
  description:
    "I'm Manish Gupta, a software engineer building restaurant ecosystems, offline-first products, real-time platforms, and B2B SaaS.",
};

export const capabilities = [
  {
    title: 'Product engineering',
    rows: [
      'React and Next.js interfaces',
      'Desktop and web applications',
      'Customer ordering and operational tools',
      'Responsive, reusable interfaces',
    ],
  },
  {
    title: 'Systems & reliability',
    rows: [
      'Offline-first workflows',
      'Local persistence and synchronization',
      'Real-time interfaces',
      'Shared business rules',
      'API and database integration',
    ],
  },
];

export const ecosystemModules = [
  {
    id: 'customer',
    name: 'DropMyOrder-NEXT',
    role: 'Customer website',
    text: 'The main ordering experience: restaurant and menu browsing, cart, checkout, and the screens that follow an order after it is placed.',
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'PWA tooling'],
    link: { label: 'dropmyorder.com', href: 'https://dropmyorder.com/' },
  },
  {
    id: 'pos',
    name: 'OfflinePOS',
    role: 'Outlet billing',
    text: 'Bad internet? The restaurant still needs to bill. A desktop POS that keeps bills in local SQLite and has sync code to send queued work once the connection returns.',
    stack: ['Electron', 'Nextron', 'Next.js', 'React', 'SQLite'],
  },
  {
    id: 'backoffice',
    name: 'BackOffice',
    role: 'Outlet back office',
    text: "What an outlet's team runs the day from: menus, inventory, orders, reports, transactions and related workflows. It belongs to the outlet, not the warehouse.",
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Recharts'],
  },
  {
    id: 'warehouse',
    name: 'Inv-Next',
    role: 'Warehouse and superadmin',
    text: 'Warehouse stock, stock requests, transfers, packaging, merchant settlements, and the central administration of outlets and warehouses.',
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS'],
  },
];

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  context: string[];
  role: string;
  users: string;
  problem: string;
  decisions: { title: string; text: string }[];
  verified: string[];
  goals: { title: string; items: string[] };
  tech: { group: string; items: string[] }[];
  shots?: { src: string; alt: string; caption: string; width: number; height: number }[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'dropmyorder-ecosystem',
    number: '01',
    title: 'DropMyOrder Ecosystem',
    category: 'Company work / Restaurant operations',
    status: 'In use. Engineering work at my current company, DropMyOrder.',
    summary:
      'Connecting customer ordering, outlet operations, offline billing, and warehouse management in one restaurant ecosystem.',
    context: [
      'DropMyOrder is the company I work at. Its software began with a customer ordering website for a restaurant business in Shimla and grew into four applications that each serve a different part of the same operation.',
      'This is company work on company products. I am one of the engineers on them, not the founder or the owner.',
    ],
    role: 'Software engineer at DropMyOrder. I build across the customer website, the outlet back office, the desktop POS and the warehouse system, mostly on interfaces and the client-side logic behind them.',
    users:
      'Customers ordering food, outlet staff at the counter, outlet teams running the day, and warehouse and central administration staff.',
    problem:
      'An order touches customers, a counter, a kitchen, and the stock behind them. Connections are not always good, particularly for customers and outlets in the hills, so each application has to do its own job well and still fit the others.',
    decisions: [
      {
        title: 'The POS is a desktop app with a local database',
        text: 'OfflinePOS is an Electron and Nextron app with SQLite on the device. Database work runs in a worker behind a client module, apart from the interface, so a bill does not depend on a round trip to a server.',
      },
      {
        title: 'Sync is its own service',
        text: 'A sync service turns local bill rows into the shape the server expects, and the app tracks connection status over its websocket. That keeps the billing screen separate from the question of when an upload happens.',
      },
      {
        title: 'Outlet and warehouse stay separate applications',
        text: 'BackOffice answers to an outlet. Inv-Next has its own warehouse, warehouse-admin and superadmin areas. A stock request crosses between them without one team having to work inside the other team’s tool.',
      },
      {
        title: 'The customer site loads light',
        text: 'Customers in Shimla do not always have fast connections, so landing-page load time was a working constraint from the start. The site is a Next.js app with PWA tooling and a Redux cart.',
      },
    ],
    verified: [
      'Four applications in source: customer website, Electron POS, outlet back office, warehouse and superadmin.',
      'Local SQLite persistence and sync code in the POS.',
      'Warehouse, stock request, transfer, packaging, rack and merchant settlement screens in Inv-Next.',
      'Menu, inventory, reports, transactions, table and transfer screens in BackOffice.',
    ],
    goals: {
      title: 'What the design aims for',
      items: [
        'Keep the counter billing through connection drops, then catch up. This is a design goal, not a promise of uptime or of zero data loss.',
        'Let stock requests move between outlet and warehouse without manual reconciliation.',
      ],
    },
    tech: [
      { group: 'Customer website', items: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'PWA tooling'] },
      { group: 'OfflinePOS', items: ['Electron', 'Nextron', 'Next.js', 'React', 'Redux Toolkit', 'SQLite'] },
      { group: 'BackOffice', items: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Recharts'] },
      { group: 'Inv-Next', items: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Syncfusion grids'] },
    ],
    shots: [
      {
        src: '/images/dropmyorder-site.png',
        alt: 'The public DropMyOrder customer website, showing a restaurant banner, dish categories and outlet cards.',
        caption: 'The public customer website. The POS, back office and warehouse systems hold real business data, so they appear here only as drawings.',
        width: 1853,
        height: 916,
      },
    ],
    links: [{ label: 'dropmyorder.com', href: 'https://dropmyorder.com/' }],
  },
  {
    slug: 'dmo-saas',
    number: '02',
    title: 'DMO SaaS',
    category: 'B2B restaurant software / In development',
    status: 'In development. Not launched.',
    summary:
      'Building a B2B restaurant platform that brings offline billing, shared business rules, back-office operations, and delivery workflows into one product.',
    context: [
      'DMO SaaS is the product I am currently building to sell to restaurant businesses. It is a new codebase, separate from the applications I work on at DropMyOrder, and it is still in development.',
      'The two offline stories differ on purpose. The company’s OfflinePOS is an Electron desktop app. The SaaS counter is an installable web app whose database runs in the browser.',
    ],
    role: 'I am building it: the shared engine, the API, the counter, the back office and the rider app.',
    users:
      'Planned for restaurant counter staff, owners and managers in the back office, and a restaurant’s own delivery riders.',
    problem:
      'A bill has to come out the same on an offline counter and on the server. If pricing and tax rules live in two places, they eventually disagree, and that disagreement ends up in someone’s books.',
    decisions: [
      {
        title: 'One engine, two places',
        text: 'dmo-core holds money, India GST, pricing, POS rules, the sync protocol, ledger rules, schemas and receipt printing. The API and the counter both mount it as a submodule, so they run the same code.',
      },
      {
        title: 'Bills record which engine priced them',
        text: 'Any change to pricing or tax behaviour bumps an engine version that is stored on every bill, so an old bill can always be explained by the rules that made it.',
      },
      {
        title: 'A real database in the browser',
        text: 'The counter runs SQLite (WebAssembly) in a Web Worker and stores its file in the browser’s private storage. Unsynced bills on one device are capped at 500, so the limit is an explicit decision and not a surprise.',
      },
      {
        title: 'Tenancy enforced in Postgres',
        text: 'The API is Fastify and Zod over PostgreSQL with row-level security and immutability triggers. A pg-boss worker handles background jobs, and the back office generates its types from the OpenAPI file.',
      },
    ],
    verified: [
      'Shared engine with money, tax, pricing, POS rules, sync protocol, ledger rules and print packages, including property tests.',
      'Counter: pairing, catalogue pull, floor plan, orders, kitchen tickets and printing, bills, payments, voids and credit notes, business day close.',
      'Outbox push to the API, with pricing checked again on the server.',
      'Back office pages for menu, tables, printers and online orders.',
      'Online orders and own delivery, with a rider app for assigned deliveries, pickup, delivery and payment status.',
    ],
    goals: {
      title: 'Roadmap, not built yet',
      items: [
        'Inventory and warehouse: stock ledger, purchasing, transfers.',
        'Accounting core: journals, GST drafts, financial reports.',
        'Operating modes and kitchen displays.',
        'Public launch: plans, onboarding, pilot customers.',
      ],
    },
    tech: [
      { group: 'dmo-core', items: ['TypeScript', 'Vitest', 'fast-check'] },
      { group: 'dmo-api', items: ['Fastify', 'Zod', 'OpenAPI', 'PostgreSQL', 'pg-boss'] },
      { group: 'dmo-pos', items: ['React', 'Vite', 'SQLite WASM', 'Web Worker'] },
      { group: 'dmo-web', items: ['React', 'Vite', 'TanStack Router', 'TanStack Query', 'TanStack Table'] },
      { group: 'dmo-rider', items: ['React', 'Service worker'] },
      { group: 'dmo-site', items: ['Astro'] },
    ],
    links: [],
  },
  {
    slug: 'back2csgo',
    number: '03',
    title: 'Back2CSGO',
    category: 'Competitive gaming / Real-time platform',
    status: 'Live at back2csgo.com.',
    summary: 'A FACEIT-style competitive matchmaking experience for Counter-Strike: Global Offensive.',
    context: [
      'After Valve stopped supporting the original CS:GO servers, a close friend asked me to help bring the game back for the Indian community. Earlier versions of this work appeared on my portfolio as OmegaWorld. Back2CSGO is its current name.',
      '5,000+ hours in Counter-Strike. Then I started building around it. That figure is my own accumulated playtime, not a usage number for the platform.',
      'Back2CSGO is an independent project and is not affiliated with FACEIT.',
    ],
    role: 'I built the web frontend, the real-time server status layer and the ping measurement. In this app I also built the queue and lobby interface, the post-pairing map veto and the chat. Pairing and the game servers belong to a separate backend.',
    users: 'CS:GO players who want organised matches.',
    problem:
      'Ten people have to agree on the same match, the same teams and the same map at the same moment, from ten different clients, without anyone refreshing a page.',
    decisions: [
      {
        title: 'Everyone derives the same veto session',
        text: 'All ten clients compute one session id from the match id, or from a hash of the rosters and lobby codes when there is no match id, so they meet in one veto without asking anyone.',
      },
      {
        title: 'Ban order needs no coin flip',
        text: 'Bans alternate strictly between the teams, and the first team is derived from the session id, so both sides agree without another round trip. A team that lets the turn run out is resolved automatically.',
      },
      {
        title: 'The veto moved out of the lobby',
        text: 'Players used to pick maps before queueing. Now teams pair first and ban afterwards, and the app tells the backend the final map once. That is why the app became a Node server instead of a static export.',
      },
      {
        title: 'Chat follows the roster',
        text: 'Each channel docks under the roster that can read it: team, all, and the matchmaking room for the queue. There is no lobby chat, because before pairing there is no settled group to talk to.',
      },
    ],
    verified: [
      'Matchmaking and lobby interface, with a live connection over Socket.io.',
      'Post-pairing map veto, served by the app’s own API routes.',
      'Live server utilities.',
      'Team, all-match and queue chat.',
    ],
    goals: {
      title: 'What it is not claiming',
      items: [
        'No player counts or performance numbers appear here, because I have not verified them for publication.',
        'No anti-cheat guarantee.',
      ],
    },
    tech: [
      { group: 'Web app', items: ['Next.js', 'React', 'Tailwind CSS', 'Redux Toolkit'] },
      { group: 'Real time', items: ['Socket.io client', 'API routes for veto and chat'] },
    ],
    links: [{ label: 'back2csgo.com', href: 'https://back2csgo.com/' }],
  },
  {
    slug: 'jarvis',
    number: '04',
    title: 'Jarvis',
    category: 'Personal project / Discord music application',
    status: 'Early project, archived here. No live demo.',
    summary: 'A Discord music streaming application I began in 2019, with playback, playlists and audio filters.',
    context: [
      'Music led me to build Jarvis. Gaming led me to build Back2CSGO.',
      'Jarvis started in 2019, when music bots were all over Discord and I wanted my own. It took around a year of work to make it stable, and it was one of the first real things I shipped to other people.',
    ],
    role: 'I built it myself, as a personal project.',
    users: 'Discord servers, and later mostly friends and people close to me.',
    problem:
      'A music bot looks like a queue and a play button. Running one means handling voice connections, shared server state, playlists that outlive a restart, and real hosting costs.',
    decisions: [
      {
        title: 'Discord.js and DisTube for the audio layer',
        text: 'Discord.js handled commands and voice while DisTube handled playback, queues and filters. That left me free to work on the features people actually asked for.',
      },
      {
        title: 'MongoDB for what should outlive a session',
        text: 'User data and playlists went into MongoDB, so a playlist did not disappear with the process.',
      },
      {
        title: 'Filters and playlists, free',
        text: 'Audio filters and saved playlists drew people in. Keeping it running taught me how bots behave in real servers and what deployment costs when you are paying for it yourself.',
      },
    ],
    verified: [
      'Music playback, queueing, playlists and audio filters.',
      'User and playlist data stored in MongoDB.',
      'Source is public on GitHub.',
    ],
    goals: {
      title: 'How it ended',
      items: [
        'Platform restrictions on music bots made further public growth impractical, so I kept it for listening with friends.',
        'Presented as an early project. I have not verified that it is available today.',
      ],
    },
    tech: [{ group: 'Application', items: ['JavaScript', 'Node.js', 'Discord.js', 'DisTube', 'MongoDB'] }],
    shots: [
      {
        src: '/images/jarvis-play.png',
        alt: 'A Discord conversation where a play command returns Jarvis messages reading Added to Queue and Now Playing.',
        caption: 'The real thing: a play command, then Added to Queue and Now Playing.',
        width: 727,
        height: 433,
      },
    ],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/ManishGupta-x/Jarvis' }],
  },
];

export const gaming = {
  hours: '5,000+',
  rank: 'Legendary Eagle Master',
  openings: { black: 'Caro-Kann', white: 'Stonewall' },
  // A parts list from my earlier page. It may not match the current build exactly.
  specs: [
    ['CPU', 'Ryzen 5 7600X 6-Core'],
    ['GPU', 'NVIDIA RTX 4060'],
    ['RAM', 'A-Data 16GB DDR5 5200MHz'],
    ['Storage', '1TB NVMe WD_BLACK SN770 SSD'],
    ['Motherboard', 'ASUS B650M-AYW WIFI'],
    ['PSU', '750W MSI Bronze'],
    ['Cooling', 'DeepCool Mystique 240mm ARGB'],
    ['Case', 'Deepcool CH370 White'],
    ['Monitor', 'LG UltraGear 180Hz 24gs60f-B'],
    ['Keyboard', 'Logitech G213'],
    ['Mouse', 'Logitech G102'],
  ],
  clips: {
    csgo: [
      { title: 'Dust 2 crazy scenes', id: 'RtyeFe6HYrA' },
      { title: 'Mirage no-scope', id: 'qyIrDyOVt3A' },
      { title: 'Ancient, last man alive clutch', id: '-5YEfQaLvoE' },
      { title: 'Mirage clutch', id: 'w0pobV-zsks' },
      { title: 'Shot of the universe', id: 'XmnbqohcwiY' },
      { title: '2x no-scope', id: '4igLJOebNMY' },
    ],
    cs2: [
      { title: 'Dust 2, one-position clutch', id: 'A5Ba0fhAKCE' },
      { title: 'D2 B site window no-scope', id: 'HC2Q1U771b4' },
      { title: 'D2 AK clutch', id: '0K82wS4F3CI' },
      { title: 'D2 AWP clutch', id: 'uJcXExmXOYo' },
      { title: 'No reaction time', id: 'NarHP7unzGU' },
      { title: 'Flying AWP kill', id: 'FRKPkQsV898' },
      { title: 'Another flying AWP kill', id: 'c6lQplqfBnQ' },
      { title: 'Sad for the Bizon one', id: 'X6Co64K49wg' },
      { title: 'Failed clutch', id: 'nvkBLpjYYIo' },
      { title: 'D2 4K clutch', id: 'gYDlxyHmjAA' },
      { title: 'D2 3K clutch', id: 'iBsMoVLplt0' },
      { title: '1v7 Mirage casual clutch', id: 'xzbe8cH16nM' },
      { title: 'Casual D2 1v8 clutch', id: 'dOzuLJsahFw' },
      { title: 'Casual Mirage 1v8 clutch', id: 'DG0EXe2gRJg' },
    ],
    tournament: [{ title: 'Tournament match highlights', id: '_KNfUqAr8WI' }],
  },
};
