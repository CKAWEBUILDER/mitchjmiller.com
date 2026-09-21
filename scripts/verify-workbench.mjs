#!/usr/bin/env node
/**
 * Population workbench verification.
 *
 *   node scripts/verify-workbench.mjs                # model + built HTML checks
 *   node scripts/verify-workbench.mjs --no-html      # model checks only
 *   node scripts/verify-workbench.mjs --screenshots  # also drive the preview at $WORKBENCH_BASE (default 127.0.0.1:5189)
 *
 * Model checks bundle site/islands/workbench/model.ts with esbuild and compare it
 * against (1) the ported ubi.ts, (2) the original ubi.ts in the mids-portfolio
 * tree when present, and (3) independent plain-loop arithmetic in this file.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const failures = [];
let passes = 0;
const ok = (msg) => { passes++; console.log(`PASS ${msg}`); };
const fail = (msg) => { failures.push(msg); console.log(`FAIL ${msg}`); };
const check = (cond, msg) => (cond ? ok(msg) : fail(msg));
const close = (a, b, rel = 1e-9) => Math.abs(a - b) <= rel * Math.max(1, Math.abs(a), Math.abs(b));

const tmp = join(tmpdir(), `workbench-verify-${process.pid}`);
mkdirSync(tmp, { recursive: true });

async function bundle(entry, name) {
  const outfile = join(tmp, `${name}.mjs`);
  await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'neutral', outfile, logLevel: 'silent' });
  return import(pathToFileURL(outfile).href);
}

const sample = JSON.parse(readFileSync(resolve(root, 'public/data/ca-pums-sample-2019.json'), 'utf8'));
const meta = JSON.parse(readFileSync(resolve(root, 'public/data/ca-pums-meta-2019.json'), 'utf8'));
const M = await bundle(resolve(root, 'site/islands/workbench/model.ts'), 'model');
const U = await bundle(resolve(root, 'site/islands/workbench/ubi.ts'), 'ubi-ported');

/* ---------------- data integrity ---------------- */
const n = sample.age.length;
check(n === 12000, `sample has 12,000 records (${n})`);
check(['income', 'sex', 'race', 'education', 'employment'].every((k) => sample[k].length === n), 'all sample columns have equal length');
check(Math.abs(n * sample.scaledWeight - meta.totalPopulation) < 1, `n × scaledWeight ≈ meta.totalPopulation (${(n * sample.scaledWeight).toFixed(1)} vs ${meta.totalPopulation})`);

const pop = M.fromSample(sample);
check(close(pop.totalWeight, n * sample.scaledWeight), 'fromSample totalWeight = n × scaledWeight');

/* ---------------- UBI model parity ---------------- */
const all = M.filterPopulation(pop, M.DEFAULT_FILTERS);
check(all.length === n, `default filters keep every record (${all.length})`);

const viaModel = M.runUbi(pop, all, meta, M.DEFAULT_UBI_PARAMS);
const viaPorted = U.simulate(sample, meta, M.DEFAULT_UBI_PARAMS);
const scalarKeys = ['totalUbiCost', 'totalTaxRevenue', 'netFiscal', 'fundedTaxRate', 'meanNetChange', 'medianNetChange', 'medianAdultNetChange', 'beneficiaries', 'payers', 'neutral', 'povertyBefore', 'povertyAfter'];
check(scalarKeys.every((k) => viaModel[k] === viaPorted[k]), 'model.runUbi(all records) equals ported ubi.simulate on every scalar output at default params');
check(JSON.stringify(viaModel.histogram) === JSON.stringify(viaPorted.histogram) && JSON.stringify(viaModel.byAge) === JSON.stringify(viaPorted.byAge) && JSON.stringify(viaModel.byRace) === JSON.stringify(viaPorted.byRace) && JSON.stringify(viaModel.byEducation) === JSON.stringify(viaPorted.byEducation), 'model.runUbi histogram/byAge/byRace/byEducation equal ported output');

const original = '/Users/mitchellmiler/Documents/CKA Control Tower/mids-portfolio/artifacts/portfolio/src/lib/ubi.ts';
if (existsSync(original)) {
  const O = await bundle(original, 'ubi-original');
  const viaOriginal = O.simulate(sample, meta, M.DEFAULT_UBI_PARAMS);
  check(scalarKeys.every((k) => viaOriginal[k] === viaModel[k]), 'original mids-portfolio ubi.ts gives identical scalar outputs');
  const same = readFileSync(original, 'utf8') === readFileSync(resolve(root, 'site/islands/workbench/ubi.ts'), 'utf8');
  check(same, 'ported ubi.ts is byte-identical to the original');
} else {
  console.log('SKIP original ubi.ts not present on this machine');
}

