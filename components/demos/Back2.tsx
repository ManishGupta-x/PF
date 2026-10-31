'use client';
import Demo, { at, T, type Build } from '@/components/Demo';
import { Rack } from './art';

const CT = ['kestrel', 'nomad', 'vanta', 'orbit_9', 'pixel'];
const TR = ['ember', 'rook', 'sable', 'quill', 'mantis'];
const QUEUE = [...CT, ...TR].sort();
// Bans alternate; the last map standing is the match map. Fictional order.
const MAPS = ['Nuke', 'Ancient', 'Overpass', 'Anubis', 'Inferno', 'Dust II', 'Mirage'];
const BANS: [string, string][] = [['Nuke', 'CT'], ['Dust II', 'T'], ['Overpass', 'CT'], ['Ancient', 'T'], ['Inferno', 'CT'], ['Anubis', 'T']];
const slug = (s: string) => s.toLowerCase().replace(/\W/g, '');

const build: Build = (tl, q, step) => {
  tl.call(step, ['Players join the queue.'])
    .from(q('.o-queue'), { autoAlpha: 0, y: 20, duration: 0.4 })
    .from(q('.q-row'), { autoAlpha: 0, x: -10, stagger: 0.11, duration: 0.2 })
    .call(step, ['Two teams form.'], '+=0.3')
    .from(q('.o-teams'), { autoAlpha: 0, y: 20, duration: 0.4 })
    .from(q('.team-row'), { autoAlpha: 0, y: 6, stagger: 0.05, duration: 0.2 })
    .call(step, ['Captains take turns banning maps.'], '+=0.3')
    .from(q('.o-veto'), { autoAlpha: 0, y: 20, duration: 0.4 })
    .from(q('.map-card'), { autoAlpha: 0, y: 12, stagger: 0.05, duration: 0.2 }, '-=0.1');
  BANS.forEach(([map]) => {
    tl.from(q(`.map-${slug(map)} .ban`), { autoAlpha: 0, scale: 1.5, duration: 0.2, ease: 'power3.out' }, '+=0.3')
      .from(q(`.map-${slug(map)} svg, .map-${slug(map)} span`), { opacity: 1, duration: 0.2 }, '<');
  });
  tl.call(step, ['One map left. The match is ready.'], '+=0.2')
    .from(q('.o-ready'), { autoAlpha: 0, y: 20, duration: 0.45, ease: 'power2.out' })
    .from(q('.o-server'), { autoAlpha: 0, y: 20, duration: 0.45 }, '<0.1')
    .from(q('.o-server .led'), { fill: 'transparent', stagger: 0.12, duration: 0.15 });
};

export default function Back2() {
  return (
    <Demo
      className="stage stage--back2"
      label="An explanatory sequence with fictional players: ten players join a queue, two teams form, captains ban maps in turn until Mirage is left, and a match-ready panel appears beside a server status drawing."
      finalStep="Queue → Teams → Map veto → Match ready."
      note="Illustrated workflow · Sample players"
      build={build}
    >
      <T x={70} y={-9} />
      <T x={13} y={3} />
      <T x={13} y={16} />
      <T x={36} y={18} />
      <T x={68} y={16} />
      <T x={62} y={38} />
      <T x={82} y={40} />
      <T x={95} y={46} />

      <div className="obj o-queue" style={at(4, 6, 17, -1.5)}>
        <div className="terminal terminal--light">
          <div className="terminal-top"><span>MATCHMAKING</span><span>QUEUE</span></div>
          {QUEUE.map((n, i) => (
            <div className="q-row" key={n}><span>{String(i + 1).padStart(2, '0')}</span><span>{n}</span><span>READY</span></div>
          ))}
        </div>
      </div>

      <div className="obj o-teams" style={at(24, 11, 24)}>
        <div className="teams">
          {[['COUNTER-TERRORISTS', CT], ['TERRORISTS', TR]].map(([name, list]) => (
            <div key={name as string}>
              <p className="tiny"><b>{name as string}</b></p>
              {(list as string[]).map((n, i) => (
                <p className="team-row" key={n}>{n}{i === 0 && <em>CAPTAIN</em>}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="obj o-veto" style={at(50, 7, 36)}>
        <p className="tiny dim">MAP VETO / SEVEN MAPS, ALTERNATING</p>
        <div className="maps">
          {MAPS.map(m => {
            const ban = BANS.find(b => b[0] === m);
            return (
              <div key={m} className={`map-card map-${slug(m)} ${ban ? 'is-banned' : 'is-picked'}`}>
                <svg viewBox="0 0 100 70" className="line"><path d="M0 60 L22 34 L38 48 L58 18 L78 44 L100 26" /><path d="M0 70 H100" /></svg>
                <span>{m}</span>
                {ban && <b className="ban">✕ {ban[1]}</b>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="obj o-ready" style={at(52, 34, 22, -1)}>
        <div className="ink-card">
          <p className="tiny">MATCH READY</p>
          <p className="ready-map">MIRAGE</p>
          <p className="tiny spread"><span>5V5 / SAMPLE</span><span>CONNECT →</span></p>
        </div>
      </div>

      <div className="obj o-server" style={at(77, 34, 10)}>
        <Rack rows={4} />
        <p className="obj-tag">SERVER / SAMPLE STATUS</p>
      </div>
    </Demo>
  );
}
