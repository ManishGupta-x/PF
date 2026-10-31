'use client';
import { useRef, useState, type KeyboardEvent } from 'react';
import Demo, { at, T, type Build } from '@/components/Demo';
import { ecosystemModules as modules } from '@/lib/content';
import { Boxes, Rack } from './art';

const build: Build = (tl, q, step) => {
  tl.call(step, ['A sample order starts on the customer site.'])
    .from(q('.o-cust'), { autoAlpha: 0, y: 24, duration: 0.5, ease: 'power2.out' })
    .from(q('.cust-row'), { autoAlpha: 0, x: -10, stagger: 0.12, duration: 0.3 })
    .from(q('.cust-cart'), { autoAlpha: 0, y: 8, duration: 0.3 })
    .call(step, ['It reaches the outlet POS.'], '+=0.3')
    .from(q('.o-pos'), { autoAlpha: 0, y: 24, duration: 0.5, ease: 'power2.out' })
    .from(q('.o-backoffice'), { autoAlpha: 0, y: 16, duration: 0.4 }, '<0.1')
    .from(q('.pos-line'), { autoAlpha: 0, stagger: 0.14, duration: 0.25 })
    .call(step, ['The connection drops. The counter keeps billing.'], '+=0.5')
    .to(q('.net-on'), { autoAlpha: 0, duration: 0.15 })
    .to(q('.net-off'), { autoAlpha: 1, duration: 0.15 }, '<')
    .from(q('.o-bad'), { autoAlpha: 0, y: 12, duration: 0.4, ease: 'power2.out' }, '<')
    .from(q('.o-receipt'), { clipPath: 'inset(0 0 100% 0)', y: '-2em', duration: 1.1, ease: 'none' }, '+=0.3')
    .to(q('.queued'), { autoAlpha: 1, duration: 0.25 })
    .from(q('.sync-done'), { autoAlpha: 0, duration: 0 }, '<')
    .call(step, ['Connection back. The queued bill moves on.'], '+=1')
    .to(q('.net-off'), { autoAlpha: 0, duration: 0.15 })
    .to(q('.net-on'), { autoAlpha: 1, duration: 0.15 }, '<')
    .from(q('.packet'), { left: '0%', duration: 1, ease: 'power1.inOut' }, '+=0.2')
    .to(q('.queued'), { autoAlpha: 0, duration: 0.2 })
    .to(q('.sync-done'), { autoAlpha: 1, duration: 0.2 }, '<')
    .call(step, ['Separately, a warehouse stock request reaches outlet inventory.'], '+=0.5')
    .from(q('.o-boxes'), { autoAlpha: 0, y: 18, duration: 0.45 })
    .from(q('.o-req'), { autoAlpha: 0, y: 16, duration: 0.45 }, '-=0.1')
    .from(q('.o-inv'), { autoAlpha: 0, y: 18, duration: 0.45 }, '+=0.3')
    .from(q('.inv-fill'), { scaleX: 0.25, duration: 0.9, ease: 'power2.out' })
    .from(q('.inv-added'), { autoAlpha: 0, duration: 0.3 }, '-=0.3');
};