// Independent arithmetic for the headline UBI numbers.
{
  const p = M.DEFAULT_UBI_PARAMS;
  const w = sample.scaledWeight;
  let cost = 0, revenue = 0, gainers = 0, povBefore = 0, povAfter = 0;
  for (let i = 0; i < n; i++) {
    const benefit = (sample.age[i] >= p.adultAge ? p.adultMonthly : p.childMonthly) * 12;
    const taxable = p.progressive ? Math.max(sample.income[i] - p.exemption, 0) : Math.max(sample.income[i], 0);
    const tax = taxable * p.taxRate;
    cost += benefit * w; revenue += tax * w;
    if (benefit - tax > 0.5) gainers += w;
    if (sample.income[i] < meta.povertyLine) povBefore += w;
    if (sample.income[i] + benefit - tax < meta.povertyLine) povAfter += w;
  }
  check(close(cost, viaModel.totalUbiCost, 1e-9) && close(revenue, viaModel.totalTaxRevenue, 1e-9), `independent loop matches program cost ${M.fmtBillions(cost)} and revenue ${M.fmtBillions(revenue)}`);
  check(close(gainers, viaModel.beneficiaries, 1e-9), `independent loop matches net gainers ${M.fmtMillions(gainers)}`);
  check(close(povBefore / pop.totalWeight, viaModel.povertyBefore, 1e-9) && close(povAfter / pop.totalWeight, viaModel.povertyAfter, 1e-9), `independent loop matches poverty proxy ${M.fmtPct(viaModel.povertyBefore)} → ${M.fmtPct(viaModel.povertyAfter)}`);
}

// Progressive variant also matches the ported model on a filtered subset.
{
  const params = { ...M.DEFAULT_UBI_PARAMS, progressive: true, exemption: 25000, taxRate: 0.4 };
  const idx = M.filterPopulation(pop, { ...M.DEFAULT_FILTERS, ageMin: 25, ageMax: 54 });
  const a = M.runUbi(pop, idx, meta, params);
  const sub = { scaledWeight: sample.scaledWeight };
  for (const k of ['age', 'income', 'sex', 'race', 'education', 'employment']) sub[k] = idx.map((i) => sample[k][i]);
  const b = U.simulate(sub, meta, params);
  check(scalarKeys.every((k) => a[k] === b[k]), `progressive params on an age 25–54 subset (${idx.length} records) match the ported model`);
}

/* ---------------- weighted filtering ---------------- */
const full = M.summarize(pop, all);
check(close(full.people, pop.totalWeight), `full-population weighted count = ${M.fmtInt(full.people)}`);
check(close(full.shareOfCalifornia, 1), 'full-population share of California = 100%');
const sums = (rows) => rows.reduce((s, r) => s + r.people, 0);
check(['ageHistogram', 'incomeHistogram', 'educationShares', 'employmentShares', 'sexShares', 'raceShares'].every((k) => close(sums(full[k]), full.people)), 'every distribution sums to the weighted count');

{
  // Independent loop: employed women aged 25–44 with income $50k–$100k.
  const f = { ageMin: 25, ageMax: 44, incomeBands: ['$50,000–$74,999', '$75,000–$99,999'], education: [], employment: ['Employed'], sex: ['Female'], race: [] };
  const idx = M.filterPopulation(pop, f);
  let expectedRecords = 0, expectedPeople = 0, incomeSum = 0;
  for (let i = 0; i < n; i++) {
    if (sample.age[i] >= 25 && sample.age[i] <= 44 && sample.income[i] >= 50000 && sample.income[i] < 100000 && sample.employment[i] === 'Employed' && sample.sex[i] === 'Female') {
      expectedRecords++; expectedPeople += sample.scaledWeight; incomeSum += sample.income[i] * sample.scaledWeight;
    }
  }
  const s = M.summarize(pop, idx);
  check(s.records === expectedRecords && close(s.people, expectedPeople), `filter (employed women 25–44, $50k–$100k) keeps ${expectedRecords} records = ${M.fmtInt(expectedPeople)} people`);
  check(close(s.meanIncome, incomeSum / expectedPeople), `filtered weighted mean income ${M.fmtUSD(s.meanIncome)} matches independent loop`);
  check(s.sexShares.find((r) => r.label === 'Female').share === 1 && s.employmentShares.find((r) => r.label === 'Employed').share === 1, 'filtered category shares are 100% for the selected categories');
  check(close(s.shareOfCalifornia, expectedPeople / pop.totalWeight), `filtered share of California ${M.fmtPct(s.shareOfCalifornia, 2)}`);
}

