import type { StaticImageData } from 'next/image';
import ecosystem from '@/public/images/projects/dropmyorder-ecosystem.webp';
import saas from '@/public/images/projects/dmo-saas.webp';
import back2 from '@/public/images/projects/back2csgo.webp';
import jarvis from '@/public/images/projects/jarvis.webp';
import servicehub from '@/public/images/projects/service-hub.webp';

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
