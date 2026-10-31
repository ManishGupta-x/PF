// End-to-end checks. Needs Chrome and a running server: npm run build && npm start -- -p 3100, then npm run check.
import { readFileSync } from 'node:fs';
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
for (const path of ['/', '/expertise', '/work/dropmyorder-ecosystem', '/work/dmo-saas', '/work/back2csgo', '/work/jarvis', '/work/service-hub', '/GamingCareer', '/robots.txt', '/sitemap.xml']) {
  const r = await fetch(BASE + path);
  ok(`route ${path}`, r.status === 200, String(r.status));
}
ok('unknown case study is 404', (await fetch(BASE + '/work/nope')).status === 404);
for (const [from, to] of [['/Work', '/#work'], ['/Skills', '/expertise'], ['/SmallProjects', '/#work']]) {
  const r = await fetch(BASE + from, { redirect: 'manual' });
  ok(`redirect ${from}`, r.status === 308 && r.headers.get('location') === to, `${r.status} ${r.headers.get('location')}`);
}
const html = await (await fetch(BASE + '/')).text();
ok('hero headline is server-rendered', html.includes('INTERACTING WITH.'));
ok('project copy is server-rendered', html.includes('Bad internet? The restaurant still needs to bill.') && html.includes('5,000+ hours'));
ok('old 4,000+ figure is gone', !/4,?000\+|4k\+/i.test(html) && !/4,?000\+|4k\+/i.test(await (await fetch(BASE + '/GamingCareer')).text()));
ok('no local Windows path leaks', !/C:\\|Downloads/.test(html));
ok('og tags present', html.includes('property="og:image"') && html.includes('twitter:card'));
ok('home links to the expertise page', html.includes('href="/expertise"'));
const expertise = await (await fetch(BASE + '/expertise')).text();
ok('expertise tools are server-rendered with inline icons', ['Astro', 'Next.js', 'PostgreSQL', 'SQL'].every(t => expertise.includes(`<h4>${t}</h4>`)) && (expertise.match(/<li class="xp-tool"><svg/g) ?? []).length >= 35);
const dmo = await (await fetch(BASE + '/work/dropmyorder-ecosystem')).text();
const dmoStats = JSON.parse(readFileSync(new URL('../lib/dmo-stats.json', import.meta.url), 'utf8'));
ok('DropMyOrder results are server-rendered from the stats file', dmo.includes(`₹${dmoStats.salesCrore} Cr`) && dmo.includes('Grand Hotel Shimla') && dmo.includes('Real numbers.'));
ok('stats never carry a backend host or customer data', !/dropmyorder\.com|customer_|phone/i.test(JSON.stringify(dmoStats)));
ok('other case studies have no results section', !(await (await fetch(BASE + '/work/jarvis')).text()).includes('results-title'));
ok('tool usage links to its case study', /<h4>Astro<\/h4><p class="xp-used"><a href="\/work\/dmo-saas"/.test(expertise));

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

  // The navbar is solid and takes the colour of the section beneath it
  for (const [sel, background, tone] of [['#capabilities', 'rgb(5, 5, 5)', 'dark'], ['#about', 'rgb(241, 238, 230)', 'ivory']]) {
    await p.$eval(sel, e => window.scrollTo({ top: e.getBoundingClientRect().top + scrollY + 200, behavior: 'instant' }));
    await p.waitForTimeout(500);
    const nav = await p.$eval('.nav', e => ({ tone: e.dataset.tone, background: getComputedStyle(e).backgroundColor, blend: getComputedStyle(e).mixBlendMode }));
    ok(`navbar matches the ${tone} section beneath it`, nav.tone === tone && nav.background === background && nav.blend === 'normal', JSON.stringify(nav));
  }
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

  // A fast scroller reaches the end of a stage with its contents and the thread already there
  {
    const fast = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await fast.goto(BASE, { waitUntil: 'load' });
    await fast.waitForTimeout(1500);
    const bottom = await fast.$eval('.stage--eco', e => e.getBoundingClientRect().bottom + scrollY - innerHeight);
    await fast.mouse.move(700, 450);
    for (let y = await fast.evaluate(() => scrollY); y < bottom; y += 400) {
      await fast.evaluate(top => scrollTo({ top, behavior: 'instant' }), y);
      await fast.waitForTimeout(50);
    }
    await fast.evaluate(top => scrollTo({ top, behavior: 'instant' }), bottom);
    await fast.waitForTimeout(800);
    const seen = await fast.$$eval('.o-delivery, .del-step, .o-staff, .staff-row, .staff-flag', els => els.every(e => getComputedStyle(e).visibility === 'visible' && parseFloat(getComputedStyle(e).opacity) > 0.5));
    ok('a stage is complete by the time a fast scroller reaches its end', seen);
    const tip = await fast.evaluate(() => {
      const moved = new DOMMatrix(getComputedStyle(document.querySelector('.thread-head')).transform).f || Number(document.querySelector('.thread-head').getAttribute('transform').match(/ ([\d.-]+)\)/)[1]);
      return { y: moved, row: document.querySelector('.o-delivery').getBoundingClientRect().top - document.getElementById('main').getBoundingClientRect().top };
    });
    ok('the thread keeps up with a fast scroller', tip.y > tip.row - 100, `tip ${Math.round(tip.y)} / phones ${Math.round(tip.row)}`);
    await fast.context().close();

    // Pause holds, even while the sequence is catching up with the page
    const held = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await held.goto(BASE, { waitUntil: 'load' });
    await held.waitForTimeout(1500);
    await held.$eval('.stage--eco', e => window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - 500, behavior: 'instant' }));
    await held.waitForTimeout(300);
    await held.$eval('.stage--eco', e => window.scrollTo({ top: e.getBoundingClientRect().top + scrollY + 200, behavior: 'instant' }));
    await held.waitForTimeout(60);
    await held.$eval('.stage--eco .demo-btn', e => e.click());
    await held.waitForTimeout(100);
    const pausedAt = await held.textContent('.stage--eco .demo-step');
    await held.$eval('.stage--eco', e => window.scrollTo({ top: e.getBoundingClientRect().bottom + scrollY - innerHeight, behavior: 'instant' }));
    await held.waitForTimeout(1200);
    ok('pause holds while scrolling', (await held.textContent('.stage--eco .demo-btn')) === 'Resume' && (await held.textContent('.stage--eco .demo-step')) === pausedAt);
    await held.context().close();
  }

  // Every demo plays to its final state, then offers replay
  for (const sel of ['.stage--eco', '.stage--saas', '.stage--back2', '.stage--jarvis', '.stage--servicehub', '.board-demo']) {
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
  ok('arrow key moves module selection and focus', focusId === 'tab-warehouse' && (await p.textContent('.module-role')) === 'Warehouse & central administration', focusId);
  ok('selection highlights the matching objects', (await p.$eval('[data-hl]', e => e.dataset.hl)) === 'warehouse');
  for (const [id, role] of [['delivery', 'Delivery riders'], ['workforce', 'Outlet & warehouse staff']]) {
    await p.click(`#tab-${id}`);
    ok(`${id} module has its own objects on the stage`, (await p.textContent('.module-role')) === role && (await p.$(`[data-hl="${id}"] [data-m="${id}"]`)) !== null);
  }

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

// Images shimmer while loading, stop once loaded, and never show a blurred placeholder
{
  ok('no blurred image placeholders', !/feGaussianBlur/.test(html + dmo));
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const held = [];
  await p.route('**/_next/image**', route => { held.push(route); });
  await p.goto(BASE, { waitUntil: 'domcontentloaded' });
  const portrait = p.locator('.about-portrait img');
  await portrait.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  ok('an image still loading shimmers', (await portrait.evaluate(e => getComputedStyle(e).animationName)) === 'shimmer');
  await p.unroute('**/_next/image**');
  await Promise.all(held.map(route => route.continue().catch(() => {})));
  await p.waitForFunction(() => document.querySelector('.about-portrait img')?.dataset.loaded !== undefined, null, { timeout: 15000 }).catch(() => {});
  ok('a loaded image stops shimmering', (await portrait.evaluate(e => getComputedStyle(e).animationName)) === 'none');
  const calm = await (await b.newContext({ reducedMotion: 'reduce' })).newPage();
  await calm.route('**/_next/image**', () => {});
  await calm.goto(BASE, { waitUntil: 'domcontentloaded' });
  await calm.waitForTimeout(800);
  ok('reduced motion keeps images still', (await calm.locator('img').first().evaluate(e => getComputedStyle(e).animationName)) === 'none');
  await calm.context().close();
  await p.context().close();
}

// The thread stays out of reading text, and phones don't download full-size captures
for (const width of [1440, 390]) {
  for (const path of ['/expertise', '/work/dropmyorder-ecosystem', '/work/dmo-saas', '/work/back2csgo', '/work/jarvis', '/work/service-hub']) {
    const p = await (await b.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })).newPage();
    let heaviest = 0;
    p.on('response', async r => { if (r.request().resourceType() === 'image') heaviest = Math.max(heaviest, (await r.body().catch(() => Buffer.alloc(0))).length); });
    await p.goto(BASE + path, { waitUntil: 'load' });
    await p.waitForTimeout(1200);
    const thread = await p.evaluate(() => {
      const lines = [...document.querySelectorAll('.thread path')].filter(l => l.getTotalLength() > 0);
      const boxes = [];
      const text = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (text.nextNode()) {
        if (!text.currentNode.textContent.trim() || text.currentNode.parentElement.closest('.sr,.skip,nav,[aria-hidden="true"],.demo-art')) continue;
        const range = document.createRange();
        range.selectNodeContents(text.currentNode);
        for (const r of range.getClientRects()) if (r.width > 4) boxes.push({ r, label: text.currentNode.textContent.trim().slice(0, 30) });
      }
      const crossed = new Set();
      for (const line of lines) {
        const m = line.getScreenCTM();
        for (let d = 0; d < line.getTotalLength(); d += 6) {
          const { x, y } = line.getPointAtLength(d).matrixTransform(m);
          for (const { r, label } of boxes) if (x > r.left && x < r.right && y > r.top && y < r.bottom) crossed.add(label);
        }
      }
      return { drawn: lines.length, crossed: [...crossed] };
    });
    ok(`${width}px ${path} draws the thread`, thread.drawn > 0);
    ok(`${width}px ${path} thread clears the text`, thread.crossed.length === 0, thread.crossed.slice(0, 3).join(' | '));
    if (width === 390) {
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 90)); } });
      await p.waitForTimeout(1500);
      ok(`390px ${path} has no image over 500 KB`, heaviest < 500000, `${Math.round(heaviest / 1024)} KB`);
    }
    await p.context().close();
  }
}