{
  const median = M.weightedMedian([5, 1, 3], [1, 1, 1]);
  const medianW = M.weightedMedian([5, 1, 3], [1, 10, 1]);
  check(median === 3 && medianW === 1, 'weightedMedian respects weights');
  const empty = M.summarize(pop, []);
  check(empty.records === 0 && empty.people === 0 && empty.medianIncome === 0, 'empty selection summarizes to zeros without throwing');
}

/* ---------------- reach scenario ---------------- */
{
  const r = M.runReach(1000000, { eligibleShare: 0.5, awarenessRate: 0.2, adoptionRate: 0.05, valuePerAdopter: 120, valueKind: 'revenue', budget: 250000 });
  check(r.eligiblePeople === 500000 && r.awarePeople === 100000 && r.adopters === 5000 && r.totalValue === 600000 && r.budgetPerAdopter === 50 && close(r.budgetRatio, 2.4), 'reach scenario arithmetic (1M × 50% × 20% × 5% × $120)');
  const c = M.runReach(1000000, { eligibleShare: 0.5, awarenessRate: 0.2, adoptionRate: 0.05, valuePerAdopter: 120, valueKind: 'cost', budget: 250000 });
  check(close(c.fundedAdopters, 250000 / 120) && close(c.budgetRatio, 250000 / 600000), 'reach scenario cost variant (funded adopters, budget coverage)');
  const z = M.runReach(0, M.DEFAULT_REACH);
  check(z.adopters === 0 && z.budgetPerAdopter === null, 'reach scenario handles an empty population');
}

/* ---------------- persona sampling ---------------- */
{
  const idx = M.filterPopulation(pop, { ...M.DEFAULT_FILTERS, employment: ['Employed'] });
  const a = M.samplePersonas(pop, idx, 6, 42);
  const b = M.samplePersonas(pop, idx, 6, 42);
  const set = new Set(idx);
  check(a.length === 6 && new Set(a.map((p) => p.record)).size === 6, 'six distinct personas sampled');
  check(a.every((p) => set.has(p.record - 1) && p.employment === 'Employed'), 'personas come from the filtered records only');
  check(JSON.stringify(a) === JSON.stringify(b), 'same seed reproduces the same personas');
  check(M.samplePersonas(pop, idx, 6, 43).map((p) => p.record).join() !== a.map((p) => p.record).join(), 'different seed changes the sample');
  check(M.samplePersonas(pop, [], 6, 1).length === 0 && M.samplePersonas(pop, idx.slice(0, 3), 6, 1).length === 3, 'persona count is capped by the selection size');

  // Weight proportionality on a synthetic two-record population: 9:1 weights.
  const synth = { ...pop, n: 2, weight: [9, 1], age: [30, 40], income: [1, 2], sex: ['F', 'M'], race: ['a', 'b'], education: ['x', 'y'], employment: ['e', 'f'], totalWeight: 10 };
  let heavy = 0;
  const trials = 20000;
  for (let t = 0; t < trials; t++) if (M.sampleIndices(synth, [0, 1], 1, t)[0] === 0) heavy++;
  const share = heavy / trials;
  check(Math.abs(share - 0.9) < 0.02, `weight-proportional sampling: 9-weight record drawn ${(share * 100).toFixed(1)}% of ${trials} single draws (expected 90%)`);
}

