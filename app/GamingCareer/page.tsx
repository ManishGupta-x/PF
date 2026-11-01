import type { Metadata } from 'next';
import Image from 'next/image';
import GamingTabs, { Clips } from '@/components/GamingTabs';
import { gaming, links } from '@/lib/content';
import desk from '@/public/images/desk.jpeg';

export const metadata: Metadata = {
  title: 'Beyond the Coder',
  description: 'Counter-Strike, chess, music, and the communities behind the projects. The personal side of Manish Gupta.',
  alternates: { canonical: '/GamingCareer' },
};

export const revalidate = 86400;

type Mode = { last?: { rating: number }; best?: { rating: number }; record?: { win: number; loss: number; draw: number } };

// Changing numbers are fetched and dated. If Chess.com is unreachable the section is omitted.
async function chessStats() {
  try {
    const res = await fetch('https://api.chess.com/pub/player/nightmare_22/stats', {
      headers: { 'User-Agent': 'manish-gupta-portfolio' },
      next: { revalidate },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, Mode>;
    const modes = (['chess_rapid', 'chess_blitz', 'chess_bullet'] as const)
      .map(k => ({ name: k.replace('chess_', ''), ...data[k] }))
      .filter(m => m.last);
    return modes.length ? { modes, fetched: new Date() } : null;
  } catch {
    return null;
  }
}

export default async function GamingCareer() {
  const chess = await chessStats();

  const tabs = [
    {
      id: 'counter-strike',
      label: 'Counter-Strike',
      content: (
        <>
          <div className="g-intro">
            <p className="lede">I’ve played CS:GO since 2021 and CS2 since its release in 2023. What keeps me coming back is the mix of strategy, teamwork, and people I would never have met otherwise.</p>
            <dl className="g-facts">
              <div><dt>{gaming.hours} hours</dt><dd>Counter-Strike playtime, and plenty of reasons for one more match.</dd></div>
              <div><dt>{gaming.rank}</dt><dd>From my CS:GO rank history.</dd></div>
            </dl>
          </div>
          <Clips groups={[{ label: 'CS:GO', clips: gaming.clips.csgo }, { label: 'CS2', clips: gaming.clips.cs2 }]} />
          <p><a className="link" href={links.clips} target="_blank" rel="noreferrer">Watch more on Allstar <span aria-hidden="true">↗</span></a></p>
        </>
      ),
    },
    {
      id: 'chess',
      label: 'Chess',
      content: (
        <>
          <div className="g-intro">
            <p className="lede">Samay Raina introduced me to the chess community; GothamChess helped me find my footing. I enjoy the patience, the patterns, and the moment a position finally makes sense.</p>
            <dl className="g-facts">
              <div><dt>{gaming.openings.black}</dt><dd>With Black.</dd></div>
              <div><dt>{gaming.openings.white}</dt><dd>With White.</dd></div>
            </dl>
          </div>
          {chess && (
            <>
              <table className="g-table">
                <caption>
                  Chess.com ratings · Updated {chess.fetched.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })}.
                </caption>
                <thead><tr><th scope="col">Mode</th><th scope="col">Rating</th><th scope="col">Best</th><th scope="col">W / L / D</th></tr></thead>
                <tbody>
                  {chess.modes.map(m => (
                    <tr key={m.name}>
                      <th scope="row">{m.name}</th>
                      <td>{m.last?.rating}</td>
                      <td>{m.best?.rating ?? 'n/a'}</td>
                      <td>{m.record ? `${m.record.win} / ${m.record.loss} / ${m.record.draw}` : 'n/a'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <p><a className="link" href={links.chess} target="_blank" rel="noreferrer">Chess.com profile <span aria-hidden="true">↗</span></a></p>
        </>
      ),
    },
    {
      id: 'tournaments',
      label: 'Tournament Matches',
      content: (
        <>
          <p className="lede g-intro-single">Team play, pressure, and a few rounds worth revisiting.</p>
          <Clips groups={[{ label: 'Tournament', clips: gaming.clips.tournament }]} />
        </>
      ),
    },
  ];

  return (
    <>
      <header className="case-hero s-dark">
        <p className="eyebrow z">Beyond the coder</p>
        <h1 className="display display--case z" data-hero-line="">One more match.</h1>
        <p className="lede z" data-hero-fade="">Counter-Strike, chess, and the communities that make both worth coming back to.</p>
      </header>
      <section className="g-body s-ivory" aria-label="Gaming career details">
        <GamingTabs tabs={tabs} />
      </section>
      <section className="g-setup s-dark" aria-labelledby="setup-title">
        <h2 id="setup-title" className="display display--sm">The setup behind the commits and the clutches.</h2>
        <div className="g-setup-grid">
          <Image src={desk} alt="A dark, red-lit desk with two monitors, a microphone, keyboard, mouse, chair and PC tower." sizes="(max-width: 760px) 100vw, 55vw" />
          <table className="g-table g-table--dark">
            <caption>Setup reference / Hardware listed in my previous portfolio.</caption>
            <tbody>
              {gaming.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
