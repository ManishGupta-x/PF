import type { Metadata } from 'next';
import Link from 'next/link';
import Thread from '@/components/Thread';
import ToolChips from '@/components/ToolChips';
import { projects } from '@/lib/content';
import { areas, projectsUsing, shortTitle, toolkit } from '@/lib/expertise';

const description = 'How Manish Gupta approaches product interfaces, offline-first systems, real-time experiences, shared business logic, and APIs, with the tools behind each project.';

export const metadata: Metadata = {
  title: 'Expertise',
  description,
  alternates: { canonical: '/expertise' },
  openGraph: { title: 'Expertise | Manish Gupta', description, url: '/expertise' },
};

export default function Expertise() {
  return (
    <>
      <Thread />
      <header className="case-hero s-dark">
        <i className="t case-t1" data-t="" />
        <p className="eyebrow z"><Link href="/#capabilities" className="back">← Home</Link> / Expertise</p>
        <h1 className="display display--case z" data-hero-line="">The thinking behind the stack.</h1>
        <p className="lede z" data-hero-fade="">Five areas of product and systems work, followed by the tools I use, each linked to the projects behind it.</p>
        <i className="t case-t2 xp-t2" data-t="" />
      </header>

      <section className="case-body s-ivory" aria-labelledby="areas-title">
        <i className="t case-t3" data-t="" />
        <h2 id="areas-title" className="eyebrow eyebrow--orange z">Areas of work</h2>
        <div className="xp-areas z">
          {areas.map(a => (
            <article key={a.number} id={a.title.toLowerCase().replace(/\W+/g, '-')} className="xp-area" data-reveal="">
              <div>
                <p className="eyebrow">{a.number}</p>
                <h3 className="display display--sm">{a.title}</h3>
              </div>
              <div className="xp-area-body">
                <p className="lede">{a.summary}</p>
                <ul className="ticks">{a.points.map(point => <li key={point}>{point}</li>)}</ul>
                <ToolChips names={a.tools} />
                <p className="xp-seen">
                  <span className="eyebrow">See it in</span>
                  {a.seenIn.map(slug => {
                    const p = projects.find(x => x.slug === slug)!;
                    return <Link key={slug} href={`/work/${slug}`} className="link">{shortTitle(p.title)} <span aria-hidden="true">↗</span></Link>;
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="xp-toolkit s-dark" aria-labelledby="toolkit-title">
        <i className="t case-t3" data-t="" />
        <h2 id="toolkit-title" className="display display--md z">The toolkit.</h2>
        <p className="lede z">Where a tool appears in a case study, it links there. The rest come from earlier projects and everyday work.</p>
        <div className="xp-groups z">
          {toolkit.map(group => (
            <section key={group.title} className="xp-group" aria-label={group.title}>
              <h3 className="eyebrow eyebrow--orange">{group.title}</h3>
              <ul className="xp-tools" data-stagger="">
                {group.tools.map(tool => {
                  const Icon = tool.icon;
                  const used = projectsUsing(tool);
                  return (
                    <li key={tool.name} className="xp-tool">
                      <Icon aria-hidden="true" />
                      <h4>{tool.name}</h4>
                      {tool.note && <p>{tool.note}</p>}
                      {used.length > 0 && (
                        <p className="xp-used">
                          {used.map(p => <Link key={p.slug} href={`/work/${p.slug}`}>{shortTitle(p.title)}</Link>)}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <nav className="case-next s-ivory" aria-label="Selected work">
        <i className="t case-t4" data-t="" />
        <p className="eyebrow z">Next</p>
        <Link href="/#work" className="display display--case z case-next-link">See the work <span aria-hidden="true">↗</span></Link>
      </nav>
    </>
  );
}