/* ---------------- exports ---------------- */
{
  const state = { question: 'Test question <b>', filters: M.DEFAULT_FILTERS, ubiParams: M.DEFAULT_UBI_PARAMS, reach: M.DEFAULT_REACH, personaCount: 6, personaSeed: 7 };
  const personas = M.samplePersonas(pop, all, 6, 7);
  const results = { summary: full, ubi: viaModel, reach: M.runReach(full.people, M.DEFAULT_REACH), personas };
  const bundleObj = M.buildBundle(state, results, meta, pop, '2026-09-11T00:00:00.000Z');
  const json = M.buildJson(bundleObj);
  const parsed = JSON.parse(json);
  check(parsed.state.question === 'Test question <b>' && parsed.results.summary.records === n && parsed.labels.estimate.includes('not a forecast'), 'JSON export round-trips inputs, results and labels');
  const csv = M.buildCsv(personas);
  const lines = csv.trim().split('\n');
  check(lines.length === 7 && lines[0].startsWith('persona,sample_record,age,age_group,income_band') && lines[1].includes(M.DISCLAIMERS.personas), 'CSV export has a header, six persona rows and the disclaimer');
  const html = M.buildHtmlReport(bundleObj);
  check(html.includes('Test question &lt;b&gt;') && html.includes(M.DISCLAIMERS.personas) && html.includes(M.DISCLAIMERS.reach) && html.includes('not a forecast'), 'HTML report escapes the question and carries the disclaimers');
  check(!/<(script|link|img|iframe)[^>]+(src|href)=["']https?:/i.test(html) && !/url\(https?:/i.test(html), 'HTML report loads no external resources');
  check(html.includes('id="a1"') && html.includes("addEventListener('input',run)"), 'HTML report includes the inline reach recalculation script');
}

/* ---------------- built HTML ---------------- */
if (!args.has('--no-html')) {
  const tool = resolve(root, 'dist/lab/population-workbench/index.html');
  const method = resolve(root, 'dist/lab/population-workbench/methodology/index.html');
  if (!existsSync(tool) || !existsSync(method)) {
    fail('dist/lab/population-workbench pages missing — run `npm run build` first (or pass --no-html)');
  } else {
    const t = readFileSync(tool, 'utf8');
    const m = readFileSync(method, 'utf8');
    check((t.match(/<h1[\s>]/g) || []).length === 1 && /Build your own simulated population/.test(t), 'tool page has exactly one h1 with the tool title');
    check(t.includes('<noscript'), 'tool page carries a <noscript> notice');
    check(t.includes(M.fmtInt(full.people)) && t.includes(M.fmtInt(full.records)) && t.includes(M.fmtUSD(full.medianIncome)), `tool page baseline shows ${M.fmtInt(full.people)} people, ${M.fmtInt(full.records)} records, median ${M.fmtUSD(full.medianIncome)}`);
    check(t.includes(M.DISCLAIMERS.personas) && t.includes(M.DISCLAIMERS.reach), 'tool page static HTML carries the persona and reach disclaimers');
    check(t.includes('/contact/?topic=population-simulation'), 'tool page links the freemium contact CTA');
    check((m.match(/<h1[\s>]/g) || []).length === 1 && /[Mm]ethodology/.test(m), 'methodology page has exactly one h1');
    check(m.includes('<noscript') && m.includes('2019 ACS 1-Year PUMS') && /Observed/.test(m) && /Simulated/.test(m) && /Assumed/.test(m) && /Changelog/.test(m), 'methodology page names the data source, value labels and changelog');
    check(m.includes(M.fmtInt(meta.totalPopulation)) && m.includes(M.fmtInt(meta.sampleRecords)), 'methodology page prints the population and full-file record counts from meta');
    // Site-wide head resources (Google Fonts, GA4 in release mode) are allowed; the tool itself must not add hosts.
    const siteHosts = /https?:\/\/(?:mj2\.pro|www\.mj2\.pro|mitchjmiller\.com|www\.census\.gov|github\.com|www\.w3\.org|linkedin\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|www\.googletagmanager\.com)/g;
    check(!/https?:\/\//.test(t.replace(siteHosts, '')), 'tool page references no third-party hosts beyond the site-wide fonts/analytics');
    const dataOut = resolve(root, 'dist/data/ca-pums-sample-2019.json');
    check(existsSync(dataOut) && statSync(dataOut).size === statSync(resolve(root, 'public/data/ca-pums-sample-2019.json')).size && existsSync(resolve(root, 'dist/data/ca-pums-meta-2019.json')), 'sample and meta JSON are copied into dist/data/');
  }
}

/* ---------------- browser: screenshots and downloads ---------------- */
if (args.has('--screenshots')) {
  const puppeteer = (await import('puppeteer-core')).default;
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const base = process.env.WORKBENCH_BASE || 'http://127.0.0.1:5189';
  const shotDir = resolve(root, 'docs/lab/screenshots');
  mkdirSync(shotDir, { recursive: true });
  const dlDir = join(tmp, 'downloads');
  mkdirSync(dlDir, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--hide-scrollbars'] });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    const external = [];
    const siteWide = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|www\.googletagmanager\.com|www\.google-analytics\.com|analytics\.google\.com|stats\.g\.doubleclick\.net)\//;
    page.on('request', (req) => { if (!req.url().startsWith(base) && !siteWide.test(req.url())) external.push(req.url()); });
    // client:visible hydrates on intersection; headless Chrome never scrolls on its own.
    const hydrate = async (p) => { await p.$eval('.wb', (el) => el.scrollIntoView()); await p.waitForSelector('[data-workbench-state="ready"]', { timeout: 60000 }); };
    const client = await page.createCDPSession();
    await client.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dlDir, eventsEnabled: true });

    for (const [width, height, name] of [[1360, 900, 'tool-1360'], [390, 844, 'tool-390']]) {
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      await page.goto(`${base}/lab/population-workbench/`, { waitUntil: 'networkidle0', timeout: 60000 });
      await hydrate(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: join(shotDir, `${name}.png`), fullPage: true });
      ok(`screenshot docs/lab/screenshots/${name}.png (${width}px)`);
    }
    await page.setViewport({ width: 1360, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${base}/lab/population-workbench/methodology/`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.screenshot({ path: join(shotDir, 'methodology-1360.png'), fullPage: true });
    ok('screenshot docs/lab/screenshots/methodology-1360.png');

    // Interaction: the hydrated count equals the build-time baseline, then changes with a filter.
    await page.goto(`${base}/lab/population-workbench/`, { waitUntil: 'networkidle0', timeout: 60000 });
    await hydrate(page);
    const liveCount = await page.$eval('[data-testid="people-count"]', (el) => el.textContent.trim());
    check(liveCount === M.fmtInt(full.people), `hydrated weighted count ${liveCount} equals the build-time baseline`);
    await page.click('[data-testid="chip-employment-Employed"]');
    const employed = M.summarize(pop, M.filterPopulation(pop, { ...M.DEFAULT_FILTERS, employment: ['Employed'] }));
    await page.waitForFunction((v) => document.querySelector('[data-testid="people-count"]')?.textContent.trim() === v, { timeout: 10000 }, M.fmtInt(employed.people));
    ok(`filter chip updates the count to ${M.fmtInt(employed.people)} (employed only)`);

    for (const [testid, ext] of [['export-html', '.html'], ['export-csv', '.csv'], ['export-json', '.json']]) {
      const before = new Set(readdirSync(dlDir));
      await page.click(`[data-testid="${testid}"]`);
      let file = null;
      for (let i = 0; i < 100 && !file; i++) {
        await new Promise((r) => setTimeout(r, 100));
        file = readdirSync(dlDir).find((f) => !before.has(f) && f.endsWith(ext) && statSync(join(dlDir, f)).size > 0);
      }
      check(!!file, `download ${testid} produced ${file ?? 'nothing'}${file ? ` (${statSync(join(dlDir, file)).size} bytes)` : ''}`);
      if (file && ext === '.html') {
        const report = readFileSync(join(dlDir, file), 'utf8');
        check(report.includes(M.DISCLAIMERS.personas) && report.includes('id="a1"'), 'downloaded HTML report carries disclaimers and the inline script');
        const rp = await browser.newPage();
        await rp.goto(pathToFileURL(join(dlDir, file)).href, { waitUntil: 'load' });
        const before = await rp.$eval('#o3', (el) => el.textContent);
        await rp.$eval('#a3', (el) => { el.value = '50'; el.dispatchEvent(new Event('input', { bubbles: true })); });
        const after = await rp.$eval('#o3', (el) => el.textContent);
        check(before !== after, `downloaded report recalculates reach in-page (${before} → ${after} adopters at 50% adoption)`);
        await rp.close();
      }
    }
    check(external.length === 0, `no external network requests from the tool page beyond site-wide fonts/analytics${external.length ? `: ${external.slice(0, 3).join(', ')}` : ''}`);
    check(errors.length === 0, `no page errors${errors.length ? `: ${errors.slice(0, 3).join(' | ')}` : ''}`);
  } finally {
    await browser.close();
  }
}

rmSync(tmp, { recursive: true, force: true });
console.log(`\n${passes} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
