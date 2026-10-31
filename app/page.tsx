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
import { capabilities, links, projects } from '@/lib/content';
import desk from '@/public/images/desk.jpeg';
import portrait from '@/public/images/portrait.jpg';

const [eco, saas, back2, jarvis] = projects;

// Mobile thread anchor: an in-flow point in the right gutter, or a small wave inward (w)
// lifted into the empty padding at the top of a section, so the line never crosses text.
const M = ({ side = 'r' }: { side?: 'w' | 'r' }) => <i className={`tm tm--${side}`} data-t="" />;

// Desktop thread anchor in percent of the enclosing section.
const P = ({ x, y }: { x: number; y: number }) => <i className="t" data-t="" style={{ '--x': `${x}%`, '--y': `${y}%` } as CSSProperties} />;

const Lines = ({ lines, as: Tag = 'h2', className = '' }: { lines: string[]; as?: 'h2' | 'h3'; className?: string }) => (
  <Tag className={`display ${className}`} data-reveal="">
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
    <h3 id={`${p.slug}-title`} className="giant" data-parallax="24" aria-label={p.title}>
      {title.map(t => <span key={t}>{t}</span>)}
    </h3>
    {pull && <div className="pull z">{pull}</div>}
    {children}
    <p className="chapter-cta z">
      <Link href={`/work/${p.slug}`} className="cta">Explore the case study <span aria-hidden="true">↗</span></Link>
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
        <div className="hero-mid">
          <div className="hero-title">
            <i
              className="t-fill"
              data-t=""
              data-load=""
              data-pts="55,15 66,3 84,-6 97,6 95,24 80,29 72,18 79,7 91,16 87,34 66,40 42,47 20,46 6,52"
              data-pts-m="98,-8 90,6 96,28 80,36 60,30 40,46 8,50"
            />
            <i className="t-fill" data-t="" data-load="" data-over="" data-pts="6,52 -1,66 8,82 26,92 44,86" data-pts-m="8,50 0,66 8,84 30,92 48,86" />
            <i className="t-fill" data-t="" data-load="" data-pts="44,86 60,72 78,68 94,74 86,100 66,118 61,150" data-pts-m="48,86 70,72 94,80 104,104 102,130" />
            <h1 className="display display--hero">
              <span className="line-block" data-hero-line="">I BUILD</span>
              <span className="line-block" data-hero-line="">PRODUCTS</span>
              <span className="line-block" data-hero-line="">THAT CONNECT.</span>
            </h1>
          </div>
        </div>
        <div className="hero-foot z" data-hero-fade="">
          <div>
            <p className="lede">I’m Manish Gupta, a software engineer building restaurant ecosystems, offline-first products, real-time platforms, and B2B SaaS.</p>
            <p className="eyebrow eyebrow--orange">Currently building at DropMyOrder</p>
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
          My work spans the interfaces people use and the systems connecting those workflows. One order can start on a customer’s phone and end up in a warehouse stock count, and I want every step in between to feel like the same product.
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
        <Lines lines={['WHAT I BRING', 'TO THE THREAD.']} className="z display--md" />
        <div className="cap-grid z">
          {capabilities.map((c, i) => (
            <div key={c.title} className={`cap cap--${i}`}>
              <h3 className="eyebrow">{c.title}</h3>
              <ul data-stagger="">{c.rows.map(r => <li key={r}>{r}</li>)}</ul>
            </div>
          ))}
        </div>
        <P x={72} y={9} />
        <P x={50} y={42} />
        <P x={50} y={100} />
        <M />
      </section>

      <section id="work" aria-label="Selected work" className="work">
        <h2 className="sr">Selected work</h2>

        <Chapter p={eco} tone="s-ivory" title={['DROPMYORDER', 'ECOSYSTEM']} exit={<P x={98.6} y={92} />} pull={<p className="pull-text">Engineering work at DropMyOrder, my current company.</p>}>
          <Ecosystem />
        </Chapter>

        <Chapter p={saas} tone="s-dark" title={['DMO SAAS']} exit={<P x={1.3} y={97} />} pull={<p className="badge">In development. Not launched.</p>}>
          <Saas />
          <div className="roadmap z">
            <div>
              <h4 className="eyebrow">In the code today</h4>
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
          pull={<p className="pull-text">5,000+ hours in Counter-Strike. Then I started building around it. <small>My own playtime, self-reported. Not a platform number.</small></p>}
        >
          <Back2 />
          <p className="chapter-link z"><a className="link" href="https://back2csgo.com/" target="_blank" rel="noreferrer">back2csgo.com <span aria-hidden="true">↗</span></a></p>
        </Chapter>

        <Chapter
          p={jarvis}
          tone="s-dark"
          title={['JARVIS']}
          exit={<P x={98.6} y={97} />}
          pull={<p className="pull-text">Music led me to build Jarvis. Gaming led me to build Back2CSGO. <small>Early project, 2019. Archived here.</small></p>}
        >
          <Jarvis />
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
            <p className="lede">I’ve been coding since 2018. I started with C++ and competitive programming, moved to full-stack web development, and now build at DropMyOrder.</p>
            <p>Music and gaming have stayed close the whole way. One became Jarvis, and the other became Back2CSGO.</p>
          </div>
          <div className="about-portrait z" data-parallax="16">
            <Image src={portrait} alt="Manish Gupta, wearing round glasses and a floral shirt, looking at the camera." sizes="(max-width: 760px) 70vw, 26vw" placeholder="blur" />
          </div>
          <div className="monogram" aria-hidden="true">
            <i
              className="t-fill"
              data-t=""
              data-pts="-14,102 3,94 3,94 9,14 9,14 28,72 28,72 46,14 46,14 52,92 70,102 102,90 106,44 96,24 78,8 60,22 54,50 62,80 80,90 96,74 96,52 96,52 78,52 78,52 92,38 114,34"
              data-pts-m="112,108 3,94 3,94 9,14 9,14 28,72 28,72 46,14 46,14 52,92 70,102 102,90 106,44 96,24 78,8 60,22 54,50 62,80 80,90 96,74 96,52 96,52 78,52 78,52 92,38 122,30"
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
          I started coding in 2018 with C++ and competitive programming. These days, I build connected products at DropMyOrder. Away from the editor, you’ll find me in Counter-Strike, thinking over a chessboard, or listening to music. Sometimes those interests become projects of their own.
        </p>
        <figure className="desk">
          <i className="t desk-in" data-t="" />
          <div className="desk-photo z">
            <Image src={desk} alt="A dark, red-lit desk with two monitors, a microphone, keyboard, mouse, chair and PC tower." sizes="(max-width: 760px) 100vw, 80vw" placeholder="blur" />
            <i className="leader leader--build" aria-hidden="true" />
            <i className="leader leader--listen" aria-hidden="true" />
            <i className="leader leader--play" aria-hidden="true" />
            <span className="note note--build" aria-hidden="true">build</span>
            <span className="note note--listen" aria-hidden="true">listen</span>
            <span className="note note--play" aria-hidden="true">play</span>
          </div>
          <figcaption className="z">
            <span>“The setup behind the commits and the clutches.”</span>
            <Link href="/GamingCareer" className="link">Gaming Career <span aria-hidden="true">↗</span></Link>
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
            <p>Solid structures and patient plans. It is the same question I ask of most systems: what breaks if I move this?</p>
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
            <span className="mini-copy">Gaming is how I meet people and build friendships. It also gave me a match lobby I wanted to build.</span>
            <span className="link">To Back2CSGO <span aria-hidden="true">↑</span></span>
          </a>
          <a href={`#${jarvis.slug}`} className="mini">
            <span className="eyebrow">The playlist</span>
            <svg viewBox="0 0 400 60" className="line mini-wave" aria-hidden="true">
              <path d="M0 30 H70 L80 18 L90 42 L100 8 L112 52 L124 14 L136 46 L148 22 L160 38 L172 26 L184 34 L196 30 H400" />
            </svg>
            <span className="mini-copy">A headphone cable turned into a waveform, and the waveform turned into my first real project.</span>
            <span className="link">To Jarvis <span aria-hidden="true">↑</span></span>
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
              <a href={`mailto:${links.email}`} className="cta cta--lg">Email me <span aria-hidden="true">↗</span></a>
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
