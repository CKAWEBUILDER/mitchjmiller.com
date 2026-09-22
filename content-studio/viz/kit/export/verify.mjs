#!/usr/bin/env node
/**
 * Render checks for a living artifact. Run this before publishing.
 *
 *   node export/verify.mjs
 *   node export/verify.mjs --template ../<slug>/index.html
 *
 * --out defaults to <artifact folder>/exports/verify, so verifying another
 * artifact never overwrites the kit's own exports.
 *
 * Checks, at 1360×900 and 390×844:
 *   - no horizontal overflow
 *   - no console or page errors
 *   - nothing left the machine (the artifact must be self-contained)
 *   - exactly one h1, a live region present, every number's source id resolves
 *   - prefers-reduced-motion: no rAF loop running, the settled state is shown
 *   - every dimension declared in the artifact's own #viz-data drives a real
 *     control and moves at least one rendered number (no hardcoded option ids)
 * Writes a screenshot per viewport and a JSON report.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { launch, openViz, vizUrl, now, ms, defaultOutDir, artifactName } from './lib/browser.mjs';

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
const template = resolve(process.cwd(), arg('template', 'template.html'));
// Exports follow the artifact, so verifying ../<slug>/index.html writes
// ../<slug>/exports/verify/ instead of overwriting the kit's own exports.
const outDir = arg('out') ? resolve(process.cwd(), arg('out')) : defaultOutDir(template, 'verify');
const name = arg('name', artifactName(template));
const url = vizUrl(template, {});

const results = [];
const record = (scope, check, pass, detail = '') => {
  results.push({ scope, check, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${scope} — ${check}${detail ? ` (${detail})` : ''}`);
};

/**
 * Read the artifact's own dimensions out of its embedded data, then drive each
 * one through its real control and check that a rendered number moves.
 *
 * Nothing here knows the sample's option ids. Artifacts fork this template and
 * rename things — one calls its second dimension `metric`, another renames
 * `metrics` to `measures` — so the probe works from `DATA.dimensions` and from
 * the DOM (`#sel-<dimension>`, or any <select> offering those option values),
 * falling back to VIZ.setState only if there is no control. That is also the
 * honest test: it exercises what a reader actually clicks.
 */
const readDimensions = page => page.evaluate(() => {
  const el = document.getElementById('viz-data');
  if (!el) return { error: 'no #viz-data block' };
  let data;
  try { data = JSON.parse(el.textContent); } catch (e) { return { error: `#viz-data is not valid JSON: ${e.message}` }; }
  const dims = data.dimensions || {};
  return {
    dims: Object.entries(dims)
      .map(([id, d]) => ({ id, label: d.label || id, options: (d.options || []).map(o => o.id) }))
      .filter(d => d.options.length >= 2),
  };
});

const probeDimension = (page, dim) => page.evaluate(async ({ id, options }) => {
  const numbers = () => [
    document.getElementById('hero-cited')?.textContent,
    document.getElementById('hero-absent')?.textContent,
    document.getElementById('delta-x')?.textContent,
    ...[...document.querySelectorAll('.val')].map(n => n.textContent),
    ...[...document.querySelectorAll('[data-delta]')].map(n => n.textContent),
  ].filter(Boolean).join('|');
  const settle = async () => {
    if (window.VIZ?.seek) await window.VIZ.seek(window.VIZ.duration);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  };

  const byId = document.getElementById(`sel-${id}`);
  const control = byId?.tagName === 'SELECT' ? byId
    : [...document.querySelectorAll('select')]
      .find(s => { const vals = [...s.options].map(o => o.value); return options.every(v => vals.includes(v)); });

  const how = control ? `select#${control.id || '(matched by options)'}` : 'VIZ.setState';
  const setTo = async value => {
    if (control) { control.value = value; control.dispatchEvent(new Event('change', { bubbles: true })); }
    else if (window.VIZ?.setState) await window.VIZ.setState({ [id]: value });
    else return false;
    await settle();
    return true;
  };

  const original = control ? control.value : window.VIZ?.state?.[id];
  const [a, b] = options;
  if (!await setTo(a)) return { ok: false, how, detail: `no <select> for "${id}" and VIZ.setState cannot set it` };
  const before = numbers();
  await setTo(b);
  const after = numbers();
  const live = document.getElementById('live')?.textContent || '';
  if (original != null && original !== '') await setTo(original);
  return {
    ok: before !== after, how,
    detail: `${a} → ${b} via ${how}: ${before.slice(0, 44)} → ${after.slice(0, 44)}`,
    live: live.slice(0, 80),
  };
}, dim);

mkdirSync(outDir, { recursive: true });
const t0 = now();
const browser = await launch();

