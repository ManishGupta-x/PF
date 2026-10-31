import type { StaticImageData } from 'next/image';
import operations from '@/public/images/stories/dmo-operations.webp';
import engine from '@/public/images/stories/saas-shared-engine.webp';
import playlists from '@/public/images/stories/jarvis-playlists.webp';
import fieldwork from '@/public/images/stories/servicehub-fieldwork.webp';

type Story = { title: string[]; tagline: string; intro: string; detailTitle: string; detailCopy: string; detailImage: StaticImageData; detailAlt: string; detailCaption: string; darkDetail?: boolean; walkthroughTitle: string; walkthroughCopy: string; capabilityCopy: string };
export const caseStories: Record<string, Story> = {
  'dropmyorder-ecosystem': {
    title: ['DROPMYORDER', 'ECOSYSTEM'], tagline: 'Built for the pace of a restaurant.', intro: 'One order starts a whole system.',
    detailTitle: 'Keep service moving. Even offline.', detailCopy: 'A bill cannot wait for a signal. Local storage, deliberate synchronization, and focused workspaces connect the counter to the rest of the operation without slowing down service.',
    detailImage: operations, detailAlt: 'Concept illustration of an outlet POS, receipt printer, local storage and a stock-count phone connected by an orange cable.', detailCaption: 'Concept illustration / Counter, storage and stock routines',
    walkthroughTitle: 'Follow an order through the operation.', walkthroughCopy: 'A sample sequence connects the customer, counter, warehouse, rider, and staff. Explore all six products using the module selector below.', capabilityCopy: 'Customer-facing simplicity depends on the operational details behind it: billing, inventory, dispatch, and the daily stock routine.',
  },
  'dmo-saas': {
    title: ['DMO SAAS'], tagline: 'Shared rules. Connected tools.', intro: 'One engine. Every operating surface.',
    detailTitle: 'Same bill. Same rules.', detailCopy: 'The browser counter and connected API use shared business packages. Pricing, tax, receipts, and synchronization are treated as product foundations, with the engine version recorded against each bill.',
    detailImage: engine, detailAlt: 'Concept illustration of a shared engine cube connected to a tablet, bill cards, storage and delivery.', detailCaption: 'Concept illustration / Shared logic across device and server', darkDetail: true,
    walkthroughTitle: 'From local bill to connected operation.', walkthroughCopy: 'Follow a sample bill through the browser database, shared engine, API validation, back office, and delivery workflow.', capabilityCopy: 'The platform is in development. These capabilities describe the implemented foundation; inventory, accounting, onboarding, and pilot rollout remain on the roadmap.',
  },
  jarvis: {
    title: ['JARVIS'], tagline: 'A playlist that stays with you.', intro: 'Music brought the first real users.',
    detailTitle: 'The session ends. The playlist stays.', detailCopy: 'Playback is a shared moment. Saved collections need a longer memory. The project connected Discord commands and music queues with persisted user data and playlists.',
    detailImage: playlists, detailAlt: 'Concept illustration of headphones and a waveform connected to playlist cards and a persistent archive.', detailCaption: 'Concept illustration / Listening, playlists and persistence',
    walkthroughTitle: 'From one command to a shared soundtrack.', walkthroughCopy: 'A fictional track moves through a Discord-style request, queue, playback, audio filter, and saved playlist. The sequence illustrates the workflow of the archived project.', capabilityCopy: 'An early application with real community use, and practical lessons in hosting, persistence, third-party services, and maintenance.',
  },
  'service-hub': {
    title: ['SERVICE HUB'], tagline: 'Keep service moving.', intro: 'A request is only the beginning.',
    detailTitle: 'The right context. Right at the job.', detailCopy: 'Dispatch coordinates the work; technicians need equipment history, job steps, and parts information in the field. Shared foundations connect those focused experiences across the service lifecycle.',
    detailImage: fieldwork, detailAlt: 'Concept illustration of a technician checklist phone, equipment panel, tool case and service records connected by an orange cable.', detailCaption: 'Concept illustration / Field work connected to service history',
    walkthroughTitle: 'From the first request to the service record.', walkthroughCopy: 'A sample maintenance request moves through dispatch, technician work, completion, and training. The prototype brings the client, dispatcher, technician, and trainer into a shared product family.', capabilityCopy: 'Five applications share an API and UI system. Core workflows use demo data; production integration configuration and rollout remain outside the prototype scope.',
  },
};
