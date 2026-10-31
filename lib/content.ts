export const links = {
  email: 'manishgupta220402@gmail.com',
  github: 'https://github.com/ManishGupta-X',
  linkedin: 'https://www.linkedin.com/in/manish-gupta-8861ba224/',
  resume: 'https://drive.google.com/file/d/1m-s1q6Kk_KxTueWkdT7KF3bHzmPpPiqc/view?usp=sharing',
  chess: 'https://www.chess.com/member/nightmare_22',
  clips: 'https://allstar.gg/u/Nightmare_fuel?game=7302&view=Clips',
  location: 'New Delhi, India',
};

export const site = {
  url: 'https://dev.manishguptaji.co.in',
  title: 'Manish Gupta — Software Engineer',
  description:
    'Software engineer at DropMyOrder, building connected products for restaurant operations, field service, and online communities.',
};

export const ecosystemModules = [
  {
    id: 'customer',
    name: 'DropMyOrder-NEXT',
    role: 'Customer ordering',
    text: 'A responsive ordering experience that takes customers from restaurant discovery and menu browsing through cart, checkout, and order updates.',
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'PWA tooling'],
    link: { label: 'dropmyorder.com', href: 'https://dropmyorder.com/' },
  },
  {
    id: 'pos',
    name: 'OfflinePOS',
    role: 'Outlet billing',
    text: 'Bad internet? The restaurant still needs to bill. An offline-first desktop POS stores bills locally and synchronizes queued transactions when connectivity returns.',
    stack: ['Electron', 'Nextron', 'Next.js', 'React', 'SQLite'],
  },
  {
    id: 'backoffice',
    name: 'BackOffice',
    role: 'Outlet back office',
    text: 'The workspace for day-to-day outlet operations: manage menus, inventory, orders, reports, and transactions in one place.',
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Recharts'],
  },
  {
    id: 'warehouse',
    name: 'Inv-Next',
    role: 'Warehouse & central administration',
    text: 'Central tools for warehouse stock, outlet requests, transfers, packaging, and merchant settlements, with dedicated warehouse and superadmin workflows.',
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS'],
  },
  {
    id: 'delivery',
    name: 'Delivery Boy',
    role: 'Delivery riders',
    text: 'An Android app for riders. New orders arrive over a live connection, a QR scan confirms each pickup, and every delivery records payment and location. Events are saved on the phone first and uploaded when the signal allows.',
    stack: ['Kotlin', 'Android', 'WebSocket', 'SQLite', 'WorkManager', 'CameraX', 'ML Kit'],
  },
  {
    id: 'workforce',
    name: 'DMO Workforce',
    role: 'Outlet & warehouse staff',
    text: 'An Android app for the daily stock routine: closing and wastage counts with saved drafts, manager-set entry checks, stock orders and deliveries, combo prep, and closing-time reminders.',
    stack: ['Kotlin', 'Android', 'Jetpack Compose', 'Room', 'Retrofit'],
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
    category: 'Restaurant technology / Company project',
    status: 'In use at DropMyOrder',
    summary:
      'A connected restaurant ecosystem spanning customer ordering, offline billing, outlet operations, warehouse management, delivery, and staff apps.',
    context: [
      'At DropMyOrder, I work on the software behind restaurant operations in Shimla. What began as a customer ordering website grew into a suite of applications for customers, outlet teams, riders, and central operations.',
      'The ecosystem connects six distinct products: the customer website, OfflinePOS, outlet BackOffice, the Inv-Next warehouse and superadmin system, the Delivery Boy rider app, and the DMO Workforce staff app.',
    ],
    role: 'Software engineering across the customer website, desktop POS, outlet back office, warehouse system, and Android apps, with a focus on interfaces, client-side workflows, and data integration.',
    users:
      'Customers, counter staff, outlet managers, warehouse teams, delivery riders, and central administrators.',
    problem:
      'Restaurant software has to work at the pace of service. Orders, billing, stock requests, and deliveries need to stay connected, even when customers, outlets, and riders have unreliable internet access.',
    decisions: [
      {
        title: 'Local-first billing',
        text: 'Electron, Nextron, and on-device SQLite let the counter create bills without waiting for a server response. Database work runs separately from the interface to keep the billing workflow responsive.',
      },
      {
        title: 'Synchronization as a separate concern',
        text: 'A dedicated service prepares local transactions for upload, while connection status determines when they can sync. The billing interface stays focused on the task at the counter.',
      },
      {
        title: 'Workspaces built around team responsibilities',
        text: 'BackOffice serves outlet teams; Inv-Next handles warehouse and central administration. Each team gets a focused workspace, with stock requests connecting the two.',
      },
      {
        title: 'Performance shaped by real conditions',
        text: 'Limited connectivity in Shimla made loading performance a design constraint from the start. The customer experience uses Next.js, PWA tooling, and a Redux cart.',
      },
      {
        title: 'Handovers recorded on the phone first',
        text: 'Delivery Boy writes each pickup and delivery to on-device SQLite before updating the screen. A sync loop uploads them, with WorkManager as a backstop, while a foreground service keeps the live order connection open.',
      },
      {
        title: 'One set of entry rules on web and Android',
        text: 'Managers’ checks on closing and wastage counts run in both Inv-Next and DMO Workforce. Both implementations are checked against the same shared test cases, so a rule behaves the same on either screen.',
      },
    ],
    verified: [
      'Customer ordering, cart, checkout, and order updates.',
      'Desktop billing with local SQLite storage and transaction synchronization.',
      'Warehouse stock, requests, transfers, packaging, and merchant settlements.',
      'Outlet menus, inventory, reporting, transactions, and table management.',
      'Live rider orders, QR-confirmed pickups, and delivery completion with payment mode and location.',
      'Closing and wastage counts with saved drafts, stock orders and deliveries, combo prep, and closing-time reminders. Staff training lessons and quizzes are built, and not yet switched on.',
    ],
    goals: {
      title: 'Design priorities',
      items: [
        'Keep the counter usable during connectivity interruptions and synchronize pending work after reconnection.',
        'Give outlet and warehouse teams a clear, shared stock-request workflow.',
        'Keep a rider’s pickups and deliveries, and a half-typed stock count, safe through a dropped signal or a closed app.',
      ],
    },
    tech: [
      { group: 'Customer website', items: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'PWA tooling'] },
      { group: 'OfflinePOS', items: ['Electron', 'Nextron', 'Next.js', 'React', 'Redux Toolkit', 'SQLite'] },
      { group: 'BackOffice', items: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Recharts'] },
      { group: 'Inv-Next', items: ['Next.js', 'React', 'Redux Toolkit', 'Tailwind CSS', 'Syncfusion grids'] },
      { group: 'Delivery Boy', items: ['Kotlin', 'Android', 'WebSocket', 'SQLite', 'WorkManager', 'CameraX', 'ML Kit'] },
      { group: 'DMO Workforce', items: ['Kotlin', 'Android', 'Jetpack Compose', 'Room', 'Retrofit'] },
    ],
    shots: [
      {
        src: '/images/dropmyorder/live-home.webp',
        alt: 'The current DropMyOrder website with the From Queen of Hills hero, outlet cards, food categories and popular dishes.',
        caption: 'Customer discovery / Captured from dropmyorder.com on 31 October 2026.',
        width: 2560,
        height: 1440,
      },
    ],
    links: [{ label: 'In Shimla? Order on dropmyorder.com', href: 'https://dropmyorder.com/' }],
  },
  {
    slug: 'dmo-saas',
    number: '02',
    title: 'DMO SaaS',
    category: 'B2B SaaS / Restaurant operations',
    status: 'In development',
    summary:
      'A B2B restaurant platform connecting offline billing, shared business logic, back-office operations, and delivery.',
    context: [
      'DMO SaaS brings the core workflows of a restaurant into a product for other businesses. I am building it as a new platform, with a shared engine connecting the counter, API, back office, and rider app.',
      'Unlike the existing Electron-based OfflinePOS, this counter is an installable web app with a local browser database. The product is currently in development.',
    ],
    role: 'Full-stack product development across the shared business engine, API, offline counter, back office, and rider application.',
    users:
      'Designed for restaurant counter staff, owners, managers, and in-house delivery riders.',
    problem:
      'An offline counter and a connected server need to calculate the same bill. Duplicated pricing and tax logic creates discrepancies, so consistency has to be part of the architecture.',
    decisions: [
      {
        title: 'One source of business logic',
        text: 'The counter and API use the same dmo-core packages for money, India GST, pricing, POS rules, synchronization, and receipts. Shared code keeps both sides aligned.',
      },
      {
        title: 'Traceable pricing decisions',
        text: 'Each bill records the engine version used to calculate it. Changes to pricing and tax rules remain traceable to the transactions they produced.',
      },
      {
        title: 'An offline counter built for the browser',
        text: 'SQLite WebAssembly runs in a Web Worker with persistent browser storage. An explicit limit on unsynced bills makes offline capacity a deliberate product decision.',
      },
      {
        title: 'Tenant-aware data and typed contracts',
        text: 'Fastify and Zod sit over PostgreSQL with row-level security and immutability rules. OpenAPI connects the API contract to the back office, while pg-boss handles background work.',
      },
    ],
    verified: [
      'Shared pricing, tax, POS, synchronization, and receipt packages with automated checks.',
      'Counter workflows for orders, kitchen tickets, payments, credit notes, and business-day close.',
      'Offline transaction outbox with server-side pricing validation.',
      'Back-office tools for menus, tables, printers, and online orders.',
      'Rider workflows for assigned deliveries, pickup, completion, and payment status.',
    ],
    goals: {
      title: 'What’s next',
      items: [
        'Inventory, warehouse stock, purchasing, and transfers.',
        'Accounting workflows, GST drafts, and financial reporting.',
        'Kitchen displays and additional operating modes.',
        'Product plans, onboarding, and a pilot launch.',
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
    category: 'Gaming / Real-time platform',
    status: 'Live at back2csgo.com',
    summary: 'A community matchmaking platform bringing competitive CS:GO players from the queue to the server.',
    context: [
      'A friend asked me to help create a place for the Indian community to keep playing the original CS:GO. The result is Back2CSGO, previously known as OmegaWorld: an independent platform for organized matches and community play.',
      'After 5,000+ hours in Counter-Strike, I brought a player’s perspective to the queue, lobby, map selection, and server-connection experience.',
    ],
    role: 'Frontend and real-time application engineering: server discovery, ping measurement, queue and lobby interfaces, post-pairing map veto, and match chat, integrated with a separate matchmaking and game-server backend.',
    users: 'CS:GO players looking for organized matches and an active community.',
    problem:
      'Coordinate teams, map selection, and match readiness across ten players in real time, while keeping the next step clear to everyone.',
    decisions: [
      {
        title: 'A shared session across every client',
        text: 'Clients derive the same veto session from the match ID or roster data. Every player enters the same selection flow without coordinating session setup manually.',
      },
      {
        title: 'Deterministic map selection',
        text: 'Teams alternate bans, with the opening turn derived from the session. Timeout handling keeps selection moving when a captain does not respond.',
      },
      {
        title: 'Map veto after team pairing',
        text: 'Moving selection after pairing makes the veto part of the match itself. Server-backed API routes coordinate the selection and submit the final map to the backend.',
      },
      {
        title: 'Communication with clear boundaries',
        text: 'Team, match-wide, and queue channels follow their respective participants. The interface keeps each conversation close to the group it serves.',
      },
    ],
    verified: [
      'Matchmaking queues and lobby interfaces connected through Socket.io.',
      'Post-pairing map veto with server-backed coordination.',
      'Live server discovery, status, and ping measurement.',
      'Team, match, and queue chat.',
    ],
    goals: {
      title: 'Experience priorities',
      items: [
        'Make the path from queue to a playable match clear at every step.',
        'Keep participants aligned on teams, map selection, and server readiness.',
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
    category: 'Personal project / Music & community',
    status: 'Archived · Started in 2019',
    summary: 'A Discord music application for shared listening, saved playlists, and custom audio filters.',
    context: [
      'Jarvis began with a simple idea: build the music bot I wanted to use with friends. Started in 2019, it became one of my first projects used by people beyond my own development environment.',
      'What began as playback commands grew into queues, saved playlists, and audio filters—and an introduction to running software for a community.',
    ],
    role: 'Independent development, from bot commands and playback integration to playlist persistence and deployment.',
    users: 'Discord communities and friends listening to music together.',
    problem:
      'Turn a simple play command into a shared listening experience, with stable voice connections, coordinated queues, and playlists that persist between sessions.',
    decisions: [
      {
        title: 'Build on a focused audio stack',
        text: 'Discord.js handled the bot interface and voice integration; DisTube supported playback, queues, and filters. This kept development focused on the listening experience.',
      },
      {
        title: 'Keep playlists beyond the session',
        text: 'MongoDB stored user data and playlists so saved collections remained available across process restarts.',
      },
      {
        title: 'Learn from real usage',
        text: 'Offering filters and playlists for free brought real users and practical constraints. Hosting costs, platform changes, and community feedback shaped how I maintained the project.',
      },
    ],
    verified: [
      'Shared music playback, queues, and audio filters.',
      'Persistent user profiles and saved playlists in MongoDB.',
      'Public source code on GitHub.',
    ],
    goals: {
      title: 'What I took forward',
      items: [
        'Experience with persistent state, third-party integrations, and maintaining a community-facing application.',
        'A practical understanding of hosting costs and platform dependencies. Jarvis is now presented as an archived early project.',
      ],
    },
    tech: [{ group: 'Application', items: ['JavaScript', 'Node.js', 'Discord.js', 'DisTube', 'MongoDB'] }],
    shots: [
      {
        src: '/images/jarvis-play.png',
        alt: 'A Discord conversation where a play command returns Jarvis messages reading Added to Queue and Now Playing.',
        caption: 'Jarvis in Discord: a play command, queue confirmation, and playback response.',
        width: 727,
        height: 433,
      },
    ],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/ManishGupta-x/Jarvis' }],
  },
  {
    slug: 'service-hub',
    number: '05',
    title: 'Service Hub',
    category: 'Hospitality / Field service management',
    status: 'Functional prototype',
    summary: 'A hospitality maintenance platform connecting service requests, dispatch, field technicians, and training.',
    context: [
      'Service Hub is built to support equipment maintenance for hotels and restaurants in Shimla. It brings the client, dispatch team, technician, and trainer into one connected service workflow.',
      'The product brings together five applications: a public website, operations console, client portal, technician app, and learning platform, backed by a shared API and design system.',
    ],
    role: 'Full-stack engineering across the five application experiences, shared API, and reusable interface system.',
    users: 'Designed for hotel and restaurant teams, service dispatchers, field technicians, partner service companies, and trainers.',
    problem: 'A maintenance request crosses several teams before equipment is back in service. Clients need visibility, dispatchers need coordination, and technicians need the right job, equipment, and parts information in the field.',
    decisions: [
      {
        title: 'Dedicated apps, shared foundations',
        text: 'Separate Next.js applications give each role a focused workspace. A common API and UI package connect the experiences without duplicating the foundations.',
      },
      {
        title: 'Track the service lifecycle',
        text: 'Client requests, scheduling, technician job steps, and service reports form a connected workflow. Equipment history provides context for future maintenance.',
      },
      {
        title: 'Connect parts to field work',
        text: 'A stock ledger tracks parts received, reserved, fitted, and returned. Purchasing and model compatibility bring inventory decisions closer to the job.',
      },
      {
        title: 'Make training part of operations',
        text: 'The learning platform includes technician lessons and assessments alongside a trainer console. Training sits within the same product family as field work.',
      },
    ],
    verified: [
      'Public website, operations console, client portal, technician app, and training platform.',
      'Service requests, scheduling, dispatch, technician workflows, and service reporting.',
      'Equipment records, contracts, warranty claims, and maintenance history.',
      'Stock movements, purchasing, parts compatibility, and partner-company workflows.',
      'Technician learning, assessments, and trainer tools.',
    ],
    goals: {
      title: 'Prototype scope',
      items: [
        'Core workflows run against a shared API with demo data.',
        'Messaging, payments, and file storage include provider integration points; production configuration and rollout remain separate from the prototype.',
      ],
    },
    tech: [
      { group: 'Applications', items: ['Next.js', 'React', 'Shared UI package'] },
      { group: 'API & data', items: ['TypeScript', 'Prisma', 'PostgreSQL', 'Zod'] },
      { group: 'Workspace', items: ['pnpm workspaces', 'Shared API', 'Reusable design system'] },
    ],
    links: [
      { label: 'Public prototype', href: 'https://servicehub-site-beta.vercel.app/' },
      { label: 'Operations console', href: 'https://servicehub-admin-pi.vercel.app/' },
      { label: 'Client portal', href: 'https://servicehub-client-one.vercel.app/' },
      { label: 'Technician app', href: 'https://servicehub-tech.vercel.app/' },
      { label: 'Learning app', href: 'https://servicehub-learn.vercel.app/' },
    ],
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
      { title: 'Dust II — clutch highlights', id: 'RtyeFe6HYrA' },
      { title: 'Mirage no-scope', id: 'qyIrDyOVt3A' },
      { title: 'Ancient — last player standing', id: '-5YEfQaLvoE' },
      { title: 'Mirage clutch', id: 'w0pobV-zsks' },
      { title: 'A shot to remember', id: 'XmnbqohcwiY' },
      { title: '2x no-scope', id: '4igLJOebNMY' },
    ],
    cs2: [
      { title: 'Dust II — holding the position', id: 'A5Ba0fhAKCE' },
      { title: 'Dust II — B window no-scope', id: 'HC2Q1U771b4' },
      { title: 'Dust II — AK clutch', id: '0K82wS4F3CI' },
      { title: 'Dust II — AWP clutch', id: 'uJcXExmXOYo' },
      { title: 'No reaction time', id: 'NarHP7unzGU' },
      { title: 'Flying AWP kill', id: 'FRKPkQsV898' },
      { title: 'AWP — airborne follow-up', id: 'c6lQplqfBnQ' },
      { title: 'The Bizon encounter', id: 'X6Co64K49wg' },
      { title: 'The clutch that got away', id: 'nvkBLpjYYIo' },
      { title: 'Dust II — 4K clutch', id: 'gYDlxyHmjAA' },
      { title: 'Dust II — 3K clutch', id: 'iBsMoVLplt0' },
      { title: '1v7 Mirage casual clutch', id: 'xzbe8cH16nM' },
      { title: 'Casual D2 1v8 clutch', id: 'dOzuLJsahFw' },
      { title: 'Casual Mirage 1v8 clutch', id: 'DG0EXe2gRJg' },
    ],
    tournament: [{ title: 'Tournament match highlights', id: '_KNfUqAr8WI' }],
  },
};