try {
  for (const [w, h] of [[1360, 900], [390, 844]]) {
    const scope = `@${w}`;
    const { page, errors, external } = await openViz(browser, url, { width: w, height: h });
    // let the reveal finish so the screenshot shows the settled artifact
    await page.evaluate(() => window.VIZ.seek(window.VIZ.duration));

    const m = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      bodyScroll: document.body.scrollWidth,
      h1: document.querySelectorAll('h1').length,
      live: !!document.querySelector('[aria-live="polite"]'),
      liveText: (document.getElementById('live') || {}).textContent || '',
      markers: [...document.querySelectorAll('.src')].map(b => b.dataset.src),
      sourceIds: [...document.querySelectorAll('.s-item')].map(n => n.id.replace(/^src-/, '')),
      focusables: document.querySelectorAll('button, select, summary, a[href]').length,
      canvasPainted: (() => { const c = document.getElementById('bg'); return c && c.width > 0 && c.height > 0; })(),
      snapshot: window.VIZ.snapshot(),
      wide: [...document.querySelectorAll('*')]
        .filter(el => el.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 4).map(el => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`),
    }));

    record(scope, 'no horizontal overflow', m.scrollWidth <= m.innerWidth && m.bodyScroll <= m.innerWidth,
      `scrollWidth ${m.scrollWidth} / viewport ${m.innerWidth}${m.wide.length ? ` · widest: ${m.wide.join(', ')}` : ''}`);
    record(scope, 'exactly one h1', m.h1 === 1, String(m.h1));
    record(scope, 'aria-live region carries the settled comparison', m.live && m.liveText.length > 40, m.liveText.slice(0, 90));
    record(scope, 'every source marker resolves to a listed source',
      m.markers.length > 0 && m.markers.every(id => m.sourceIds.includes(id)),
      `${m.markers.length} markers → ${m.sourceIds.length} sources`);
    record(scope, 'backdrop canvas has pixels', m.canvasPainted, '');
    record(scope, 'keyboard-reachable controls present', m.focusables >= 8, `${m.focusables} focusable elements`);
    record(scope, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    record(scope, 'no external requests (self-contained)', external.length === 0, external.slice(0, 3).join(', '));

    // Every declared dimension really drives the comparison.
    const { dims, error } = await readDimensions(page);
    record(scope, 'artifact declares at least one selectable dimension with 2+ options',
      !error && dims.length > 0, error || `${dims.map(d => `${d.id}(${d.options.length})`).join(', ')}`);
    for (const dim of dims || []) {
      const r = await probeDimension(page, dim);
      const named = dim.label && dim.label !== dim.id ? `"${dim.id}" (${dim.label})` : `"${dim.id}"`;
      record(scope, `changing ${named} changes a rendered number`, r.ok, r.detail);
    }

    await page.screenshot({ path: join(outDir, `${name}-${w}.png`), fullPage: true });
    await page.screenshot({ path: join(outDir, `${name}-${w}-fold.png`), fullPage: false });
    await page.close();
  }

  // prefers-reduced-motion
  for (const [w, h] of [[1360, 900], [390, 844]]) {
    const scope = `@${w} reduced-motion`;
    const { page, errors } = await openViz(browser, url, { width: w, height: h, reducedMotion: true });
    const before = await page.evaluate(() => ({
      motion: document.documentElement.dataset.motion,
      hero: document.getElementById('hero-cited').textContent,
      delta: document.getElementById('delta-x').textContent,
      dur: getComputedStyle(document.documentElement).getPropertyValue('--dur').trim(),
      live: document.getElementById('live').textContent,
    }));
    // A settled artifact must not keep scheduling frames.
    const raf = await page.evaluate(() => new Promise(res => {
      let n = 0;
      const orig = window.requestAnimationFrame;
      window.requestAnimationFrame = cb => { n++; return orig(cb); };
      setTimeout(() => { window.requestAnimationFrame = orig; res(n); }, 900);
    }));
    const after = await page.evaluate(() => document.getElementById('hero-cited').textContent);

    record(scope, 'reduced-motion flag is set on <html>', before.motion === 'reduced', before.motion);
    record(scope, 'transition duration collapses to 0s', before.dur === '0s', before.dur);
    record(scope, 'counters are already at their settled values', before.hero !== '0' && before.hero === after, `${before.hero} → ${after}`);
    record(scope, 'payoff value is shown, not animated in', before.delta !== '—', before.delta);
    record(scope, 'no animation loop is running', raf <= 2, `${raf} rAF callbacks in 900 ms`);
    record(scope, 'live region still announces the comparison', before.live.length > 40, before.live.slice(0, 80));
    record(scope, 'no console or page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.screenshot({ path: join(outDir, `${name}-${w}-reduced-motion.png`), fullPage: false });
    await page.close();
  }
} finally {
  await browser.close();
}

const failures = results.filter(r => !r.pass);
const report = {
  generated: new Date().toISOString(), template, name, checks: results.length,
  passed: results.length - failures.length, failed: failures.length, failures, results,
};
const out = join(outDir, 'verify.json');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(`\nverify: ${results.length - failures.length}/${results.length} checks passed in ${ms(t0)} → ${out}`);
process.exitCode = failures.length ? 1 : 0;
