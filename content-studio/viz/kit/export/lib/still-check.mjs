/**
 * Frame-integrity checks for a still (poster PNG, PDF page, GIF frame).
 *
 * Why this exists: a still is laid out inside a fixed frame with `overflow:hidden`,
 * so content that does not fit is *silently clipped* — `document.scrollHeight`
 * stays equal to the viewport and every render check still passes. A real poster
 * shipped with 7 of 11 sources cut off and two source labels overlapping, and
 * `verify.mjs` never saw it, because verify only looks at the live artifact.
 *
 * So the load-bearing assertions here are geometric, not scroll-based: every
 * attribution element's `getBoundingClientRect()` must lie inside the frame
 * (a rect still reports its true position when an ancestor clips it), and no two
 * source labels may overlap. Text-run boxes are measured with a Range so text
 * that overflows its grid cell is caught, not just the cell.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const STILL_TOLERANCE = 1;      // px — sub-pixel layout slop
const OVERLAP_MIN = 2;                 // px on both axes before we call it an overlap

/**
 * Measure one still. Returns { label, width, height, fit, checks[], failures[] }.
 * Pure measurement — the caller decides whether to throw.
 */
export async function inspectStill(page, { label, width, height }) {
  const data = await page.evaluate(({ tol, overlapMin }) => {
    const root = document.documentElement;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const visible = el => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const box = el => { const r = el.getBoundingClientRect(); return { top: r.top, left: r.left, bottom: r.bottom, right: r.right, width: r.width, height: r.height }; };
    // Tight box of the rendered text runs — catches text that overflows its cell.
    const textBox = el => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      range.detach?.();
      return r.width > 0 && r.height > 0 ? { top: r.top, left: r.left, bottom: r.bottom, right: r.right } : box(el);
    };
    const outsideBy = b => Math.max(0, -b.top, -b.left, b.bottom - vh, b.right - vw);
    const describe = b => `top ${Math.round(b.top)} left ${Math.round(b.left)} bottom ${Math.round(b.bottom)} right ${Math.round(b.right)} vs frame ${vw}×${vh}`;

    const TARGETS = [
      ['.sources', 'sources drawer'],
      ['.src-line', 'source line'],
      ['.honesty', 'honesty note'],
      ['.by', 'byline'],
      ['.strip', 'honesty strip'],
    ];

    const attribution = TARGETS.map(([sel, name]) => {
      const el = document.querySelector(sel);
      if (!visible(el)) return { sel, name, rendered: false };
      const b = box(el);
      return { sel, name, rendered: true, over: outsideBy(b), where: describe(b) };
    });

    const rows = [...document.querySelectorAll('.s-item')].filter(visible);
    const rowBoxes = rows.map(el => ({
      id: (el.id || '').replace(/^src-/, '') || (el.textContent || '').trim().slice(0, 28),
      box: textBox(el),
    }));
    const clipped = rowBoxes
      .map(r => ({ id: r.id, over: outsideBy(r.box), where: describe(r.box) }))
      .filter(r => r.over > tol);

    const overlaps = [];
    for (let i = 0; i < rowBoxes.length; i++) {
      for (let j = i + 1; j < rowBoxes.length; j++) {
        const a = rowBoxes[i].box, b = rowBoxes[j].box;
        const dx = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const dy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (dx > overlapMin && dy > overlapMin) {
          overlaps.push({ a: rowBoxes[i].id, b: rowBoxes[j].id, overlap: `${Math.round(dx)}×${Math.round(dy)} px` });
        }
      }
    }

    // Text that is ellipsised or line-clamped inside its box is "fitted" only in
    // the sense that the reader cannot read it. On a still, a half-shown source
    // is the same defect as a missing one.
    const truncated = [];
    for (const row of rows) {
      const owner = (row.id || '').replace(/^src-/, '') || (row.textContent || '').trim().slice(0, 20);
      for (const el of [row, ...row.querySelectorAll('*')]) {
        const cs = getComputedStyle(el);
        const clipsX = /hidden|clip/.test(cs.overflowX);
        const clipsY = /hidden|clip/.test(cs.overflowY) || cs.webkitLineClamp !== 'none';
        const overX = clipsX && el.scrollWidth - el.clientWidth > 1;
        const overY = clipsY && el.scrollHeight - el.clientHeight > 1;
        if (overX || overY) {
          truncated.push({ owner, how: overX ? `${el.scrollWidth - el.clientWidth}px of text cut horizontally` : `${el.scrollHeight - el.clientHeight}px of text cut vertically` });
          break;
        }
      }
    }

    const shell = document.querySelector('.shell');
    return {
      vw, vh,
      fit: Number(getComputedStyle(root).getPropertyValue('--fit').trim() || 1),
      scrollHeight: root.scrollHeight,
      scrollWidth: root.scrollWidth,
      shellOverflow: shell ? shell.scrollHeight - shell.clientHeight : 0,
      attribution,
      sourceRows: rowBoxes.length,
      clipped,
      overlaps,
      truncated,
      hasSourceEvidence: rowBoxes.length > 0 || visible(document.querySelector('.src-line')),
    };
  }, { tol: STILL_TOLERANCE, overlapMin: OVERLAP_MIN });

  const checks = [];
  const add = (check, pass, detail = '') => checks.push({ check, pass, detail });

  add('frame height not exceeded', data.scrollHeight <= height + STILL_TOLERANCE,
    `document.scrollHeight ${data.scrollHeight} / frame ${height}`);
  add('frame width not exceeded', data.scrollWidth <= width + STILL_TOLERANCE,
    `document.scrollWidth ${data.scrollWidth} / frame ${width}`);
  add('layout fits without clipping (shell overflow after fitStill)', data.shellOverflow <= STILL_TOLERANCE,
    `${data.shellOverflow} px past the frame · --fit ${data.fit}`);

  for (const a of data.attribution) {
    if (!a.rendered) continue;
    add(`${a.name} is inside the frame`, a.over <= STILL_TOLERANCE,
      a.over > STILL_TOLERANCE ? `${a.name} (${a.sel}) is ${Math.round(a.over)} px outside — ${a.where}` : a.where);
  }

  add('still carries source evidence on its face', data.hasSourceEvidence,
    `${data.sourceRows} source rows` + (data.hasSourceEvidence ? '' : ' and no .src-line — a still nobody can hover must show its sources'));

  add('every source row is fully inside the frame', data.clipped.length === 0,
    data.clipped.length
      ? `${data.clipped.length} of ${data.sourceRows} clipped: ${data.clipped.slice(0, 4).map(c => `${c.id} (${Math.round(c.over)} px out)`).join(', ')}`
      : `${data.sourceRows} of ${data.sourceRows} visible`);

  add('no source text is cut off inside its box', data.truncated.length === 0,
    data.truncated.length
      ? `${data.truncated.length} of ${data.sourceRows} truncated: ${data.truncated.slice(0, 4).map(t => `${t.owner} (${t.how})`).join(', ')}`
      : `${data.sourceRows} rows render in full`);

  add('no two source labels overlap', data.overlaps.length === 0,
    data.overlaps.length
      ? data.overlaps.slice(0, 4).map(o => `${o.a} ⨯ ${o.b} overlap ${o.overlap}`).join('; ')
      : `${data.sourceRows} labels, no collisions`);

  const failures = checks.filter(c => !c.pass);
  return { label, width, height, fit: data.fit, sourceRows: data.sourceRows, checks, failures };
}

