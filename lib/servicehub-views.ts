import site from '@/public/images/servicehub/live-site.webp';
import operations from '@/public/images/servicehub/live-admin.webp';
import clientPreview from '@/public/images/servicehub/live-client-preview.webp';
import training from '@/public/images/servicehub/live-training.webp';

export const servicehubViews = [
  {
    image: site,
    alt: 'Live ServiceHub public website presenting equipment maintenance, service coverage and a survey-booking entry point.',
    caption: 'Public service website / Live prototype · 31 Oct 2026',
    title: 'A clear first step for a property team.',
    text: 'The public site introduces equipment coverage, service plans, and the route into a property survey. It brings the service offering and the product experience into the same journey.',
    href: 'https://servicehub-site-beta.vercel.app/', label: 'Explore the public prototype',
  },
  {
    image: operations,
    alt: 'Authenticated ServiceHub demo operations dashboard with dispatch, jobs, clients, equipment, team and finance navigation.',
    caption: 'Operations console / Authenticated demo workspace · 31 Oct 2026',
    title: 'One place to coordinate the operation.',
    text: 'The central workspace connects dispatch, jobs, properties, equipment, technicians, parts, and finance. The captured demo workspace shows how those responsibilities sit within one operations interface.',
    href: 'https://servicehub-admin-pi.vercel.app/', label: 'Open the operations app',
  },
  {
    image: clientPreview,
    alt: 'Client-experience examples on the live ServiceHub public website showing equipment, job tracking and bills.',
    caption: 'Client experience / Preview on the live public website · 31 Oct 2026',
    title: 'Make the service history visible.',
    text: 'The public product preview shows the client journey through equipment records, job updates, and service bills. These are the site’s own example screens, shown here as a preview of the client experience.',
    href: 'https://servicehub-client-one.vercel.app/', label: 'Open the client portal',
  },
  {
    image: training,
    alt: 'Authenticated ServiceHub training console with courses, learner progress, practical assessments and certificate reminders.',
    caption: 'Training console / Authenticated trainer demo · 31 Oct 2026',
    title: 'Training belongs in the same product family.',
    text: 'Trainers have a focused workspace for courses, assignments, learner progress, practical assessments, and certificate follow-up. It complements the technician workflow instead of becoming a separate administrative tool.',
    href: 'https://servicehub-learn.vercel.app/trainer', label: 'Open the training console',
  },
];