export default function Ecosystem() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const mod = modules[active];

  const select = (i: number) => {
    setActive(i);
    setTouched(true);
  };
  const onKey = (e: KeyboardEvent) => {
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: modules.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + modules.length) % modules.length;
    select(i);
    tabs.current[i]?.focus();
  };

  return (
    <>
      <Demo
        className="stage stage--eco"
        label="An explanatory sequence: a sample order moves from the customer site to the outlet POS; the connection drops while the POS prints a receipt and queues the bill; on reconnection the bill syncs; a warehouse stock request then connects to outlet inventory."
        finalStep="From one sample order to outlet inventory."
        build={build}
      >
        <div className="eco-objs" data-hl={touched ? mod.id : undefined}>
          <T x={60} y={-10} />
          <T x={27} y={2} />
          <T x={14} y={15} />
          <T x={24} y={31} />
          <T x={44} y={24} />
          <T x={62} y={31} />
          <T x={68} y={13} />
          <T x={81} y={12} />
          <T x={92} y={26} />
          <T x={82} y={44} />
          <T x={63} y={44} />
          <T x={42} y={49} />
          <T x={18} y={44} />
          <T x={30} y={58} />
          <T x={88} y={58} />

          <div className="obj o-cust" data-m="customer" style={at(5, 7, 19, -3)}>
            <div className="tablet">
              <div className="tablet-top"><span>DROPMYORDER</span><span>SAMPLE OUTLET</span></div>
              <p className="tiny dim">MENU</p>
              {[['Veg thali', '₹180'], ['Masala chai', '₹30'], ['Gulab jamun', '₹30']].map(([n, p]) => (
                <div className="cust-row" key={n}><span>{n}</span><span>{p}</span><b>+</b></div>
              ))}
              <div className="cust-cart"><span>3 ITEMS / ₹240</span><span>PLACE ORDER →</span></div>
            </div>
            <p className="obj-tag">01 / CUSTOMER SITE</p>
          </div>

          <div className="obj o-bad" data-m="pos" style={at(30, 6, 28)}>
            <p className="pull-text">Bad internet? The restaurant still needs to bill.</p>
          </div>

          <div className="obj o-pos" data-m="pos" style={at(30, 13, 27)}>
            <div className="terminal">
              <div className="terminal-top">
                <span>OFFLINE POS</span>
                <span className="net"><b className="net-on">● ONLINE</b><b className="net-off">○ OFFLINE</b></span>
              </div>
              <div className="pos-line pos-head"><span>ORDER S-1042</span><span>TABLE 04</span></div>
              <div className="pos-line"><span>Veg thali</span><span>1</span><span>₹180</span></div>
              <div className="pos-line"><span>Masala chai</span><span>1</span><span>₹30</span></div>
              <div className="pos-line"><span>Gulab jamun</span><span>1</span><span>₹30</span></div>
              <div className="pos-line pos-total"><span>TOTAL</span><span>₹240</span></div>
            </div>
            <div className="stand" />
            <p className="obj-tag">02 / OUTLET POS</p>
          </div>

          <div className="obj o-receipt" data-m="pos" style={at(56, 22, 12.5, 3)}>
            <div className="receipt-wrap">
              <div className="receipt">
                <p><b>SAMPLE RECEIPT</b></p>
                <p className="dim">S-1042 / TABLE 04</p>
                <hr />
                <p className="spread"><span>Veg thali</span><span>180</span></p>
                <p className="spread"><span>Masala chai</span><span>30</span></p>
                <p className="spread"><span>Gulab jamun</span><span>30</span></p>
                <hr />
                <p className="spread"><b>TOTAL</b><b>₹240</b></p>
                <p className="dim">Saved on this device.</p>
              </div>
            </div>
          </div>

          <div className="obj o-sync" data-m="pos" style={at(62, 12, 12)}>
            <div className="sync-line">
              <i className="packet" />
              <span className="queued">1 QUEUED</span>
              <span className="sync-done">SYNCED</span>
            </div>
          </div>

          <div className="obj o-rack" data-m="pos" style={at(76, 6, 10)}>
            <Rack rows={4} />
            <p className="obj-tag">SYNC PATH</p>
          </div>

          <div className="obj o-boxes" data-m="warehouse" style={at(73, 37, 15)}>
            <Boxes />
            <p className="obj-tag">04 / WAREHOUSE</p>
          </div>

          <div className="obj o-req" data-m="warehouse" style={at(56, 41, 15, -2)}>
            <div className="paper-card">
              <p className="tiny dim">STOCK REQUEST / SAMPLE</p>
              <p className="spread"><span>Tomato crate</span><b>× 12</b></p>
              <p className="tiny">WAREHOUSE → OUTLET</p>
            </div>
          </div>

          <div className="obj o-backoffice" data-m="backoffice" style={at(7, 38, 21, 1)}>
            <div className="paper-card">
              <p className="tiny dim">OUTLET BACK OFFICE / SAMPLE DAY</p>
              <svg viewBox="0 0 200 60" className="line chart"><path d="M0 50 C30 44 40 22 70 30 C100 38 110 14 140 18 C160 20 180 8 200 6" /><path d="M0 59 H200" /></svg>
              <p className="tiny spread"><span>MENUS</span><span>ORDERS</span><span>REPORTS</span></p>
            </div>
            <p className="obj-tag">03 / BACK OFFICE</p>
          </div>

          <div className="obj o-inv" data-m="backoffice" style={at(32, 45, 20)}>
            <div className="paper-card">
              <p className="tiny dim">OUTLET INVENTORY / SAMPLE</p>
              <p className="spread"><span>Tomato crate</span><span>4 <span className="inv-added">→ <b>16</b></span></span></p>
              <div className="inv-bar"><i className="inv-fill" /></div>
            </div>
          </div>
        </div>
      </Demo>

      <div className="modules z">
        <div role="tablist" aria-label="DropMyOrder modules" aria-orientation="vertical" className="module-tabs" onKeyDown={onKey}>
          {modules.map((m, i) => (
            <button
              key={m.id}
              ref={el => { tabs.current[i] = el; }}
              role="tab"
              type="button"
              id={`tab-${m.id}`}
              aria-selected={i === active}
              aria-controls="module-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
            >
              <span>0{i + 1}</span>
              <span><b>{m.name}</b><small>{m.role}</small></span>
            </button>
          ))}
        </div>
        <div role="tabpanel" id="module-panel" aria-labelledby={`tab-${mod.id}`} className="module-panel" tabIndex={0}>
          <p className="module-role">{mod.role}</p>
          <p className="module-text">{mod.text}</p>
          <ul className="chips">{mod.stack.map(s => <li key={s}>{s}</li>)}</ul>
          {mod.link && <a className="link" href={mod.link.href} target="_blank" rel="noreferrer">{mod.link.label} <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </>
  );
}
