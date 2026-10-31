'use client';
import Demo, { at, T, type Build } from '@/components/Demo';

const build: Build = (tl, q, step) => {
  tl.call(step, ['A client reports an equipment issue.'])
    .from(q('.sh-request'), { autoAlpha: 0, y: 20, duration: 0.5 })
    .call(step, ['Dispatch schedules the job and assigns a technician.'], '+=0.5')
    .from(q('.sh-dispatch'), { autoAlpha: 0, y: 20, duration: 0.5 })
    .from(q('.sh-assigned'), { autoAlpha: 0, x: -10, duration: 0.35 })
    .call(step, ['The technician follows the job through diagnosis and repair.'], '+=0.5')
    .from(q('.sh-technician'), { autoAlpha: 0, y: 20, duration: 0.5 })
    .from(q('.sh-jobstep'), { autoAlpha: 0, stagger: 0.3, duration: 0.3 })
    .call(step, ['Service history is recorded. Training supports the next job.'], '+=0.4')
    .from(q('.sh-report'), { autoAlpha: 0, y: 20, duration: 0.45 })
    .from(q('.sh-training'), { autoAlpha: 0, y: 16, duration: 0.45 }, '<0.15');
};

const surfaces = [
  ['01', 'Discover', 'A public website for services, equipment coverage, and enquiries.'],
  ['02', 'Coordinate', 'An operations console for dispatch, equipment, parts, and contracts.'],
  ['03', 'Request', 'A client portal for service requests, equipment records, and updates.'],
  ['04', 'Resolve', 'A technician app for assigned work, diagnostics, and sign-off.'],
  ['05', 'Learn', 'Technician lessons, assessments, and a dedicated trainer workspace.'],
];

export default function ServiceHub() {
  return (
    <>
      <Demo className="stage stage--servicehub" label="An illustrated maintenance workflow: a client reports an equipment issue, dispatch assigns a technician, the technician completes job steps, and the service record is updated alongside technician training." finalStep="Request → Dispatch → Field work → Service record." build={build}>
        <T x={88.7} y={-9} /><T x={65} y={-6} /><T x={12} y={7} /><T x={32} y={7} /><T x={48} y={15} /><T x={65} y={12} /><T x={85} y={21} /><T x={68} y={34} /><T x={88.7} y={42} />
        <div className="obj sh-request" style={at(4, 5, 20, -2)}>
          <div className="paper-card">
            <p className="tiny dim">CLIENT PORTAL / SAMPLE REQUEST</p>
            <p><b>Cooling unit needs attention</b></p>
            <p className="tiny">Kitchen / Equipment SH-104</p>
            <p className="tiny sh-state">REQUEST RECEIVED</p>
          </div>
          <p className="obj-tag">01 / REQUEST</p>
        </div>
        <div className="obj sh-dispatch" style={at(29, 3, 29, 1)}>
          <div className="paper-card">
            <p className="tiny dim">OPERATIONS / DISPATCH</p>
            <p className="spread"><b>Service visit</b><span>SH-104</span></p>
            <hr />
            <p className="tiny">Review issue → Schedule visit → Assign technician</p>
            <p className="sh-assigned tiny sh-state">TECHNICIAN ASSIGNED</p>
          </div>
          <p className="obj-tag">02 / COORDINATE</p>
        </div>
        <div className="obj sh-technician" style={at(65, 6, 17, -2)}>
          <div className="phone">
            <p className="tiny dim">TECHNICIAN / JOB SH-104</p>
            <svg viewBox="0 0 80 80" className="line sh-tool" aria-hidden="true"><path d="M49 13a18 18 0 0 0-21 22L8 55a9 9 0 0 0 13 13l20-20a18 18 0 0 0 22-21L51 39 40 28Z" /><circle cx="16" cy="61" r="2" /></svg>
            <div className="sh-status tiny"><p className="sh-jobstep">✓ Check equipment</p><p className="sh-jobstep">✓ Record diagnosis</p><p className="sh-jobstep">✓ Complete sign-off</p></div>
          </div>
          <p className="obj-tag">03 / FIELD WORK</p>
        </div>
        <div className="obj sh-report" style={at(18, 25, 27, -1)}>
          <div className="paper-card"><p className="tiny dim">EQUIPMENT / SERVICE HISTORY</p><p><b>Service visit recorded</b></p><p className="tiny">Diagnosis · Parts · Work completed</p><p className="tiny sh-state">CLIENT UPDATE READY</p></div>
          <p className="obj-tag">04 / RECORD</p>
        </div>
        <div className="obj sh-training" style={at(51, 29, 25, 2)}>
          <div className="paper-card"><p className="tiny dim">LEARNING / TECHNICIAN DEVELOPMENT</p><p><b>Refrigeration basics</b></p><p className="tiny">Lesson → Assessment → Skill record</p></div>
          <p className="obj-tag">05 / LEARN</p>
        </div>
      </Demo>
      <div className="sh-surfaces z" role="group" aria-label="Five connected applications">
        {surfaces.map(([number, title, description]) => <div key={number}><span className="eyebrow">{number}</span><h4>{title}</h4><p>{description}</p></div>)}
      </div>
    </>
  );
}
