import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Ecosystem from '@/components/demos/Ecosystem';
import Saas from '@/components/demos/Saas';
import Back2 from '@/components/demos/Back2';
import Jarvis from '@/components/demos/Jarvis';
import ServiceHub from '@/components/demos/ServiceHub';
import Back2Case from '@/components/Back2Case';
import RichCaseStudy from '@/components/RichCaseStudy';
import { projects } from '@/lib/content';

const DEMOS: Record<string, React.ComponentType> = {
  'dropmyorder-ecosystem': Ecosystem,
  'dmo-saas': Saas,
  back2csgo: Back2,
  jarvis: Jarvis,
  'service-hub': ServiceHub,
};

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(x => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} | Manish Gupta`, description: p.summary, url: `/work/${p.slug}` },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  if (p.slug === 'back2csgo') return <Back2Case project={p} next={next} />;
  return <RichCaseStudy project={p} next={next} Demo={DEMOS[p.slug]} />;
}