/** Print a still report and throw a clear, named error if anything failed. */
export function reportStill(result, { throwOnFail = true } = {}) {
  for (const c of result.checks) {
    console.log(`  ${c.pass ? 'PASS' : 'FAIL'} ${result.label} — ${c.check}${c.detail ? ` (${c.detail})` : ''}`);
  }
  if (result.failures.length && throwOnFail) {
    const lines = result.failures.map(f => `  · ${f.check}: ${f.detail}`).join('\n');
    throw new Error(
      `Still "${result.label}" (${result.width}×${result.height}, --fit ${result.fit}) does not fit its frame:\n${lines}\n` +
      'Shorten the copy, cut a metric or a source, or lower the fit floor in fitStill(). ' +
      'Do not ship a still with clipped or overlapping sources.',
    );
  }
  return result;
}

/** Merge still results into <out>/stills.json so run-all can fold them into the manifest. */
export function recordStills(outDir, results) {
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, 'stills.json');
  let all = {};
  if (existsSync(file)) { try { all = JSON.parse(readFileSync(file, 'utf8')); } catch { all = {}; } }
  for (const r of results) {
    all[r.label] = {
      width: r.width, height: r.height, fit: r.fit, sourceRows: r.sourceRows,
      passed: r.checks.length - r.failures.length, checks: r.checks.length,
      failures: r.failures, assertions: r.checks,
    };
  }
  writeFileSync(file, `${JSON.stringify(all, null, 2)}\n`);
  return file;
}
