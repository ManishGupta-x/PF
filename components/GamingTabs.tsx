'use client';
import Image from 'next/image';
import { videoCover } from '@/lib/video-thumbnails';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Clip = { title: string; id: string };

// Nothing from YouTube's player loads until the visitor asks for it.
export function Video({ clip, series = 'Highlights', index = 1 }: { clip: Clip; series?: string; index?: number }) {
  const [on, setOn] = useState(false);
  return (
    <figure className={`video${on ? ' video--playing' : ''}`}>
      <div className="video-frame">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&rel=0`}
            title={clip.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play ${clip.title}`}>
            <span className="video-cover" aria-hidden="true">
              <Image className="video-cover-image" src={videoCover(clip.title, series)} alt="" fill sizes={series === 'Tournament' ? '100vw' : '(max-width: 760px) 100vw, 33vw'} quality={90} />
              <span className="video-cover-meta"><span>{series}</span><span className="video-cover-index">{String(index).padStart(2, '0')}</span></span>
              <span className="video-cover-title">{clip.title}</span>
              <span className="video-play">▶ Watch highlight <span className="video-play-arrow">↗</span></span>
            </span>
          </button>
        )}
      </div>
      <figcaption>{clip.title}</figcaption>
    </figure>
  );
}

export function Clips({ groups }: { groups: { label: string; clips: Clip[] }[] }) {
  const [group, setGroup] = useState(0);
  return (
    <>
      {groups.length > 1 && (
        <div className="clip-filter" role="group" aria-label="Clips by game">
          {groups.map((g, i) => (
            <button key={g.label} type="button" aria-pressed={i === group} onClick={() => setGroup(i)}>{g.label}</button>
          ))}
        </div>
      )}
      <div className={`video-grid${groups[group].clips.length === 1 ? ' video-grid--single' : ''}`}>
        {groups[group].clips.map((c, i) => <Video key={c.id} clip={c} series={groups[group].label} index={i + 1} />)}
      </div>
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
