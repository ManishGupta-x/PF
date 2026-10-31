// End-to-end checks. Needs Chrome and a running server: npm run build && npm start -- -p 3100, then npm run check.
import { chromium } from 'playwright-core';
const BASE = 'http://localhost:3100';
const b = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const ok = (name, pass, extra = '') => { results.push(pass); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${extra ? '  [' + extra + ']' : ''}`); };
const watch = (p, sink) => {
  p.on('console', m => { if (m.type() === 'error') sink.push(m.text().slice(0, 200)); });
  p.on('pageerror', e => sink.push('pageerror ' + e.message.slice(0, 200)));
};

// Routes, redirects and metadata
for (const path of ['/', '/work/dropmyorder-ecosystem', '/work/dmo-saas', '/work/back2csgo', '/work/jarvis', '/GamingCareer', '/robots.txt', '/sitemap.xml']) {
  const r = await fetch(BASE + path);
  ok(`route ${path}`, r.status === 200, String(r.status));
}
ok('unknown case study is 404', (await fetch(BASE + '/work/nope')).status === 404);
for (const [from, to] of [['/Work', '/#work'], ['/Skills', '/#capabilities'], ['/SmallProjects', '/#work']]) {
  const r = await fetch(BASE + from, { redirect: 'manual' });
  ok(`redirect ${from}`, r.status === 308 && r.headers.get('location') === to, `${r.status} ${r.headers.get('location')}`);
}
const html = await (await fetch(BASE + '/')).text();
ok('hero headline is server-rendered', html.includes('THAT CONNECT.'));
ok('project copy is server-rendered', html.includes('Bad internet? The restaurant still needs to bill.') && html.includes('5,000+ hours'));
ok('old 4,000+ figure is gone', !/4,?000\+|4k\+/i.test(html) && !/4,?000\+|4k\+/i.test(await (await fetch(BASE + '/GamingCareer')).text()));
ok('no local Windows path leaks', !/C:\\|Downloads/.test(html));
ok('og tags present', html.includes('property="og:image"') && html.includes('twitter:card'));

// Desktop, full motion
{
  const errs = [];
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  watch(p, errs);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForFunction(() => { const o = document.querySelector('.thread--over path'); return o && parseFloat(getComputedStyle(o).strokeDashoffset) < 1 && parseFloat(getComputedStyle(document.querySelector('[data-hero-line]')).opacity) === 1; }, null, { timeout: 10000 }).catch(() => {});
  await p.waitForTimeout(1500);
  const heroOpacity = await p.$eval('[data-hero-line]', e => getComputedStyle(e).opacity);
  ok('hero lines finish visible', heroOpacity === '1', heroOpacity);
  ok('thread rendered', (await p.$$eval('.thread path', e => e.length)) > 25);
  ok('thread geometry is finite', await p.$$eval('.thread path', e => e.every(x => !/NaN|Infinity/.test(x.getAttribute('d')))));
  const off0 = await p.$$eval('.thread path', e => e.map(x => parseFloat(getComputedStyle(x).strokeDashoffset)));
  const overPaths = await p.$$eval('.thread--over path', e => e.map(x => parseFloat(getComputedStyle(x).strokeDashoffset)));
  const underEnd = await p.$$eval('.thread:not(.thread--over) path', e => parseFloat(getComputedStyle(e[e.length - 1]).strokeDashoffset));
  ok('hero segments drawn, later segments still hidden', off0[0] < 1 && off0[1] < 1 && overPaths[0] < 1 && underEnd > 1);

  // Every demo plays to its final state, then offers replay
  for (const sel of ['.stage--eco', '.stage--saas', '.stage--back2', '.stage--jarvis', '.board-demo']) {
    await p.$eval(sel, e => window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }));
    const done = await p.waitForFunction(s => document.querySelector(s + ' .demo-btn')?.textContent === 'Replay', sel, { timeout: 30000 }).then(() => true, () => false);
    const hidden = await p.$$eval(`${sel} .demo-art *`, els => els.filter(e => !e.closest('.net-off,.queued') && getComputedStyle(e).visibility === 'hidden').length);
    ok(`${sel} completes and everything is visible`, done && hidden === 0, `hidden=${hidden}`);
  }

  // Pause and replay control
  await p.$eval('.stage--back2', e => window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }));
  await p.click('.stage--back2 .demo-btn');
  ok('replay switches to pause', (await p.textContent('.stage--back2 .demo-btn')) === 'Pause');
  await p.click('.stage--back2 .demo-btn');
  ok('pause switches to resume', (await p.textContent('.stage--back2 .demo-btn')) === 'Resume');
  await p.click('.stage--back2 .demo-btn');

  // Module selector: mouse and keyboard
  await p.$eval('.module-tabs', e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await p.click('#tab-backoffice');
  ok('click selects a module', (await p.textContent('.module-role')) === 'Outlet back office');
  await p.keyboard.press('ArrowDown');
  const focusId = await p.evaluate(() => document.activeElement?.id);
  ok('arrow key moves module selection and focus', focusId === 'tab-warehouse' && (await p.textContent('.module-role')) === 'Warehouse and superadmin', focusId);
  ok('selection highlights the matching objects', (await p.$eval('[data-hl]', e => e.dataset.hl)) === 'warehouse');

  // Contact: email stays direct; endpoint works by keyboard and by drag, drag springs back
  ok('email is a direct mailto', (await p.getAttribute('.contact-mail a', 'href')) === 'mailto:manishgupta220402@gmail.com');
  await p.$eval('.loop-handle', e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await p.waitForTimeout(600);
  const dOf = () => p.$eval('.loop-svg path', e => e.getAttribute('d'));
  const d0 = await dOf();
  await p.focus('.loop-handle');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(1000);
  ok('keyboard straightens the thread', (await p.getAttribute('.loop-handle', 'aria-pressed')) === 'true' && (await dOf()) !== d0);
  await p.keyboard.press('Enter');
  const settled = () => p.waitForFunction(d => document.querySelector('.loop-svg path').getAttribute('d') === d, d0, { timeout: 8000 }).then(() => true, () => false);
  ok('keyboard returns the loop', (await settled()) && (await p.getAttribute('.loop-handle', 'aria-pressed')) === 'false');
  const box = await (await p.$('.loop-handle')).boundingBox();
  await p.mouse.move(box.x + 22, box.y + 22);
  await p.mouse.down();
  await p.mouse.move(box.x + 22, box.y + 150, { steps: 6 });
  const dragged = await dOf();
  await p.mouse.up();
  ok('drag moves the thread and springs back', dragged !== d0 && (await settled()));
  ok('tail of the thread ends with the head hidden', (await p.$eval('.thread-head', e => e.style.display)) === 'none');

  // Client navigation and cleanup
  const threadCount = await p.$$eval('.thread path', e => e.length);
  await p.click('.chapter--jarvis .cta', { force: true });
  await p.waitForURL('**/work/jarvis');
  await p.waitForTimeout(1200);
  await p.click('.nav-logo');
  await p.waitForURL(BASE + '/');
  await p.waitForTimeout(1500);
  ok('thread rebuilds cleanly after client navigation', (await p.$$eval('.thread path', e => e.length)) === threadCount);
  ok('desktop console clean', errs.length === 0, errs.join(' | '));
  await p.context().close();
}

// Keyboard order and focus visibility
{
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(800);
  await p.keyboard.press('Tab');
  ok('first tab stop is the skip link', (await p.evaluate(() => document.activeElement?.textContent)) === 'Skip to content');
  const outline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  ok('focus indicator is drawn', outline !== 'none', outline);
  const headings = await p.$$eval('h1', e => e.length);
  ok('exactly one h1', headings === 1);
  ok('images have alt text', await p.$$eval('img', e => e.every(i => i.hasAttribute('alt'))));
  await p.context().close();
}

// Mobile
for (const width of [320, 390, 760]) {
  const errs = [];
  const p = await (await b.newContext({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true })).newPage();
  watch(p, errs);
  for (const path of ['/', '/work/dropmyorder-ecosystem', '/GamingCareer']) {
    await p.goto(BASE + path, { waitUntil: 'load' });
    await p.waitForTimeout(1200);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(`${width}px ${path} no horizontal overflow`, over <= 0, String(over));
    if (path === '/') {
      const clipped = await p.$$eval('.line-block', els => els.filter(e => { const r = document.createRange(); r.selectNodeContents(e); return r.getBoundingClientRect().right > document.documentElement.clientWidth; }).map(e => e.textContent));
      ok(`${width}px headlines fit their deliberate lines`, clipped.length === 0, clipped.join(', '));
      ok(`${width}px hero keeps three lines`, (await p.$$eval('.display--hero .line-block', e => new Set(e.map(x => Math.round(x.getBoundingClientRect().height))).size)) === 1);
      await p.tap('.nav-menu');
      ok(`${width}px menu dialog opens`, await p.$eval('.menu', e => e.open));
      await p.keyboard.press('Escape');
      ok(`${width}px Escape closes the menu`, !(await p.$eval('.menu', e => e.open)));
    }
  }
  ok(`${width}px console clean`, errs.length === 0, errs.join(' | '));
  await p.context().close();
}

// Reduced motion
{
  const errs = [];
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  watch(p, errs);
  const gsapRequests = [];
  p.on('request', r => { if (/gsap/i.test(r.url())) gsapRequests.push(r.url()); });
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  ok('reduced: hero visible immediately', (await p.$eval('[data-hero-line]', e => getComputedStyle(e).opacity)) === '1');
  ok('reduced: complete static thread', await p.$$eval('.thread path', e => e.length > 25 && e.every(x => getComputedStyle(x).strokeDasharray === 'none')));
  ok('reduced: nodes all reached', await p.$$eval('.node-dot', e => e.every(x => x.classList.contains('on'))));
  ok('reduced: no replay controls or dragging', (await p.$$('.demo-btn')).length === 0 && (await p.$$('.loop-handle')).length === 0);
  const pawn = await p.$eval('.piece-bpd', e => e.getAttribute('transform'));
  ok('reduced: board shows the final position', pawn === 'translate(300 300)', pawn);
  ok('reduced: console clean', errs.length === 0, errs.join(' | '));
  await p.context().close();
}

// Gaming Career
{
  const errs = [];
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  watch(p, errs);
  await p.goto(BASE + '/GamingCareer', { waitUntil: 'load' });
  await p.waitForTimeout(800);
  ok('no video iframe before a click', (await p.$$('iframe')).length === 0);
  ok('5,000+ hours shown as self-reported', (await p.textContent('.g-facts')).includes('5,000+ hours') && (await p.textContent('.g-facts')).includes('Self-reported'));
  await p.click('.video-frame button');
  await p.waitForSelector('iframe');
  ok('click loads one nocookie embed', (await p.$$eval('iframe', e => e.length === 1 && e[0].src.includes('youtube-nocookie.com'))));
  await p.focus('#g-tab-counter-strike');
  await p.keyboard.press('ArrowRight');
  ok('tabs move by keyboard', (await p.getAttribute('#g-tab-chess', 'aria-selected')) === 'true');
  const caption = await p.$eval('#g-panel-chess', e => e.querySelector('caption')?.textContent ?? 'omitted');
  ok('chess data is timestamped or omitted', /fetched \d+ \w+ \d{4}/.test(caption) || caption === 'omitted', caption);
  await p.context().close();
}

await b.close();
const failed = results.filter(x => !x).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
