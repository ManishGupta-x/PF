import Image from 'next/image';
import { projectArt } from '@/lib/visuals';

export default function ProjectArt({ slug, variant = 'chapter' }: { slug: string; variant?: 'chapter' | 'case' }) {
  const art = projectArt[slug];
  if (!art) return null;

  return (
    <figure className={`project-art project-art--${variant}`}>
      <div className="project-art-image">
        <Image src={art.image} alt={art.alt} sizes={variant === 'case' ? '92vw' : '(max-width: 760px) 90vw, 66vw'} />
      </div>
      <figcaption>
        <span className="eyebrow">{art.number} / Concept illustration</span>
        <span className="project-art-rule" aria-hidden="true" />
        <span className="project-art-title">{art.title}</span>
        <span className="project-art-copy">{art.description}</span>
      </figcaption>
    </figure>
  );
}
