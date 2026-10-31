'use client';
import Demo, { at, T, type Build } from '@/components/Demo';
import { Cylinder, Headphones } from './art';

const BARS = [14, 30, 46, 22, 62, 84, 40, 70, 96, 58, 34, 76, 50, 88, 42, 64, 28, 54, 20, 36];
const QUEUE = [['Slow Monsoon', '03:35'], ['Hill Station Radio', '04:12'], ['Night Bus', '02:58']];
// Thread becomes a waveform: amplitude grows, then settles as it reaches the message.
const WAVE = Array.from({ length: 13 }, (_, i) => {
  const amp = 46 * Math.sin((i / 12) * Math.PI);
  return `${(i / 12) * 100},${(50 + (i % 2 ? amp : -amp)).toFixed(1)}`;
}).join(' ');

const build: Build = (tl, q, step) => {
  tl.call(step, ['A message asks Jarvis to play something.'])
    .from(q('.o-chat'), { autoAlpha: 0, y: 20, duration: 0.45, ease: 'power2.out' })
    .from(q('.chat-user'), { autoAlpha: 0, x: -10, duration: 0.3 })
    .from(q('.chat-bot'), { autoAlpha: 0, y: 10, duration: 0.35 }, '+=0.3')
    .call(step, ['The track joins the queue.'], '+=0.3')
    .from(q('.o-queue2'), { autoAlpha: 0, y: 20, duration: 0.4 })
    .from(q('.j-q'), { autoAlpha: 0, x: 10, stagger: 0.16, duration: 0.25 })
    .call(step, ['Playback starts, with a filter applied.'], '+=0.3')
    .from(q('.o-player'), { autoAlpha: 0, y: 20, duration: 0.4 })
    .from(q('.bar'), { scaleY: 0.08, stagger: { each: 0.03, from: 'center' }, duration: 0.35, ease: 'power2.out' })
    .from(q('.filter-on'), { autoAlpha: 0, duration: 0.25 })
    .call(step, ['The playlist is saved to MongoDB.'], '+=0.4')
    .from(q('.o-list'), { autoAlpha: 0, y: 20, duration: 0.4 })
    .from(q('.o-mongo'), { autoAlpha: 0, y: 20, duration: 0.4 }, '-=0.1')
    .from(q('.j-packet'), { left: '0%', duration: 0.9, ease: 'power1.inOut' });
};

export default function Jarvis() {
  return (
    <Demo
      className="stage stage--jarvis"
      label="An explanatory sequence in original artwork: a Discord-style message asks to play a fictional track, it joins a queue, playback starts with a waveform and an audio filter, and the playlist is saved to MongoDB."
      finalStep="From a message to a saved playlist."
      note="Illustrated workflow · Sample tracks"
      build={build}
    >
      <div className="obj o-phones" style={at(3, 6, 12, -8)}><Headphones /></div>
      <T x={72} y={-10} />
      <T x={22} y={0} />
      <T x={5.5} y={17.5} />
      <T x={8} y={25} />
      <T x={13} y={23} w={18} h={5} pts={WAVE} />
      <T x={46} y={13} />
      <T x={76} y={14} />
      <T x={84} y={32} />
      <T x={60} y={45} />
      <T x={18} y={45} />
      <T x={41} y={47} />
      <T x={75} y={50} />
      <T x={88.7} y={54} />

      <div className="obj o-chat" style={at(33, 5, 28, -1)}>
        <div className="paper-card chat">
          <p className="tiny dim">#MUSIC / DISCORD</p>
          <div className="chat-user"><i>S</i><p><b>sample_listener</b><br />-play slow monsoon</p></div>
          <div className="chat-bot"><i>J</i><p><b>Jarvis</b> <small>BOT</small><br />Added to queue: Slow Monsoon<br /><span className="dim">Sample Artist / 03:35</span></p></div>
        </div>
      </div>

      <div className="obj o-queue2" style={at(66, 8, 20, 2)}>
        <div className="paper-card">
          <p className="tiny dim">QUEUE</p>
          {QUEUE.map(([t, d], i) => (
            <p className={`spread j-q ${i === 0 ? 'j-now' : ''}`} key={t}><span>{i + 1}. {t}</span><span>{d}</span></p>
          ))}
        </div>
      </div>

      <div className="obj o-player" style={at(36, 26, 38)}>
        <div className="player">
          <div className="wave">{BARS.map((h, i) => <i key={i} className="bar" style={{ height: `${h}%` }} />)}</div>
          <div className="controls">
            <span>⏮</span><span className="play">▶</span><span>⏭</span>
            <span className="spread-auto tiny"><b className="filter-on">FILTER: NIGHTCORE</b></span>
          </div>
        </div>
      </div>

      <div className="obj o-list" style={at(8, 40, 21, -2)}>
        <div className="paper-card">
          <p className="tiny dim">PLAYLIST / SAMPLE</p>
          <p className="spread"><b>Late night builds</b><span>3 tracks</span></p>
          <div className="sync-line sync-line--ink"><i className="packet j-packet" /></div>
        </div>
      </div>

      <div className="obj o-mongo" style={at(33, 42, 18)}>
        <div className="with-art">
          <Cylinder />
          <div>
            <p className="tiny">MONGODB</p>
            <p className="tiny dim">USERS</p>
            <p className="tiny dim">PLAYLISTS</p>
          </div>
        </div>
      </div>
    </Demo>
  );
}
