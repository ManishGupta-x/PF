import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import Thread from '@/components/Thread';
import DmoResults from '@/components/DmoResults';
import { ecosystemModules, type Project } from '@/lib/content';
import { projectArt } from '@/lib/visuals';
import { caseStories } from '@/lib/case-stories';
import { servicehubViews } from '@/lib/servicehub-views';
import home from '@/public/images/dropmyorder/live-home.webp';
import menu from '@/public/images/dropmyorder/live-menu.webp';
import chennai from '@/public/images/dropmyorder/live-chennai.webp';
import s from './RichCaseStudy.module.css';

function Media({ image, alt, caption, priority = false }: { image: StaticImageData; alt: string; caption: string; priority?: boolean }) {
  return <figure className={s.media} style={{ maxWidth: image.width }}>
    <a href={image.src} target="_blank" rel="noreferrer" aria-label={`View full-size: ${alt}`}>
      <Image unoptimized src={image} alt={alt} sizes="(max-width: 900px) 100vw, 62vw" quality={95} priority={priority} />
      <span className={s.expand} aria-hidden="true">↗</span>
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export default function RichCaseStudy({ project: p, next, Demo }: { project: Project; next: Project; Demo: React.ComponentType }) {
  const story = caseStories[p.slug];
  const art = projectArt[p.slug];
  const isDmo = p.slug === 'dropmyorder-ecosystem';
  return <div className={s.page}>
    <Thread />
    <header className={`s-dark ${s.hero}`}>
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} z`}>
        <p className="eyebrow"><Link href="/#work" className="back">← Selected work</Link> / {p.number} / {p.category}</p>
        <h1 className={s.title} data-hero-line="">{story.title.map(line => <span key={line}>{line}</span>)}</h1>
        <div className={s.heroFoot}><h2>{story.tagline}</h2><div><p>{p.summary}</p><span className="badge">{p.status}</span></div></div>
      </div>
    </header>

    <section className={`s-ivory ${s.section}`} aria-labelledby="project-origin">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.split} z`}>
        <div className={s.copy}><p className={s.kicker}>01 / The project</p><h2 id="project-origin">{story.intro}</h2>{p.context.map(text => <p key={text}>{text}</p>)}</div>
        {isDmo
          ? <Media image={home} alt="Current DropMyOrder homepage with the From Queen of Hills hero, outlet cards and food categories" caption="Customer discovery / Live product · 31 Oct 2026" priority />
          : <Media image={art.image} alt={art.alt} caption={`Concept illustration / ${art.title}`} priority />}
      </div>
      <div className={`${s.wrap} ${s.brief} z`}>
        <article><p className={s.kicker}>My contribution</p><p>{p.role}</p></article>
        <article><p className={s.kicker}>Who it serves</p><p>{p.users}</p></article>
        <article><p className={s.kicker}>The challenge</p><p>{p.problem}</p></article>
      </div>
    </section>

    {isDmo && <>
      <section className={`s-dark ${s.section}`} aria-labelledby="customer-experience">
        <i className={`t ${s.anchor}`} data-t="" />
        <div className={`${s.wrap} ${s.head} z`}><div><p className={s.kicker}>02 / The customer experience</p><h2 id="customer-experience">From finding a dish<br />to finding a favourite.</h2></div><p>Outlet discovery, searchable menus, and clear food choices start the journey. The current site brings the restaurants and their menus into one ordering experience.</p></div>
        <div className={`${s.wrap} ${s.split} ${s.reverse} z`}>
          <Media image={menu} alt="Current GuptaJees outlet menu with category navigation, dish descriptions, prices and add controls" caption="GuptaJees menu / Live product · 31 Oct 2026" />
          <div className={s.copy}><h3>A large menu.<br />A clear way through.</h3><p>Category navigation and search help customers reach a dish without working through the entire menu. Descriptions, photographs, and prices stay close to each choice.</p><p>The web experience uses Next.js, PWA tooling, and a Redux cart, with performance shaped by the connectivity customers encounter in Shimla.</p><a className="cta" href="https://dropmyorder.com/guptajees/120" target="_blank" rel="noreferrer">Explore the current menu <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className={`${s.wrap} ${s.split} ${s.followup} z`}>
          <div className={s.copy}><h3>Different kitchens.<br />A consistent experience.</h3><p>GuptaJees, the bakery, and Chennai Maratha share a coherent ordering flow while keeping their own menus and food categories.</p><p>Customer ordering is one part of the wider system: the work continues at the outlet, in the warehouse, and on a rider’s phone.</p></div>
          <Media image={chennai} alt="Current Chennai Maratha menu with South Indian food categories and ordering controls" caption="Chennai Maratha / Live product · 31 Oct 2026" />
        </div>
      </section>
      <section className={`s-ivory ${s.section}`} aria-labelledby="ecosystem-products">
        <div className={`${s.wrap} ${s.split} z`}>
          <Media image={art.image} alt={art.alt} caption="Concept illustration / The core ordering, outlet and warehouse connections" />
          <div className={s.copy}><p className={s.kicker}>03 / Connected responsibilities</p><h2 id="ecosystem-products">Six focused products.<br />One operating rhythm.</h2><p>Each team has its own workspace. The connections between those workspaces keep orders, billing, stock, and delivery moving together.</p><ul className={s.modules}>{ecosystemModules.map((m, i) => <li key={m.id}><span>0{i + 1}</span><div><h3>{m.name}</h3><p>{m.role}</p></div></li>)}</ul></div>
        </div>
      </section>
    </>}

    {p.slug === 'service-hub' && <section className={`s-dark ${s.section}`} aria-labelledby="servicehub-live">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.head} z`}><div><p className={s.kicker}>02 / Inside the deployed prototype</p><h2 id="servicehub-live">Different workspaces.<br />One service lifecycle.</h2></div><p>Real views from the public website and authenticated demo apps, connecting the service offering, operations, client visibility, and training.</p></div>
      {servicehubViews.map(view => <article key={view.caption} className={`${s.wrap} ${s.liveView} z`}>
        <div className={s.head}><h3>{view.title}</h3><div><p>{view.text}</p><a className="cta" href={view.href} target="_blank" rel="noreferrer">{view.label} <span aria-hidden="true">↗</span></a></div></div>
        <Media image={view.image} alt={view.alt} caption={view.caption} />
      </article>)}
    </section>}

    <section className={`s-${story.darkDetail ? 'dark' : 'ivory'} ${s.section}`} aria-labelledby="engineering-story">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.split} z`}>
        <div className={s.copy}><p className={s.kicker}>{isDmo ? '04' : p.slug === 'service-hub' ? '03' : '02'} / Engineering the experience</p><h2 id="engineering-story">{story.detailTitle}</h2><p>{story.detailCopy}</p><div className={s.principle}><span>{p.goals.title}</span><p>{p.goals.items[0]}</p></div></div>
        <Media image={story.detailImage} alt={story.detailAlt} caption={story.detailCaption} />
      </div>
      <div className={`${s.wrap} ${s.decisions} z`}>{p.decisions.map((d, i) => <article key={d.title} data-reveal=""><p className={s.kicker}>0{i + 1} / Engineering decision</p><h3>{d.title}</h3><p>{d.text}</p></article>)}</div>
    </section>

    <section className={`s-ivory ${s.section} ${s.workflow}`} aria-labelledby="workflow-title">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.head} z`}><div><p className={s.kicker}>{isDmo ? '05' : p.slug === 'service-hub' ? '04' : '03'} / Follow the workflow</p><h2 id="workflow-title">{story.walkthroughTitle}</h2></div><p>{story.walkthroughCopy}</p></div>
      <div className={s.demo}><Demo /></div>
    </section>

    {isDmo && <div className={s.results}><DmoResults /></div>}

    {p.slug === 'jarvis' && p.shots?.map(shot => <section key={shot.src} className={`s-dark ${s.section}`} aria-labelledby="jarvis-archive">
      <div className={`${s.wrap} ${s.split} z`}><div className={s.copy}><p className={s.kicker}>04 / From the archive</p><h2 id="jarvis-archive">A command.<br />A queue.<br />A shared session.</h2><p>The original Discord capture shows the small interactions behind a shared listening experience: request a track, confirm its place in the queue, and begin playback.</p><p>Jarvis is an archived project, so this is presented as a historical product view.</p></div><figure className={s.archive}><a href={shot.src} target="_blank" rel="noreferrer"><Image src={shot.src} width={shot.width} height={shot.height} unoptimized alt={shot.alt} style={{ maxWidth: shot.width }} /></a><figcaption>{shot.caption} / Archive</figcaption></figure></div>
    </section>)}

    <section className={`s-ivory ${s.section}`} aria-labelledby="capabilities-title">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.head} z`}><div><p className={s.kicker}>The product in practice</p><h2 id="capabilities-title">Built around<br />the work it serves.</h2></div><p>{story.capabilityCopy}</p></div>
      <ul className={`${s.wrap} ${s.capabilities} z`}>{p.verified.map((v, i) => <li key={v}><span>0{i + 1}</span><p>{v}</p></li>)}</ul>
      <div className={`${s.wrap} ${s.nextSteps} z`}><h3>{p.goals.title}</h3><ul>{p.goals.items.map(t => <li key={t}>{t}</li>)}</ul></div>
    </section>

    <section className={`s-dark ${s.section}`} aria-labelledby="technology-title">
      <div className={`${s.wrap} ${s.head} z`}><div><p className={s.kicker}>Under the surface</p><h2 id="technology-title">The tools behind<br />the experience.</h2></div><p>{p.status}</p></div>
      <dl className={`${s.wrap} ${s.tech} z`}>{p.tech.map(t => <div key={t.group}><dt>{t.group}</dt><dd>{t.items.join(' / ')}</dd></div>)}</dl>
      {p.links.length > 0 && <p className={`${s.wrap} ${s.links} z`}>{p.links.map(l => <a key={l.href} href={l.href} className="cta" target="_blank" rel="noreferrer">{l.label} <span aria-hidden="true">↗</span></a>)}</p>}
    </section>

    <nav className={`s-ivory ${s.next}`} aria-label="Next project"><div className={`${s.wrap} z`}><p className={s.kicker}>Next / {next.number}</p><Link href={`/work/${next.slug}`}>{next.title} <span aria-hidden="true">↗</span></Link></div></nav>
  </div>;
}
