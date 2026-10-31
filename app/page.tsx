import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Thread from '@/components/Thread';
import ContactLoop from '@/components/ContactLoop';
import Ecosystem from '@/components/demos/Ecosystem';
import Saas from '@/components/demos/Saas';
import Back2 from '@/components/demos/Back2';
import Jarvis from '@/components/demos/Jarvis';
import Board from '@/components/demos/Board';
import ServiceHub from '@/components/demos/ServiceHub';
import ToolChips from '@/components/ToolChips';
import { links, projects } from '@/lib/content';
import { areas } from '@/lib/expertise';
import desk from '@/public/images/desk.jpeg';
import portrait from '@/public/images/manish-editorial.webp';
import ProjectArt from '@/components/ProjectArt';
import DepthTunnel from '@/components/DepthTunnel';
import { projectArt } from '@/lib/visuals';

const [eco, saas, back2, jarvis, servicehub] = projects;

// Mobile thread anchor: an in-flow point in the right gutter, or a small wave inward (w)
// lifted into the empty padding at the top of a section, so the line never crosses text.
const M = ({ side = 'r' }: { side?: 'w' | 'r' }) => <i className={`tm tm--${side}`} data-t="" />;

// Desktop thread anchor in percent of the enclosing section.
const P = ({ x, y }: { x: number; y: number }) => <i className="t" data-t="" style={{ '--x': `${x}%`, '--y': `${y}%` } as CSSProperties} />;

const Lines = ({ lines, as: Tag = 'h2', className = '' }: { lines: string[]; as?: 'h2' | 'h3'; className?: string }) => (
  <Tag className={`display ${className}`} data-depth="420">
    {lines.map(l => <span key={l} className="line-block">{l}</span>)}
  </Tag>
);

const Chapter = ({ p, tone, title, children, pull, exit }: { p: (typeof projects)[number]; tone: string; title: string[]; children: React.ReactNode; pull?: React.ReactNode; exit: React.ReactNode }) => (
  <article id={p.slug} className={`chapter ${tone} chapter--${p.slug}`} aria-labelledby={`${p.slug}-title`}>
    <M side="w" />
        <M />
    <header className="chapter-head z">
      <p className="eyebrow">{p.number} / {p.category}</p>
      <p className="chapter-summary">{p.summary}</p>
    </header>
    <h3 id={`${p.slug}-title`} className="giant" data-depth="620" aria-label={p.title}>
      {title.map(t => <span key={t}>{t}</span>)}
    </h3>
    {pull && <div className="pull z">{pull}</div>}
    {children}
    <ProjectArt slug={p.slug} />
    <p className="chapter-cta z">
      <Link href={`/work/${p.slug}`} className="cta">View case study <span aria-hidden="true">↗</span></Link>
    </p>
    {exit}
    <M />
  </article>
);

