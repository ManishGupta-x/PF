import Image from 'next/image';
import Link from 'next/link';
import systems from '@/public/images/stories/expertise-systems.webp';
import { projectArt } from '@/lib/visuals';
import { projects } from '@/lib/content';
import s from './ExpertiseVisual.module.css';

export function ExpertiseHero() {
  return <header className={`s-dark ${s.hero}`}>
    <i className={`t ${s.anchor}`} data-t="" />
    <div className={`${s.grid} z`}>
      <div className={s.copy}>
        <p className="eyebrow"><Link href="/#capabilities" className="back">← Home</Link> / Expertise</p>
        <h1 data-hero-line="">The thinking<br />behind the stack.</h1>
        <p className="lede">Clear interfaces. Reliable systems. The engineering that connects them.</p>
        <p className={s.description}>Five areas of product and systems work, grounded in the tools and projects behind them.</p>
        <a href="#areas-title" className="cta">Explore the approach <span aria-hidden="true">↓</span></a>
      </div>
      <figure className={s.art}><Image src={systems} priority sizes="(max-width: 900px) 100vw, 60vw" quality={95} alt="An ivory browser interface, database, worker processor, test cards and server connected by an orange cable on a graphite workbench." /><figcaption>From the interface to the systems behind it. / Concept illustration</figcaption></figure>
    </div>
  </header>;
}

export function ExpertiseProjects() {
  return <section className={`s-ivory ${s.projects}`} aria-labelledby="expertise-applied">
    <div className={s.projectHead}><p className="eyebrow eyebrow--orange">Applied in practice</p><h2 id="expertise-applied">See the thinking<br />in the work.</h2></div>
    <div className={s.cards}>{['dropmyorder-ecosystem', 'back2csgo', 'service-hub'].map(slug => {
      const p = projects.find(x => x.slug === slug)!;
      const art = projectArt[slug];
      return <Link href={`/work/${slug}`} key={slug} className={s.card}><Image src={art.image} sizes="(max-width: 760px) 100vw, 33vw" quality={90} alt={art.alt} /><div><p className="eyebrow">{p.number} / {p.status}</p><h3>{p.title} <span aria-hidden="true">↗</span></h3><p>{p.summary}</p></div></Link>;
    })}</div>
  </section>;
}