// Keyboard order and focus visibility
{
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const backendCalls = [];
  p.on('request', r => { if (/dropmyorder\.com/i.test(r.url())) backendCalls.push(r.url()); });
  await p.goto(BASE + '/work/dropmyorder-ecosystem', { waitUntil: 'load' });
  await p.waitForTimeout(1000);
  ok('the page calls no DropMyOrder server', backendCalls.length === 0, backendCalls.join(' | '));
  const quiet = p.locator('.viz-cols li:not(.is-labelled)').first();
  await quiet.focus();
  await p.waitForTimeout(300);
  ok('keyboard focus reveals a chart value', (await quiet.locator('.viz-val').evaluate(e => getComputedStyle(e).opacity)) === '1');
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
  for (const path of ['/', '/expertise', '/work/dropmyorder-ecosystem', '/work/service-hub', '/GamingCareer']) {
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
  ok('Counter-Strike playtime and historical rank are clearly scoped', (await p.textContent('.g-facts')).includes('5,000+ hours') && (await p.textContent('.g-facts')).includes('CS:GO rank history'));
  await p.click('.video-frame button');
  await p.waitForSelector('iframe');
  ok('click loads one nocookie embed', (await p.$$eval('iframe', e => e.length === 1 && e[0].src.includes('youtube-nocookie.com'))));
  await p.focus('#g-tab-counter-strike');
  await p.keyboard.press('ArrowRight');
  ok('tabs move by keyboard', (await p.getAttribute('#g-tab-chess', 'aria-selected')) === 'true');
  const caption = await p.$eval('#g-panel-chess', e => e.querySelector('caption')?.textContent ?? 'omitted');
  ok('chess data is timestamped or omitted', /Updated \d+ \w+ \d{4}/.test(caption) || caption === 'omitted', caption);
  await p.context().close();
}

await b.close();
const failed = results.filter(x => !x).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