export default function Home() {
  return (
    <>
      <Thread />

      <section className="hero s-dark">
        <i className="t hero-t" data-t="" data-load="" data-pts="50,0 50,100" />
        <div className="hero-mid">
          <div className="hero-title">
            <i
              className="t-fill"
              data-t=""
              data-load=""
              data-pts="70,-5 84,-6 97,6 95,24 80,29 72,18 79,7 91,16 87,34 66,40 42,47 20,46 6,52"
              data-pts-m="98,-8 90,6 96,28 80,36 60,30 40,46 8,50"
            />
            <i className="t-fill" data-t="" data-load="" data-over="" data-pts="6,52 -1,66 8,82 26,92 44,86" data-pts-m="8,50 0,66 8,84 30,92 48,86" />
            <i className="t-fill" data-t="" data-load="" data-pts="44,86 60,72 78,68 94,74 86,100 66,118 61,150" data-pts-m="48,86 70,72 94,80 104,104 102,130" />
            <h1 className="display display--hero display--experience" data-fly="620">
              <span className="line-block" data-hero-line="">I BUILD</span>
              <span className="line-block" data-hero-line="">EXPERIENCES WORTH</span>
              <span className="line-block" data-hero-line="">INTERACTING WITH.</span>
            </h1>
          </div>
        </div>
        <div className="hero-foot z" data-hero-fade="">
          <div>
            <p className="lede">I’m Manish Gupta. I build software for restaurant operations, field service, and online communities.</p>
            <p className="eyebrow eyebrow--orange">Software engineer</p>
          </div>
          <div className="hero-actions">
            <p className="aside">“If it repeats, I’ll probably automate it.”</p>
            <p>
              <a href="#work" className="link">Selected work <span aria-hidden="true">↓</span></a>
              <a href={links.resume} className="link" target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
            </p>
          </div>
        </div>
      </section>

      <section className="approach s-ivory">
        <M side="w" />
        <M />
        <P x={78} y={5} />
        <P x={94} y={22} />
        <P x={72} y={42} />
        <P x={40} y={60} />
        <P x={8} y={66} />
        <Lines lines={['FROM A SINGLE', 'ORDER TO A', 'CONNECTED', 'SYSTEM.']} className="z" />
        <p className="lede z approach-copy" data-reveal="">
          I connect the experiences people see with the systems teams rely on behind the scenes. From ordering and billing to stock and service requests, I build the tools that keep work moving.
        </p>
        <ol className="nodes z" aria-label="Customer, then outlet, then warehouse, then operations">
          {['Customer', 'Outlet', 'Warehouse', 'Operations'].map(n => (
            <li key={n}>
              <i className="node-dot" data-t="" />
              <span>{n}</span>
            </li>
          ))}
        </ol>
        <M />
      </section>

      <section id="capabilities" className="capabilities s-dark">
        <M side="w" />
        <M />
        <Lines lines={['PRODUCT CRAFT.', 'SYSTEM DESIGN.']} className="z display--md" />
        <p className="lede z cap-intro" data-reveal="">Five areas I keep returning to, each one tied to a product I have worked on.</p>
        <ol className="cap-rows z" data-stagger="">
          {areas.map(a => (
            <li key={a.number} className="cap-row">
              <span className="eyebrow">{a.number}</span>
              <h3>{a.title}</h3>
              <p>{a.short}</p>
              <ToolChips names={a.tools.slice(0, 4)} />
            </li>
          ))}
        </ol>
        <p className="cap-cta z"><Link href="/expertise" className="cta">Explore my expertise <span aria-hidden="true">↗</span></Link></p>
        <P x={72} y={5} />
        <P x={98.6} y={20} />
        <P x={98.6} y={88} />
        <M />
      </section>

      <section id="work" aria-label="Selected work" className="work">
        <DepthTunnel>
          <h2 className="display tunnel-heading" data-stop="0" style={{ '--i': 0, '--side': 0 } as CSSProperties}>
            <span className="line-block">Selected</span>
            <span className="line-block">work</span>
          </h2>
          {projects.map((p, i) => (
            <a key={p.slug} href={`#${p.slug}`} className="tunnel-panel" data-stop={i + 1} style={{ '--i': i + 1, '--side': i % 2 ? -1 : 1 } as CSSProperties}>
              <Image src={projectArt[p.slug].image} alt="" sizes="(max-width: 760px) 90vw, 66vw" />
              <span className="eyebrow">{p.number} / {p.category}</span>
              <span className="tunnel-title">{p.title}</span>
            </a>
          ))}
        </DepthTunnel>

        <Chapter p={eco} tone="s-ivory" title={['DROPMYORDER', 'ECOSYSTEM']} exit={<P x={98.6} y={99} />} pull={<p className="pull-text">Built for the pace of a restaurant.</p>}>
          <Ecosystem />
          <p className="chapter-link z"><a className="link" href="https://dropmyorder.com/" target="_blank" rel="noreferrer">In Shimla? Order on dropmyorder.com <span aria-hidden="true">↗</span></a></p>
        </Chapter>

        <Chapter p={saas} tone="s-dark" title={['DMO SAAS']} exit={<P x={1.3} y={97} />} pull={<p className="badge">In development</p>}>
          <Saas />
          <div className="roadmap z">
            <div>
              <h4 className="eyebrow">Built so far</h4>
              <ul>{saas.verified.map(v => <li key={v}>{v}</li>)}</ul>
            </div>
            <div>
              <h4 className="eyebrow eyebrow--orange">{saas.goals.title}</h4>
              <ul>{saas.goals.items.map(v => <li key={v}>{v}</li>)}</ul>
            </div>
          </div>
        </Chapter>

        <Chapter
          p={back2}
          tone="s-ivory"
          title={['BACK2CSGO']}
          exit={<P x={98.6} y={94} />}
          pull={<p className="pull-text">5,000+ hours in Counter-Strike. A player’s perspective, brought to the product.</p>}
        >
          <Back2 />
          <p className="chapter-link z"><a className="link" href="https://back2csgo.com/" target="_blank" rel="noreferrer">back2csgo.com <span aria-hidden="true">↗</span></a></p>
        </Chapter>

        <Chapter
          p={jarvis}
          tone="s-dark"
          title={['JARVIS']}
          exit={<P x={98.6} y={97} />}
          pull={<p className="pull-text">My first real product started with a playlist. <small>Discord music application / 2019</small></p>}
        >
          <Jarvis />
        </Chapter>

        <Chapter
          p={servicehub}
          tone="s-ivory"
          title={['SERVICE HUB']}
          exit={<P x={98.6} y={95} />}
          pull={<p className="pull-text">From a service request to a job well done. <small>Client, dispatch, technician, and training—connected.</small></p>}
        >
          <ServiceHub />
        </Chapter>
      </section>

      <section id="about" className="about s-ivory">
        <M side="w" />
        <M />
        <P x={86} y={10} />
        <P x={62} y={46} />
        <Lines lines={['CURIOUS BY', 'DEFAULT.', 'ENGINEER BY', 'PRACTICE.']} className="z" />
        <div className="about-grid">
          <div className="about-copy z" data-reveal="">
            <p className="lede">I started coding in 2018 with C++ and competitive programming. Today, I’m a software engineer at DropMyOrder, working across web, desktop, mobile, and real-time applications.</p>
            <p>I care about clear interfaces, thoughtful architecture, and the details that make software useful. Music and gaming keep the curiosity going—and sometimes become projects of their own.</p>
          </div>
          <figure className="about-portrait z" data-parallax="16">
            <Image src={portrait} alt="Manish Gupta smiling in round glasses, a dark puffer jacket and a white turtleneck, in a monochrome portrait." sizes="(max-width: 760px) 85vw, 30vw" />
            <figcaption><span className="portrait-dot" aria-hidden="true" /> Manish / away from the editor</figcaption>
          </figure>
          <div className="monogram" aria-hidden="true">
            <i
              className="t-fill"
              data-t=""
              data-pts="-14,102 -4,102 5,90 10,68 16,38 24,12 30,6 32,14 31,36 32,58 34,76 37,72 43,48 50,22 57,8 61,8 61,20 57,44 53,68 53,84 57,92 62,84 65,60 72,32 83,12 95,5 104,9 104,16 97,20 86,19 75,28 69,46 67,66 72,84 82,91 92,84 98,70 99,58 92,53 84,55 88,60 98,58 105,62"
              data-pts-m="112,108 50,110 -4,104 5,90 10,68 16,38 24,12 30,6 32,14 31,36 32,58 34,76 37,72 43,48 50,22 57,8 61,8 61,20 57,44 53,68 53,84 57,92 62,84 65,60 72,32 83,12 95,5 104,9 104,16 97,20 86,19 75,28 69,46 67,66 72,84 82,91 92,84 98,70 99,58 92,53 84,55 88,60 98,58 105,62"
            />
          </div>
        </div>
        <M />
      </section>

      <section id="interlude" className="interlude s-dark">
        <M side="w" />
        <M />
        <P x={97} y={9} />
        <P x={98.6} y={30} />
        <Lines lines={['SOMEWHERE', 'BETWEEN A BUILD,', 'A BEAT, AND', 'ONE MORE MATCH.']} className="z display--md" />
        <p className="lede z interlude-bio" data-reveal="">
          Away from the editor, I’m usually listening to music, playing chess, or queuing for Counter-Strike. Some interests stay hobbies. Others become the next thing I build.
        </p>
        <figure className="desk">
          <i className="t desk-in" data-t="" />
          <div className="desk-photo z" data-depth="520">
            <Image src={desk} alt="A dark, red-lit desk with two monitors, a microphone, keyboard, mouse, chair and PC tower." sizes="(max-width: 760px) 100vw, 80vw" />
            <i className="leader leader--build" aria-hidden="true" />
            <i className="leader leader--speak" aria-hidden="true" />
            <i className="leader leader--play" aria-hidden="true" />
            <span className="note note--build" aria-hidden="true">build</span>
            <span className="note note--speak" aria-hidden="true">speak</span>
            <span className="note note--play" aria-hidden="true">play</span>
          </div>
          <figcaption className="z">
            <span>“The setup behind the commits and the clutches.”</span>
            <Link href="/GamingCareer" className="link">Beyond the editor <span aria-hidden="true">↗</span></Link>
          </figcaption>
          <i className="t desk-out" data-t="" />
        </figure>
        <M />
      </section>

      <section className="stories s-ivory">
        <M side="w" />
        <M />
        <P x={1.3} y={6} />
        <P x={1.3} y={56} />
        <P x={26} y={70} />
        <P x={50} y={73} />
        <div className="story-board z">
          <Board />
          <div className="story-copy" data-reveal="">
            <h3 className="eyebrow">The board</h3>
            <p className="display display--sm">“Caro-Kann with Black. Stonewall with White.”</p>
            <p>I like positions that reward patience. Caro-Kann with Black, Stonewall with White—and usually a reason to play one more game.</p>
            <a className="link" href={links.chess} target="_blank" rel="noreferrer">My Chess.com profile <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <P x={50} y={100} />
        <div className="story-links z">
          <a href={`#${back2.slug}`} className="mini">
            <span className="eyebrow">The queue</span>
            <span className="lobby" aria-hidden="true">
              {['kestrel', 'nomad', 'vanta', 'ember', 'rook'].map(n => <span key={n}><i />{n}</span>)}
            </span>
            <span className="mini-copy">Counter-Strike brought friendships, a community, and a matchmaking experience I could help shape.</span>
            <span className="link">Explore Back2CSGO <span aria-hidden="true">↑</span></span>
          </a>
          <a href={`#${jarvis.slug}`} className="mini">
            <span className="eyebrow">The playlist</span>
            <svg viewBox="0 0 400 60" className="line mini-wave" aria-hidden="true">
              <path d="M0 30 H70 L80 18 L90 42 L100 8 L112 52 L124 14 L136 46 L148 22 L160 38 L172 26 L184 34 L196 30 H400" />
            </svg>
            <span className="mini-copy">A love of music became a Discord bot, shared playlists, and my first lessons in shipping for a community.</span>
            <span className="link">Explore Jarvis <span aria-hidden="true">↑</span></span>
          </a>
        </div>
        <M />
      </section>

      <section id="contact" className="contact s-dark">
        <M side="w" />
        <M />
        <P x={66} y={3} />
        <P x={86} y={10} />
        <div className="contact-grid">
          <div className="z">
            <Lines lines={['HAVE', 'SOMETHING', 'WORTH', 'BUILDING?']} />
            <p className="contact-mail">
              <a href={`mailto:${links.email}`} className="cta cta--lg">Let’s talk <span aria-hidden="true">↗</span></a>
            </p>
            <p className="contact-address"><a href={`mailto:${links.email}`}>{links.email}</a></p>
            <ul className="contact-links">
              <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={links.resume} target="_blank" rel="noreferrer">Resume</a></li>
              <li>{links.location}</li>
            </ul>
          </div>
          <M />
          <div className="contact-loop z">
            <ContactLoop />
          </div>
        </div>
      </section>
    </>
  );
}
