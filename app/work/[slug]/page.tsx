import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Thread from '@/components/Thread';
import Ecosystem from '@/components/demos/Ecosystem';
import Saas from '@/components/demos/Saas';
import Back2 from '@/components/demos/Back2';
import Jarvis from '@/components/demos/Jarvis';
import { projects } from '@/lib/content';

const DEMOS: Record<string, React.ComponentType> = {
  'dropmyorder-ecosystem': Ecosystem,
  'dmo-saas': Saas,
  back2csgo: Back2,
  jarvis: Jarvis,
};
const DARK_STAGE = new Set(['dmo-saas', 'jarvis']);

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

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="case-row">
    <h2 className="eyebrow">{label}</h2>
    <div>{children}</div>
  </section>
);

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const Demo = DEMOS[p.slug];

  return (
    <>
      <Thread />
      <header className="case-hero s-dark">
        <i className="t case-t1" data-t="" />
        <p className="eyebrow z"><Link href="/#work" className="back">← Selected work</Link> / {p.number} / {p.category}</p>
        <h1 className="display display--case z" data-hero-line="">{p.title}</h1>
        <p className="lede z" data-hero-fade="">{p.summary}</p>
        <p className="badge z" data-hero-fade="">{p.status}</p>
        <i className="t case-t2" data-t="" />
      </header>

      <div className="case-body s-ivory">
        <i className="t case-t3" data-t="" />
        <div className="case-rows z">
          <Row label="Context">{p.context.map(c => <p key={c}>{c}</p>)}</Row>
          <Row label="My role"><p>{p.role}</p></Row>
          <Row label="Users"><p>{p.users}</p></Row>
          <Row label="The problem"><p className="lede">{p.problem}</p></Row>
          <Row label="Key decisions">
            <dl className="decisions">
              {p.decisions.map(d => (
                <div key={d.title}>
                  <dt>{d.title}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
          </Row>
        </div>
      </div>

      <section className={`case-demo ${DARK_STAGE.has(p.slug) ? 's-dark' : 's-ivory case-demo--rule'}`} aria-label="Illustrated walkthrough">
        <Demo />
      </section>

      <div className="case-body s-ivory">
        <div className="case-rows z">
          {p.shots && (
            <Row label="Visuals">
              {p.shots.map(s => (
                <figure key={s.src} className="case-shot">
                  <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 760px) 100vw, 60vw" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </Row>
          )}
          <Row label="Verified in the source">
            <ul className="ticks">{p.verified.map(v => <li key={v}>{v}</li>)}</ul>
          </Row>
          <Row label={p.goals.title}>
            <ul className="dashes">{p.goals.items.map(v => <li key={v}>{v}</li>)}</ul>
          </Row>
          <Row label="Technologies">
            <dl className="tech">
              {p.tech.map(t => (
                <div key={t.group}>
                  <dt>{t.group}</dt>
                  <dd>{t.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Row>
          <Row label="Status and links">
            <p>{p.status}</p>
            {p.links.length ? (
              <p>{p.links.map(l => <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">{l.label} <span aria-hidden="true">↗</span></a>)}</p>
            ) : (
              <p className="dim">No public link yet.</p>
            )}
          </Row>
        </div>
      </div>

      <nav className="case-next s-dark" aria-label="Next project">
        <i className="t case-t4" data-t="" />
        <p className="eyebrow z">Next / {next.number}</p>
        <Link href={`/work/${next.slug}`} className="display display--case z case-next-link">{next.title} <span aria-hidden="true">↗</span></Link>
      </nav>
    </>
  );
}
