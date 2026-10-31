import type { StaticImageData } from 'next/image';
import ecosystem from '@/public/images/projects/dropmyorder-ecosystem.webp';
import saas from '@/public/images/projects/dmo-saas.webp';
import back2 from '@/public/images/projects/back2csgo.webp';
import jarvis from '@/public/images/projects/jarvis.webp';
import servicehub from '@/public/images/projects/service-hub.webp';
import matchmaking from '@/public/images/back2csgo/matchmaking.webp';
import home from '@/public/images/back2csgo/home.webp';
import activity from '@/public/images/back2csgo/activity.webp';
import casuals from '@/public/images/back2csgo/casuals.webp';
import stats from '@/public/images/back2csgo/stats.webp';

type Art = { image: StaticImageData; number: string; title: string; alt: string; description: string };
export const projectArt: Record<string, Art> = {
  'dropmyorder-ecosystem': {
    image: ecosystem, number: '01', title: 'One order. Every connection.',
    alt: 'An ivory model of a customer phone, outlet POS and receipt printer, back-office display, and warehouse rack connected by an orange cable.',
    description: 'Customer ordering, outlet billing, and warehouse control, brought together by a shared operational workflow.',
  },
  'dmo-saas': {
    image: saas, number: '02', title: 'Shared rules. Connected tools.',
    alt: 'A graphite shared-engine cube connected by orange cables to a POS terminal, receipt printer, server and delivery phone.',
    description: 'The same business rules across the counter, API, and delivery workflow. A new restaurant platform, currently in development.',
  },
  back2csgo: {
    image: back2, number: '03', title: 'From the queue to the server.',
    alt: 'A miniature tactical map, two groups of player tokens, map-selection cards and a server linked by an orange cable.',
    description: 'Find a match, choose a map, and connect to the server. A connected experience built around how the community plays.',
  },
  jarvis: {
    image: jarvis, number: '04', title: 'A playlist that stays with you.',
    alt: 'Ivory headphones, a waveform, playlist cards and a graphite database cylinder linked by an orange headphone cable.',
    description: 'A shared listening experience, with music queues and playlists that persist beyond the session.',
  },
  'service-hub': {
    image: servicehub, number: '05', title: 'Keep service moving.',
    alt: 'Commercial kitchen equipment, a service ticket, dispatch monitor, technician phone, toolkit, and training cards connected by an orange cable.',
    description: 'From the first maintenance request to field work and technician training. Focused tools for each team, connected through a shared platform.',
  },
};

type Shot = { src: string; alt: string; caption: string; width: number; height: number };
const capture = (image: StaticImageData, alt: string, caption: string): Shot => ({ src: image.src, width: image.width, height: image.height, alt, caption });
// User-supplied product screenshots. Their numbers describe the captured moment, not live portfolio metrics.
export const projectScreens: Record<string, Shot[]> = {
  back2csgo: [
    capture(home, 'Back2CSGO homepage showing region-based game servers, connection controls and available game modes.', 'Server discovery / Region selection and quick connections.'),
    capture(matchmaking, 'Back2CSGO matchmaking page with 1v1 through 5v5 modes, lobby controls and live matchmaking sidebar.', 'Matchmaking / Game modes, queues, and lobby entry.'),
    capture(activity, 'Back2CSGO server activity with match charts and recent server moments.', 'Community activity / Match trends and recent server moments. Snapshot at capture.'),
    capture(casuals, 'Back2CSGO casuals overview with player rankings and activity charts.', 'Casual play / Player comparisons and match activity.'),
    capture(stats, 'Back2CSGO player statistics page with rank, career metrics and performance charts.', 'Player profile / Career and performance analytics. Snapshot at capture.'),
  ],
};
