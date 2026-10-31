'use client';
import Demo, { at, T, type Build } from '@/components/Demo';
import { Cylinder, Rack } from './art';

const PACKAGES = ['money', 'tax', 'pricing', 'pos-core', 'sync-protocol', 'ledger', 'domain', 'print'];

const build: Build = (tl, q, step) => {
  tl.call(step, ['A sample bill opens on the counter.'])
    .from(q('.o-bill'), { autoAlpha: 0, y: 24, duration: 0.5, ease: 'power2.out' })
    .from(q('.bill-line'), { autoAlpha: 0, x: -8, stagger: 0.14, duration: 0.25 })
    .call(step, ['The shared engine prices it: subtotal, then GST.'], '+=0.2')
    .from(q('.o-engine'), { autoAlpha: 0, scale: 0.92, duration: 0.5, ease: 'power2.out' })
    .from(q('.engine-pkg'), { autoAlpha: 0, stagger: 0.05, duration: 0.2 }, '-=0.2')
    .from(q('.bill-calc'), { autoAlpha: 0, stagger: 0.2, duration: 0.25 })
    .call(step, ['It is stored locally first, in SQLite in the browser.'], '+=0.3')
    .from(q('.o-local'), { autoAlpha: 0, y: 16, duration: 0.4 })
    .from(q('.local-row'), { autoAlpha: 0, duration: 0.25 })
    .call(step, ['Then it syncs. The API checks it with the same engine.'], '+=0.5')
    .from(q('.o-api'), { autoAlpha: 0, y: 16, duration: 0.4 })
    .from(q('.saas-packet'), { left: '0%', duration: 1, ease: 'power1.inOut' })
    .from(q('.api-ok'), { autoAlpha: 0, duration: 0.25 })
    .call(step, ['The back office and the rider both see the update.'], '+=0.4')
    .from(q('.o-web'), { autoAlpha: 0, y: 16, duration: 0.4 })
    .from(q('.web-new'), { autoAlpha: 0, x: -10, duration: 0.3 })
    .from(q('.o-rider'), { autoAlpha: 0, y: 16, duration: 0.4 }, '-=0.1')
    .from(q('.rider-step'), { autoAlpha: 0, stagger: 0.25, duration: 0.25 });
};

export default function Saas() {
  return (
    <Demo
      className="stage stage--saas"
      label="An explanatory sequence: a sample bill on the counter is priced by the shared engine, stored in SQLite in the browser, synced to the API which checks it with the same engine, and then appears in the back office and rider app."
      finalStep="One sample bill, one engine, every surface."
      build={build}
    >
      <T x={62} y={-9} />
      <T x={15} y={12} />
      <T x={13} y={31} />
      <T x={30} y={30} />
      <T x={45} y={19} />
      <T x={64} y={18} />
      <T x={78} y={18} />
      <T x={90} y={34} />
      <T x={76} y={46} />
      <T x={54} y={43} />
      <T x={30} y={49} />
      <T x={8} y={50} />

      <div className="obj o-bill" style={at(4, 4, 22, -2)}>
        <div className="paper-card paper-card--tall">
          <p className="tiny dim spread"><span>DMO-POS / INSTALLED WEB APP</span><span>SAMPLE</span></p>
          <p className="spread bill-line"><span>Paneer roll × 2</span><span>₹300</span></p>
          <p className="spread bill-line"><span>Lassi × 2</span><span>₹100</span></p>
          <hr />
          <p className="spread bill-calc"><span>Subtotal</span><span>₹400.00</span></p>
          <p className="spread bill-calc"><span>CGST 2.5%</span><span>₹10.00</span></p>
          <p className="spread bill-calc"><span>SGST 2.5%</span><span>₹10.00</span></p>
          <p className="spread bill-calc"><b>TOTAL</b><b>₹420.00</b></p>
        </div>
      </div>

      <div className="obj o-engine" style={at(32, 6, 26)}>
        <div className="engine">
          <svg viewBox="0 0 300 300" className="line engine-rings">
            <circle cx="150" cy="150" r="146" />
            <circle cx="150" cy="150" r="96" strokeDasharray="2 6" />
            <path d="M150 4 V54 M150 246 V296 M4 150 H54 M246 150 H296" />
          </svg>
          <p className="engine-name">dmo-core<small>THE SHARED ENGINE</small></p>
          {PACKAGES.map((p, i) => {
            const a = (i / PACKAGES.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <span
                key={p}
                className="engine-pkg"
                style={{ left: `${(50 + 40 * Math.cos(a)).toFixed(2)}%`, top: `${(50 + 40 * Math.sin(a)).toFixed(2)}%` }}
              >
                {p}
              </span>
            );
          })}
        </div>
      </div>

      <div className="obj o-local" style={at(9, 27, 15)}>
        <div className="with-art">
          <Cylinder />
          <div>
            <p className="tiny">SQLITE WASM</p>
            <p className="tiny dim">IN A WEB WORKER</p>
            <p className="tiny local-row"><b>BILL S-204 SAVED</b></p>
          </div>
        </div>
      </div>

      <div className="obj o-link" style={at(58, 18, 12)}>
        <div className="sync-line"><i className="packet saas-packet" /></div>
      </div>

      <div className="obj o-api" style={at(71, 6, 15)}>
        <div className="with-art with-art--col">
          <Rack rows={3} />
          <p className="tiny">DMO-API / FASTIFY</p>
          <Cylinder />
          <p className="tiny">POSTGRESQL</p>
          <p className="tiny api-ok"><b>✓ SAME ENGINE, SAME TOTAL</b></p>
        </div>
      </div>

      <div className="obj o-web" style={at(42, 38, 24, 1)}>
        <div className="paper-card">
          <p className="tiny dim spread"><span>DMO-WEB / BACK OFFICE</span><span>SAMPLE</span></p>
          <p className="spread dim"><span>S-203</span><span>Dine in</span><span>₹265</span></p>
          <p className="spread web-new"><b>S-204</b><span>Delivery</span><b>₹420</b></p>
        </div>
      </div>

      <div className="obj o-rider" style={at(70, 38, 13, -3)}>
        <div className="phone">
          <p className="tiny dim">DMO-RIDER</p>
          <p className="tiny"><b>S-204</b> ASSIGNED</p>
          <p className="tiny rider-step">✓ PICKED UP</p>
          <p className="tiny rider-step">✓ DELIVERED</p>
          <p className="tiny rider-step dim">PAID / UPI</p>
        </div>
      </div>
    </Demo>
  );
}
