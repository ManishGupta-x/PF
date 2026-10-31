import stats from '@/lib/dmo-stats.json';

const inr = (n: number) => n.toLocaleString('en-IN');
const date = (iso: string, parts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { ...parts, timeZone: 'UTC' });
const monthName = (month: string, form: 'short' | 'long' = 'short') => date(`${month}-01`, { month: form });
const peak = <T,>(rows: T[], value: (row: T) => number) => rows.reduce((best, row) => (value(row) > value(best) ? row : best));

const first = stats.months[0];
const latest = stats.months[stats.months.length - 1];
const fyMonths = stats.months.filter(m => m.month >= stats.from.slice(0, 7));

type Column = { key: string; label: string; value: number; text: string };

// Server-rendered, so every value is in the page for screen readers and shows on hover or keyboard focus.
function Columns({ title, note, rows, ticks, labelled }: { title: string; note: string; rows: Column[]; ticks: number[]; labelled: string[] }) {
  const max = ticks[ticks.length - 1];
  return (
    <figure className="viz" data-reveal="">
      <figcaption><h3>{title}</h3><p>{note}</p></figcaption>
      <div className="viz-plot">
        <div aria-hidden="true">{ticks.map(t => <span key={t} className="viz-tick" style={{ '--at': t / max } as React.CSSProperties}>{t}</span>)}</div>
        <ol className="viz-cols">
          {rows.map(r => (
            <li key={r.key} tabIndex={0} className={labelled.includes(r.key) ? 'is-labelled' : undefined}>
              <span className="viz-area"><span className="viz-col" style={{ height: `${(r.value / max) * 100}%` }}><span className="viz-val">{r.text}</span></span></span>
              <span className="viz-x">{r.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

function Bars({ title, note, rows }: { title: string; note: string; rows: { label: string; value: number; text: string }[] }) {
  const max = Math.max(...rows.map(r => r.value));
  return (
    <figure className="viz" data-reveal="">
      <figcaption><h3>{title}</h3><p>{note}</p></figcaption>
      <ul className="viz-bars">
        {rows.map(r => (
          <li key={r.label}>
            <span>{r.label}</span>
            <span className="viz-track"><i style={{ width: `${(r.value / max) * 100}%` }} /></span>
            <b>{r.text}</b>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export default function DmoResults() {
  const kpis = [
    { label: 'Recorded sales', value: `₹${stats.salesCrore} Cr`, text: `Collected across outlets since ${date(stats.from, { day: 'numeric', month: 'long' })}, this financial year.` },
    { label: 'Sales growth', value: `+${Math.round(stats.salesGrowthPct)}%`, text: 'April to September, compared with the same months of 2025, at the same four outlets.' },
    { label: 'Orders a day', value: String(stats.ordersPerDay), text: `${inr(stats.orders)} individual orders recorded so far this financial year.` },
    { label: 'In-store orders a day', value: String(stats.inStorePerDay), small: true, text: 'Dine-in and takeaway bills at the counter.' },
    { label: 'Busiest day', value: String(stats.busiestDay.orders), small: true, text: `Orders on ${date(stats.busiestDay.date)}.` },
    { label: 'Online share', value: `${latest.onlinePct}%`, small: true, text: `Of orders in ${monthName(latest.month, 'long')}, up from ${first.onlinePct}% in ${monthName(first.month, 'long')}.` },
  ];
  const peakSales = peak(fyMonths, m => m.salesLakh);
  const peakOrders = peak(stats.months, m => m.ordersPerDay);

  return (
    <section className="results s-dark" aria-labelledby="results-title">
      <i className="t" data-t="" style={{ '--x': '96.5%', '--y': '0%' } as React.CSSProperties} />
      <i className="t" data-t="" style={{ '--x': '96.5%', '--y': '50%' } as React.CSSProperties} />
      <i className="t" data-t="" style={{ '--x': '96.5%', '--y': '100%' } as React.CSSProperties} />
      <div className="results-in z">
        <p className="eyebrow eyebrow--orange">Results / {date(stats.from)} to {date(stats.asOf)}</p>
        <h2 id="results-title" className="display display--md">Real service.<br />Real numbers.</h2>
        <p className="lede">The ecosystem runs daily service at outlets including Grand Hotel Shimla, GuptaJees, and Chennai Maratha.</p>

        <dl className="results-kpis">
          {kpis.map(k => (
            <div key={k.label} className={k.small ? 'is-small' : undefined}>
              <dt className="eyebrow">{k.label}</dt>
              <dd className="results-num">{k.value}</dd>
              <dd>{k.text}</dd>
            </div>
          ))}
        </dl>

        <div className="results-charts">
          <Columns
            title="Recorded sales by month"
            note="₹ lakh, this financial year."
            ticks={[0, 20, 40]}
            labelled={[peakSales.month, latest.month]}
            rows={fyMonths.map(m => ({ key: m.month, label: monthName(m.month), value: m.salesLakh, text: `₹${m.salesLakh}L` }))}
          />
          <Columns
            title="Orders a day"
            note="Average for each month, since bill-by-bill recording began."
            ticks={[0, 150, 300]}
            labelled={[peakOrders.month, latest.month]}
            rows={stats.months.map(m => ({ key: m.month, label: monthName(m.month), value: m.ordersPerDay, text: String(m.ordersPerDay) }))}
          />
          <Columns
            title="Online share of orders"
            note="Percent of each month's orders placed online."
            ticks={[0, 10, 20]}
            labelled={[first.month, latest.month]}
            rows={stats.months.map(m => ({ key: m.month, label: monthName(m.month), value: m.onlinePct, text: `${m.onlinePct}%` }))}
          />
          <Bars
            title="Sales growth by outlet"
            note="April to September, 2026 compared with 2025."
            rows={[...stats.outletGrowth].sort((a, b) => b.pct - a.pct).map(o => ({ label: `${o.name}, ${o.place}`, value: o.pct, text: `+${o.pct}%` }))}
          />
          <Bars
            title="How customers order"
            note="Share of orders this financial year."
            rows={stats.channels.map(c => ({ label: c.label, value: c.pct, text: `${c.pct}%` }))}
          />
        </div>

        <details className="results-table">
          <summary>View the monthly figures</summary>
          <table className="g-table g-table--dark">
            <thead><tr><th scope="col">Month</th><th scope="col">Sales (₹ lakh)</th><th scope="col">Orders a day</th><th scope="col">Online share</th></tr></thead>
            <tbody>
              {stats.months.map(m => <tr key={m.month}><th scope="row">{monthName(m.month)} {m.month.slice(0, 4)}</th><td>{m.salesLakh}</td><td>{m.ordersPerDay}</td><td>{m.onlinePct}%</td></tr>)}
            </tbody>
          </table>
        </details>

        <p className="results-note">
          Source: DropMyOrder Control Tower, as of {date(stats.asOf)}. Completed bills only, without cancelled bills or staff meals. Sales are amounts collected, not profit. One outlet records its sales as a daily consolidated entry, so entries of ₹5,000 or more count towards sales but not orders. Most 2025 sales were recorded as daily entries, so growth is compared on sales only.
        </p>
      </div>
    </section>
  );
}
