import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="case-hero s-dark">
      <p className="eyebrow">404</p>
      <h1 className="display display--case">The thread ends here.</h1>
      <p><Link className="link" href="/">Back to the start <span aria-hidden="true">←</span></Link></p>
    </section>
  );
}
