'use client';
import Image from 'next/image';
import { videoCover } from '@/lib/video-thumbnails';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Clip = { title: string; id: string };

const pad = (n: number) => String(n).padStart(2, '0');

function Video({ clip, series, index, onPlay }: { clip: Clip; series: string; index: number; onPlay: () => void }) {
  return (
    <figure className="video">
      <div className="video-frame">
        <button type="button" onClick={onPlay} aria-label={`Play ${clip.title}`}>
          <span className="video-cover" aria-hidden="true">
            <Image className="video-cover-image" src={videoCover(clip.title, series)} alt="" fill sizes={series === 'Tournament' ? '100vw' : '(max-width: 760px) 100vw, 33vw'} quality={90} />
            <span className="video-cover-meta"><span>{series}</span><span className="video-cover-index">{pad(index)}</span></span>
            <span className="video-cover-title">{clip.title}</span>
            <span className="video-play">▶ Watch highlight <span className="video-play-arrow">↗</span></span>
          </span>
        </button>
      </div>
      <figcaption>{clip.title}</figcaption>
    </figure>
  );
}

// Nothing from YouTube's player loads until the visitor asks for it.
// Once they do, the chosen clip plays large and the rest of the set queues up beside it.
export function Clips({ groups }: { groups: { label: string; clips: Clip[] }[] }) {
  const [group, setGroup] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const { label, clips } = groups[group];
  const play = (i: number) => {
    setPlaying(i);
    requestAnimationFrame(() => watchRef.current?.scrollIntoView({ block: 'start' }));
  };
  const clip = playing === null ? null : clips[playing];

  return (
    <>
      {groups.length > 1 && (
        <div className="clip-filter" role="group" aria-label="Clips by game">
          {groups.map((g, i) => (
            <button key={g.label} type="button" aria-pressed={i === group} onClick={() => { setGroup(i); setPlaying(null); }}>{g.label}</button>
          ))}
        </div>
      )}
      {clip ? (
        <div ref={watchRef} className={`watch${clips.length === 1 ? ' watch--single' : ''}`}>
          <figure className="watch-main">
            <div className="video-frame">
              <iframe
                key={clip.id}
                src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&rel=0`}
                title={clip.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <figcaption>
              <span className="watch-meta">{label} · {pad(playing! + 1)} / {pad(clips.length)}</span>
              <span className="watch-title">{clip.title}</span>
              <button type="button" className="watch-back" onClick={() => setPlaying(null)}>← All clips</button>
            </figcaption>
          </figure>
          {clips.length > 1 && (
            <ol className="watch-list" aria-label="Up next">
              {clips.map((c, i) => i !== playing && (
                <li key={c.id}>
                  <button type="button" onClick={() => play(i)}>
                    <span className="watch-thumb">
                      <Image src={videoCover(c.title, label)} alt="" fill sizes="168px" />
                      <span className="watch-thumb-index">{pad(i + 1)}</span>
                    </span>
                    <span className="watch-item-title">{c.title}</span>
                    <span className="watch-item-meta">{label}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <div className={`video-grid${clips.length === 1 ? ' video-grid--single' : ''}`}>
          {clips.map((c, i) => <Video key={c.id} clip={c} series={label} index={i + 1} onPlay={() => play(i)} />)}
        </div>
      )}
    </>
  );
}

export default function GamingTabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + tabs.length) % tabs.length;
    setActive(i);
    refs.current[i]?.focus();
  };
  return (
    <>
      <div role="tablist" aria-label="Gaming career" className="g-tabs" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={el => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`g-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`g-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`g-panel-${t.id}`} aria-labelledby={`g-tab-${t.id}`} hidden={i !== active} tabIndex={0} className="g-panel">
          {t.content}
        </div>
      ))}
    </>
  );
}
