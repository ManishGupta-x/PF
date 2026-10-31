import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import Thread from '@/components/Thread';
import Back2 from '@/components/demos/Back2';
import type { Project } from '@/lib/content';
import { back2Activity } from '@/lib/back2-activity';
import home from '@/public/images/back2csgo/live-home.webp';
import casuals from '@/public/images/back2csgo/live-casuals.webp';
import maps from '@/public/images/back2csgo/live-maps.webp';
import matchmaking from '@/public/images/back2csgo/matchmaking.webp';
import stats from '@/public/images/back2csgo/stats.webp';
import activity from '@/public/images/back2csgo/activity.webp';
import s from './Back2Case.module.css';

function Screen({ image, alt, caption, priority = false }: { image: StaticImageData; alt: string; caption: string; priority?: boolean }) {
  return <figure className={s.screen}>
    <a href={image.src} target="_blank" rel="noreferrer" aria-label={`View full-size: ${alt}`}>
      <Image src={image} alt={alt} sizes="(max-width: 900px) 100vw, 65vw" priority={priority} quality={90} />
      <span className={s.expand} aria-hidden="true">↗</span>
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export default function Back2Case({ project: p, next }: { project: Project; next: Project }) {
  return <div className={s.page}>
    <Thread />
    <header className={`s-dark ${s.hero}`}>
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} z`}>
        <p className="eyebrow"><Link href="/#work" className="back">← Selected work</Link> / 03 / Community platform</p>
        <h1 className={s.title} data-hero-line="">BACK2CSGO</h1>
        <div className={s.heroBottom}>
          <h2>Built by a player.<br />Engineered for the community.</h2>
          <div className={s.heroCopy}>
            <p>{p.summary}</p>
            <a className="cta" href="https://back2csgo.com/" target="_blank" rel="noreferrer">Explore the live product <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <dl className={s.meta}>
          <div><dt>My role</dt><dd>Frontend & real-time engineering</dd></div>
          <div><dt>For</dt><dd>The original CS:GO community</dd></div>
          <div><dt>Status</dt><dd><span className={s.liveDot} /> Live product</dd></div>
        </dl>
      </div>
    </header>

    <section className={`s-ivory ${s.section}`} aria-labelledby="back2-origin">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.split} z`}>
        <div className={s.copy}>
          <p className={s.kicker}>01 / The starting point</p>
          <h2 id="back2-origin">The game moved on.<br />The community stayed.</h2>
          {p.context.map(t => <p key={t}>{t}</p>)}
          <div className={s.note}><strong>5,000+ hours</strong><span>My time in Counter-Strike. A player’s perspective on every interaction.</span></div>
        </div>
        <Screen image={home} alt="Live Back2CSGO homepage with regional servers, ping indicators, copy commands and connect controls" caption="Server discovery / Captured from the live site · 31 Oct 2026" priority />
      </div>
      <div className={`${s.wrap} ${s.brief} z`}>
        <div><p className={s.kicker}>The challenge</p><h3>Ten players. One shared next step.</h3><p>{p.problem}</p></div>
        <div><p className={s.kicker}>My contribution</p><p>{p.role}</p></div>
        <div><p className={s.kicker}>The experience</p><p>Make finding a server, joining a lobby, and reaching a playable match feel like one continuous journey.</p></div>
      </div>
    </section>

    <section className={`s-dark ${s.section}`} aria-labelledby="back2-matchmaking">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.sectionHead} z`}>
        <div><p className={s.kicker}>02 / From intent to action</p><h2 id="back2-matchmaking">Less setup.<br />More Counter-Strike.</h2></div>
        <p className={s.intro}>Region, game mode, and lobby entry sit close together. Players can see the path into a match before committing to it.</p>
      </div>
      <div className={`${s.wrap} ${s.split} ${s.reverse} z`}>
        <Screen image={matchmaking} alt="Back2CSGO matchmaking with modes from 1v1 to 5v5, lobby entry and a queue sidebar" caption="Match entry / Product capture supplied by Manish" />
        <div className={s.copy}>
          <h3>A clear route into the game.</h3>
          <ol className={s.steps}>
            <li><span>01</span><div><h4>Find your region</h4><p>Server discovery and ping measurement put connection quality in the decision.</p></div></li>
            <li><span>02</span><div><h4>Choose how to play</h4><p>Modes from a 1v1 duel to 5v5 competitive make the available formats explicit.</p></div></li>
            <li><span>03</span><div><h4>Bring the team along</h4><p>Lobby codes, queue state, and participant lists keep the group visible.</p></div></li>
          </ol>
          <p className={s.small}>The matchmaking interface connects to a separate pairing and game-server backend.</p>
        </div>
      </div>
    </section>

    <section className={`s-ivory ${s.section}`} aria-labelledby="back2-realtime">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.sectionHead} z`}>
        <div><p className={s.kicker}>03 / Engineering the handoff</p><h2 id="back2-realtime">One match.<br />Everyone in sync.</h2></div>
        <p className={s.intro}>The work is in the transitions: queue to teams, teams to map veto, and the selected map to a ready server.</p>
      </div>
      <div className={s.walkthrough}><Back2 /></div>
      <div className={`${s.wrap} ${s.decisions} z`}>
        {p.decisions.map((d, i) => <article key={d.title}><span className={s.kicker}>0{i + 1} / Engineering decision</span><h3>{d.title}</h3><p>{d.text}</p></article>)}
      </div>
    </section>

    <section className={`s-dark ${s.section}`} aria-labelledby="back2-community">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.sectionHead} z`}>
        <div><p className={s.kicker}>04 / A community in motion</p><h2 id="back2-community">Real players.<br />Rounds worth returning for.</h2></div>
        <div className={s.intro}><p>A view of the community beyond the queue: recent activity, player comparisons, and the moments that make people come back.</p><p className={s.small}>Past-month activity · Snapshot from {back2Activity.capturedLabel}.</p></div>
      </div>
      <dl className={`${s.wrap} ${s.metrics} z`}>
        {back2Activity.metrics.map(m => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}
      </dl>
      <div className={`${s.wrap} ${s.split} ${s.reverse} z`}>
        <Screen image={casuals} alt="Live casuals dashboard showing 363 matches, 802 players, 78,409 kills, 7,617 rounds and 652 aces" caption="Casual community / Captured from the live site · 31 Oct 2026" />
        <div className={s.copy}>
          <h3>Activity at a glance.<br />Detail when it matters.</h3>
          <p>The overview brings totals, recent trends, and player comparisons into one screen. Clear hierarchy makes a dense set of game data easier to scan.</p>
          <p>Matches, players, weapons, maps, and records provide separate paths into the detail, while the community overview stays focused on the bigger picture.</p>
          <a className="cta" href={back2Activity.source} target="_blank" rel="noreferrer">View current activity <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>

    <section className={`s-ivory ${s.section}`} aria-labelledby="back2-performance">
      <i className={`t ${s.anchor}`} data-t="" />
      <div className={`${s.wrap} ${s.split} z`}>
        <div className={s.copy}>
          <p className={s.kicker}>05 / Beyond the final score</p>
          <h2 id="back2-performance">Every match<br />leaves a story.</h2>
          <p>Map-level views give the community another way to explore its play: compare popularity, rounds, and side balance across familiar competitive maps and community variants.</p>
          <p>It turns a match history into something players can browse, compare, and return to.</p>
        </div>
        <Screen image={maps} alt="Live Back2CSGO map analytics with match totals, rounds and CT versus T win balance" caption="Map analytics / Captured from the live site · 31 Oct 2026" />
      </div>
      <div className={`${s.wrap} ${s.split} ${s.reverse} ${s.followup} z`}>
        <Screen image={stats} alt="Back2CSGO player career and performance view with rank, distribution charts and match trends" caption="Player performance / Product capture supplied by Manish · Historical snapshot" />
        <div className={s.copy}>
          <h3>A career is more<br />than a rank.</h3>
          <p>The player view places rank alongside damage, accuracy, and performance trends. Distribution charts add comparison; the match timeline adds context over time.</p>
          <p className={s.small}>The signed-in player view is shown using a supplied product capture. Its figures are separate from the dated public community totals above.</p>
        </div>
      </div>
      <div className={`${s.wrap} ${s.split} ${s.followup} z`}>
        <div className={s.copy}><h3>Keep the community<br />in the picture.</h3><p>Recent match results and standout rounds make the platform feel active between games. The product connects the practical work of joining a server with the social experience around it.</p></div>
        <Screen image={activity} alt="Back2CSGO community activity showing match trends, recent results and standout rounds" caption="Between matches / Product capture supplied by Manish · Historical snapshot" />
      </div>
    </section>

    <section className={`s-dark ${s.section}`} aria-labelledby="back2-stack">
      <div className={`${s.wrap} ${s.sectionHead} z`}>
        <div><p className={s.kicker}>06 / Under the interface</p><h2 id="back2-stack">A connected frontend.<br />A deliberate boundary.</h2></div>
        <p className={s.intro}>My work spans the web experience and real-time client flows. Match pairing and game-server infrastructure are handled by the separate backend.</p>
      </div>
      <dl className={`${s.wrap} ${s.stack} z`}>{p.tech.map(t => <div key={t.group}><dt>{t.group}</dt><dd>{t.items.join(' / ')}</dd></div>)}</dl>
      <div className={`${s.wrap} ${s.closing} z`}><span className="badge">{p.status}</span><a className="cta" href="https://back2csgo.com/" target="_blank" rel="noreferrer">Visit Back2CSGO <span aria-hidden="true">↗</span></a></div>
    </section>
    <nav className={`s-ivory ${s.next}`} aria-label="Next project"><div className={`${s.wrap} z`}><p className={s.kicker}>Next / {next.number}</p><Link href={`/work/${next.slug}`}>{next.title} <span aria-hidden="true">↗</span></Link></div></nav>
  </div>;
}
