import Image from 'next/image';
import Link from 'next/link';
import systems from '@/public/images/stories/expertise-systems.webp';
import s from '@/components/ExpertiseVisual.module.css';

export default function NotFound() {
  return <section className={`s-dark ${s.error}`}>
    <div className={s.grid}>
      <div><p className="eyebrow">404 / A loose end</p><h1>The thread ends here.</h1><p><Link className="cta" href="/">Back to the portfolio <span aria-hidden="true">←</span></Link></p></div>
      <figure className={s.art}><Image src={systems} alt="" sizes="(max-width: 900px) 100vw, 55vw" quality={90} /></figure>
    </div>
  </section>;
}
