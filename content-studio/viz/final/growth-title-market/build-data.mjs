#!/usr/bin/env node
/**
 * Derive the #viz-data block for the growth-title-market DATA MANDALA from the
 * research ledger (content-studio/research/2026-09-14/titles/data.json).
 *
 *   node build-data.mjs            # print the JSON
 *   node build-data.mjs --inject   # write it into index.html's #viz-data block
 *   node build-data.mjs --check    # exit 1 if index.html's block has drifted from the ledger
 *
 * Every NUMBER on the wheel, the rail and the panel is computed here from the
 * ledger. The editorial strings (crown line breaks, rail captions, one-line
 * readings, which dated signal sits on ring 3) are authored, and each figure an
 * authored string quotes is asserted against the ledger text below, so a ledger
 * edit that invalidates a caption fails the build instead of shipping.
 *
 * Carried over from the 2026-09-14 artifact, unchanged:
 *   - RevOps 127% year-over-year: WITHDRAWN. The figure appears nowhere in the output.
 *   - Head of AEO/GEO 435: a mentions count, not a title count. Held out of the order.
 *   - GTM Engineer growth: quoted verbatim from GTME Pulse (March 2026), re-checked 2026-09-14.
 * Two readings per number, never an average: floor = strictest / lowest published,
 * ceiling = loosest / highest published.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const LEDGER = resolve(HERE, '../../../research/2026-09-14/titles/data.json');
const raw = JSON.parse(readFileSync(LEDGER, 'utf8'));
const byTitle = Object.fromEntries(raw.map(t => [t.title, t]));
const RETRIEVED = '2026-09-14';

/* ------------------------------------------------------------------ sources */
const SOURCES = [
  { id: 's-sh', label: 'SimplyHired — exact-phrase US job search', asOf: '2026-09-14', url: 'https://www.simplyhired.com/',
    detail: 'Quoted phrase, location United States. Returns a literal count, including zero. The floor for every postings figure.' },
  { id: 's-li', label: 'LinkedIn — public guest job search (loose keyword match)', asOf: '2026-09-14', url: 'https://www.linkedin.com/jobs/',
    detail: 'Not an exact-title count. Reports rounded ceilings such as 11,000+ for terms with near-zero exact-phrase results, so it is shown as a placeholder, not a measurement.' },
  { id: 's-bi', label: 'Built In — keyword job search', asOf: '2026-09-14', url: 'https://builtin.com/jobs',
    detail: 'Tech-company board. A second literal count; several titles return zero here.' },
  { id: 's-zip', label: 'ZipRecruiter — salary pages', asOf: '2026-08', url: 'https://www.ziprecruiter.com/Salaries/',
    detail: 'National averages by title slug. Two different slugs for the same growth-engineer role return different averages; both are kept. Not independently re-checked: the pages return HTTP 403 to automated fetches, so these figures were read once during research.' },
  { id: 's-gd', label: 'Glassdoor — salary pages', asOf: '2026-05', url: 'https://www.glassdoor.com/Salaries/',
    detail: 'Self-reported pay. The growth-engineer page is n=38, which is why it sits three times above every other source. Not independently re-checked: the pages return HTTP 403 to automated fetches, so these figures were read once during research.' },
  { id: 's-lev', label: 'Levels.fyi — title pages', asOf: '2026-09-14', url: 'https://www.levels.fyi/t/gtm-engineer',
    detail: 'Verified total compensation including equity. GTM Engineer page: 25th percentile 110,000, 75th 295,000, 90th 397,000.' },
  { id: 's-sal', label: 'Salary.com — posted-salary research', asOf: '2026-08-01', url: 'https://www.salary.com/',
    detail: 'Posting-derived ranges. The SEO-director figure on this source is dated July 2025.' },
  { id: 's-rh', label: 'Robert Half — 2026 salary guide and job pages', asOf: '2026',
    url: 'https://www.roberthalf.com/us/en/insights/research/data-reveals-which-marketing-and-creative-roles-are-in-highest-demand',
    detail: 'Staffing-firm placement data for marketing roles, plus the 2026 marketing hiring outlook.' },
  { id: 's-gtal', label: 'Growth.Talent — role guide', asOf: '2026', url: 'https://www.growthtalent.org/guides/role/growth-operations',
    detail: 'SaaS/growth-specific band for Growth Operations Manager, the closest tracked proxy title.' },
  { id: 's-afh', label: 'Agents for Hire — Revenue Operations Engineer salary, 2026', asOf: '2026',
    url: 'https://agentsforhire.ai/blog/revenue-operations-engineer-salary-in-2026-why-rev-ops-costs-100-k-150-k',
    detail: 'Mid-career band, plus a company-size premium: 100,000 median OTE under 50 employees against 162,000 at 1,000+.' },
  { id: 's-bloom', label: 'Bloomberry — 1,000 GTM Engineering job postings analysed', asOf: '2026-01-25',
    url: 'https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/',
    detail: 'Published 2025-10-03, updated 2026-01-25. Median from posting text; top named comp Vercel 252,000, OpenAI 250,000. SQL and Python each in 38% of postings.' },
  { id: 's-gtme', label: 'GTME Pulse — job-market analysis and Levels.fyi comparison', asOf: '2026-03',
    url: 'https://gtmepulse.com/insights/job-market-2026/',
    detail: 'Rome Thorndike, March 2026. Quoted as the page reads: postings grew 205% year over year from 2024 to 2025, and more than 3,000 GTM Engineer roles were open across major job boards as of March 2026. Re-checked against the live page on 14 September 2026.' },
  { id: 's-km', label: 'Kaleigh Moore — AEO Job Openings in 2026', asOf: '2026-07-06',
    url: 'https://www.kaleighmoore.com/blog/2026/7/6/ai-search-jobs',
    detail: '50+ named companies tracked with a dedicated AEO or AI-search role, with one manager-level posted band from Experian.' },
  { id: 's-sloane', label: 'Sloane Staffing — AEO/GEO Hiring in 2026', asOf: '2026-08-11',
    url: 'https://www.sloane-staffing.com/insights/aeo-geo-hiring-2026/',
    detail: 'Recruiter bands at specialist and senior-enterprise level, and the Conductor survey of 250+ CMOs it cites.' },
  { id: 's-sfh', label: 'SearchForHire — 328,650 marketing job postings analysed', asOf: '2026-07-15',
    url: 'https://www.searchforhire.com/blog/the-future-of-search-5-experts-and-328650-job-postings-on-what-happens-next/',
    detail: '328,650 marketing postings of 632,840 collected July 2025 to June 2026. Largest and most methodologically transparent study in this set.' },
  { id: 's-crmt', label: 'CRM Today — RevOps hiring write-up', asOf: '2026',
    url: 'https://crmtoday.news/industry/revops-fastest-growing-role',
    detail: 'Trade publisher, Marcus Veld, 27 June 2026. Listed only because its RevOps growth figure was withdrawn from this artifact: the article attributes it to a LinkedIn workforce report with no link and no methodology, and that dataset could not be reached.' },
  { id: 's-jpikr', label: 'JobsPikr — Data Engineer Demand Report 2026', asOf: '2026',
    url: 'https://www.jobspikr.com/blog/global-data-engineer-demand-2026/',
    detail: 'Growth figure covers data engineering as a whole, not the growth specialisation, so it is marked as a category figure.' },
  { id: 's-alm', label: 'ALM Corp, citing a Semrush analysis of 3,900 SEO job listings', asOf: '2026',
    url: 'https://almcorp.com/blog/seo-job-market-2026/',
    detail: 'Read from public third-party coverage of Semrush’s published analysis, not pulled from the Semrush API.' },
  { id: 's-peng', label: 'The Pragmatic Engineer — What is Growth Engineering?', asOf: '2025-03-20',
    url: 'https://newsletter.pragmaticengineer.com/p/what-is-growth-engineering',
    detail: 'Named primary interview. A fully-loaded growth team costs about 1,000,000 a year and needs 5,000,000+ ARR to justify.' },
  { id: 's-gtm8020', label: 'GTM 8020 — 28 RevOps statistics', asOf: '2026',
    url: 'https://www.gtm8020.com/blog/revops-statistics-revenue-operations-trends',
    detail: 'Projection that 75% of high-growth B2B organisations would have a dedicated RevOps function by end of 2025.' },
  { id: 's-kalungi', label: 'Kalungi — AI’s impact on marketing careers', asOf: '2026',
    url: 'https://www.kalungi.com/blog/ais-seismic-impact-on-marketing-careers',
    detail: 'Marketing-manager postings up 14% year over year while total marketing postings sit 27% below pre-pandemic levels.' },
];

/* Map a ledger salary-source string onto a short display name. */
const payName = (label) => {
  if (/GTME Pulse/i.test(label)) return 'GTME Pulse';
  if (/ZipRecruiter/i.test(label)) return 'ZipRecruiter';
  if (/Glassdoor/i.test(label)) return 'Glassdoor';
  if (/Levels\.fyi/i.test(label)) return 'Levels.fyi';
  if (/Bloomberry/i.test(label)) return 'Bloomberry';
  if (/Robert Half/i.test(label)) return 'Robert Half';
  if (/Salary aggregator|Salary\.com/i.test(label)) return 'Salary.com';
  if (/Growth\.Talent/i.test(label)) return 'Growth.Talent';
  if (/Agents for Hire/i.test(label)) return 'Agents for Hire';
  if (/Kaleigh Moore/i.test(label)) return 'Kaleigh Moore';
  if (/Sloane Staffing|Same two sources/i.test(label)) return 'Sloane Staffing';
  throw new Error(`Unmapped salary source: ${label}`);
};

/* ------------------------------------------------------------------ titles
   ledgerKey: the exact `title` string in the ledger.
   exactIdx / looseIdx: which postings row is the floor (SimplyHired exact phrase)
   and which is the ceiling (LinkedIn guest search).
   crown: line breaks for the curved crown plate (top line first).
   signal.face/sub: what ring 3 prints; `must` lists [trendIdx, substring] pairs
   that have to appear in the ledger text the face is quoting.
   section: the post's per-title <h2 id>, or the method section when the post
   has no section of its own for this title (the jump never leads nowhere). */
const METHOD = { anchor: 'how-to-read', label: 'Read how these were counted ↓' };
const TITLES = [
  {
    slug: 'director-of-seo', ledgerKey: 'Director of SEO', name: 'Director of SEO',
    crown: ['DIRECTOR OF SEO'], icon: 'seo', exactIdx: 0, looseIdx: 3, payBasis: 'title',
    section: { anchor: 'title-director-of-seo', label: 'Read the section: “The floor” ↓' },
    signal: { type: 'category', face: '20.3%', sub: 'OF ADS', trends: [1, 0], must: [[1, '12.2%'], [1, '20.3%']],
      rail: 'AI search in SEO ads: 12.2% → 20.3% · category' },
    reads: {
      jobs: 'Nineteen exact-phrase postings in the United States and none on Built In. LinkedIn’s figure for the same words is at least {gap} times larger.',
      pay: 'Two of the three sources publish a median, {spread} apart. Different populations under one label; neither is wrong.',
      signals: 'The strongest dated signal is about the category, not the title: SEO ads naming AI search went from 12.2% to 20.3% in six months.',
    },
  },
  {
    slug: 'head-of-aeo', ledgerKey: 'Head of AEO/GEO (AI Search Lead)', name: 'Head of AEO / GEO',
    crown: ['HEAD OF AEO / GEO'], icon: 'ai', exactIdx: 0, looseIdx: 1, payBasis: 'bands', mentions: true,
    section: { anchor: 'title-head-of-aeo', label: 'Read the section: “The payoff” ↓' },
    signal: { type: 'title', face: '720', sub: 'TITLES', trends: [1, 0, 2], must: [[1, '720'], [1, '28%'], [1, '15%']],
      rail: '720 AI-search titles in a year · 28% leadership' },
    reads: {
      jobs: 'The 435 counts postings where AEO and GEO both appear anywhere. It is not a title match, so it sits outside the wheel’s order as a mentions figure.',
      pay: 'This spread is seniority, not disagreement: {lo} is a specialist band and {hi} a senior-enterprise band, from the same recruiter on the same day.',
      signals: '720 postings carried AI search, GEO or AEO in the job title in twelve months, and 28% were leadership roles against 15% for standard SEO titles.',
    },
  },
  {
    slug: 'gtm-engineer', ledgerKey: 'GTM Engineer (Go-to-Market Engineer)', name: 'GTM Engineer',
    crown: ['GTM ENGINEER'], icon: 'gtm', exactIdx: 0, looseIdx: 2, payBasis: 'title',
    section: { anchor: 'title-gtm-engineer', label: 'Read the section: “The one that is actually growing” ↓' },
    signal: { type: 'title', face: '+205%', sub: '2025', trends: [1], mustOverride: ['205%'],
      override: [{ text: '“GTM Engineer job postings grew 205% year-over-year from 2024 to 2025.” “As of March 2026, there are more than 3,000 open GTM Engineer roles across major job boards.”',
        src: 'GTME Pulse, Rome Thorndike, March 2026 · quoted from the live page, re-checked 2026-09-14' }],
      rail: '+205% postings, 2024 → 2025 · on the title' },
    reads: {
      jobs: '146 exact-phrase postings, and a 1,000-posting study behind the definition: the best-documented title here.',
      pay: 'The medians sit {spread} apart and the tops {topSpread} apart: one source reads posting text, the other verified total compensation with equity.',
      signals: 'The only title here with a growth rate measured on the title itself and quotable from its live source.',
    },
  },
  {
    slug: 'growth-engineer', ledgerKey: 'Growth Engineer', name: 'Growth Engineer',
    crown: ['GROWTH ENGINEER'], icon: 'code', exactIdx: 0, looseIdx: 2, payBasis: 'title',
    section: { anchor: 'title-growth-engineer', label: 'Read the section: “The disagreement” ↓' },
    signal: { type: 'none', trends: [0, 1], rail: 'not measured · no dated figure for the title',
      note: 'No dated year-over-year posting figure for this title.' },
    reads: {
      jobs: 'Sixty-four exact-phrase postings, three on Built In: a well-known title with a small exact-phrase footprint.',
      pay: '{ratio} times between the lowest and highest published median. Glassdoor’s figure rests on 38 self-reported salaries; ZipRecruiter returns two different averages from two of its own URL slugs.',
      signals: 'No dated growth figure for the title. The discipline dates to Facebook’s 2007 growth team, and a fully-loaded team costs about $1M a year.',
    },
  },
  {
    slug: 'growth-marketing-manager', ledgerKey: 'Growth Marketing Manager', name: 'Growth Marketing Manager',
    crown: ['GROWTH MARKETING', 'MANAGER'], icon: 'megaphone', exactIdx: 0, looseIdx: 2, payBasis: 'title',
    section: METHOD,
    signal: { type: 'category', face: '+14%', sub: '2026', trends: [1, 0], must: [[1, '14%'], [1, '27%']],
      rail: '+14% marketing-manager ads, 2026 · category' },
    reads: {
      jobs: '239 exact-phrase postings, the most in the set: this is what a standard title looks like.',
      pay: 'Four sources, the most of any title here, and their published medians sit {spread} apart.',
      signals: 'Marketing-manager postings rose 14% year over year in 2026 while total marketing postings sat 27% below pre-pandemic levels. Category, not title.',
    },
  },
  {
    slug: 'growth-strategist', ledgerKey: 'Growth Strategist', name: 'Growth Strategist',
    crown: ['GROWTH STRATEGIST'], icon: 'compass', exactIdx: 0, looseIdx: 2, payBasis: 'title',
    section: METHOD,
    signal: { type: 'none', trends: [0], rail: 'not measured · no title-specific trend found',
      note: 'No title-specific trend article turned up in the research session.' },
    reads: {
      jobs: '108 exact-phrase postings, and one listing on Built In.',
      pay: 'Two sources, {spread} apart at the median, and Glassdoor’s 90th percentile reaches $302,964.',
      signals: 'No dated trend for this title. Strategist roles appear in 2026 demand coverage only as a category.',
    },
  },
  {
    slug: 'revops-engineer', ledgerKey: 'RevOps Engineer / Revenue Operations Engineer', name: 'RevOps Engineer',
    crown: ['REVOPS ENGINEER'], icon: 'funnel', exactIdx: 0, looseIdx: 2, payBasis: 'family',
    section: METHOD,
    signal: { type: 'pulled', trends: [1], rail: 'growth claim pulled · no reachable dataset',
      note: 'A widely repeated RevOps growth figure traces to one trade article (CRM Today, 27 June 2026) that cites a LinkedIn workforce report with no link and no methodology. The dataset could not be reached on 14 Sep 2026, so the figure is withdrawn here rather than shown with a caveat.' },
    reads: {
      jobs: 'One exact-phrase posting; three if RevOps Engineer counts as a spelling. The broad RevOps keyword is cited at 174,000+ on ZipRecruiter, via Fullcast, not independently confirmed.',
      pay: 'Both sources measure the RevOps family, not the engineer title, and their medians sit {spread} apart.',
      signals: 'The growth figure most often quoted for RevOps is withdrawn, not caveated: nothing behind it could be reached.',
    },
  },
  {
    slug: 'marketing-automation-engineer', ledgerKey: 'Marketing Automation Engineer', name: 'Marketing Automation Engineer',
    crown: ['MARKETING', 'AUTOMATION ENGINEER'], icon: 'loop', exactIdx: 0, looseIdx: 2, payBasis: 'title',
    section: METHOD,
    signal: { type: 'category', face: '+10%', sub: '2025', trends: [0], must: [[0, '10%'], [0, '36%'], [0, '78%']],
      rail: '~10% more automation ads, 2025 · category' },
    reads: {
      jobs: 'Six exact-phrase postings and zero on Built In.',
      pay: 'The rarest thing in this dataset: two salary sources that agree, {spread} apart at the median.',
      signals: 'Automation skills carried a 36% pay premium and 78% of marketing leaders say they pay more for AI skills. The premium is on the skill, not the title.',
    },
  },
  {
    slug: 'growth-ops-engineer', ledgerKey: 'Growth Operations Engineer', name: 'Growth Operations Engineer',
    crown: ['GROWTH OPERATIONS', 'ENGINEER'], icon: 'wrench', exactIdx: 0, looseIdx: 1, payBasis: 'proxy',
    section: { anchor: 'title-growth-ops-engineer', label: 'Read the section: “The zero” ↓' },
    signal: { type: 'none', trends: [0], rail: 'not measured · no postings to trend',
      note: 'No postings trend exists for a title with no postings.' },
    reads: {
      jobs: 'Zero. SimplyHired says so in a sentence, while LinkedIn shows 10,000+ for the same words on the same day.',
      pay: 'Neither figure is for this title: both are Growth Operations Manager, the closest title anyone tracks, and they sit {ratio} times apart at the median.',
      signals: 'The research notes call it job-description language, not a title people are hired under.',
    },
  },
  {
    slug: 'growth-data-engineer', ledgerKey: 'Data Engineer, Growth', name: 'Data Engineer, Growth',
    crown: ['DATA ENGINEER,', 'GROWTH'], icon: 'data', exactIdx: 0, looseIdx: 1, payBasis: 'proxy',
    section: METHOD,
    signal: { type: 'category', face: '+23%', sub: '2026', trends: [0], must: [[0, '23%'], [0, '260,000']],
      rail: '~23% growth, all data engineering · category' },
    reads: {
      jobs: 'One exact-phrase posting in the United States, a Senior Growth Data Engineer at Roblox. LinkedIn shows 11,000+: the widest measurable gap in the set.',
      pay: 'Neither number is growth-specific: one is the general data-engineer market, the other one company’s total compensation with equity. Shown to expose the proxy, not to price the job.',
      signals: 'Data engineering as a whole grew about 23% year over year. That is the occupation, not the growth specialisation.',
    },
  },
];

/* Ten hues, spectral, assigned by wheel position (clockwise from 12 o'clock). */
const HUES = ['#FF4747', '#FF8A00', '#FFB700', '#9BD600', '#1FC46E', '#0FBFB5', '#1E96FF', '#5A5CFF', '#9F4DFF', '#F03C9C'];

/* --------------------------------------------------------------- helpers */
const looseNum = (v) => {
  if (typeof v === 'number') return v;
  const m = String(v).replace(/,/g, '').match(/(\d+)/);
  if (!m) throw new Error(`Cannot read a count from: ${v}`);
  return Number(m[1]);
};
const money = n => `$${Number(n).toLocaleString('en-US')}`;
const pick = (arr, key, cmp) => arr.filter(x => x[key] != null).reduce((b, x) => (b == null || cmp(x[key], b[key]) ? x : b), null);
const cleanDate = d => String(d).replace(/\s*\(.*$/, '');
const cleanBoard = b => String(b).replace(/NOT exact-title/g, 'not exact-title');
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => { if (!(k in vars)) throw new Error(`no var ${k}`); return vars[k]; });
const problems = [];
const must = (cond, msg) => { if (!cond) problems.push(msg); };

/* ------------------------------------------------------------ assembly */
const out = [];
for (const t of TITLES) {
  const L = byTitle[t.ledgerKey];
  if (!L) throw new Error(`Ledger has no title: ${t.ledgerKey}`);

  /* ---- postings: floor = literal exact-phrase count, ceiling = LinkedIn placeholder */
  const exact = L.postings[t.exactIdx], loose = L.postings[t.looseIdx];
  must(/SimplyHired/.test(exact.board), `${t.slug}: floor row is not SimplyHired`);
  must(/LinkedIn \(guest search/.test(loose.board), `${t.slug}: ceiling row is not LinkedIn guest search`);
  const floor = looseNum(exact.count), ceiling = looseNum(loose.count);
  const ceilingText = `${ceiling.toLocaleString('en-US')}+`;
  const gap = floor > 0 ? ceiling / floor : null;
  const gapText = gap == null ? null : (gap >= 100 ? Math.round(gap).toLocaleString('en-US') : gap.toFixed(0));

  const TAGS = { floor: 'floor · exact phrase', mentions: 'mentions, not titles', ceiling: 'placeholder, not a count' };
  const rows = L.postings.map((p, i) => {
    const kind = i === t.exactIdx ? (t.mentions ? 'mentions' : 'floor') : i === t.looseIdx ? 'ceiling' : 'second';
    const count = typeof p.count === 'number' ? p.count.toLocaleString('en-US') : String(p.count);
    const mm = count.match(/^[\d,]+\+?/);
    return { kind, lead: mm ? mm[0] : '', rest: `${mm ? count.slice(mm[0].length) : count} — ${cleanBoard(p.board)} · ${p.query} · ${p.retrieved}`,
      tag: TAGS[kind] || null, note: p.note || null };
  });

  /* ---- pay: every published figure, never averaged */
  const pays = L.salary.map(s => ({ name: payName(s.source), label: s.source, low: s.low, median: s.median, high: s.high,
    date: cleanDate(s.date), url: s.url, notes: s.notes || '' }));
  const lo = pick(pays, 'median', (a, b) => a < b), hi = pick(pays, 'median', (a, b) => a > b);
  const topLo = pick(pays, 'high', (a, b) => a < b), topHi = pick(pays, 'high', (a, b) => a > b);
  must(lo && hi && lo !== hi, `${t.slug}: needs two published medians`);
  const ratio = hi.median / lo.median;
  const ratioText = ratio.toFixed(1);
  const k = v => String(Math.round(v / 1000));
  const payFlag = { title: '', proxy: 'proxy', family: 'family', bands: 'bands' }[t.payBasis];

  /* ---- ring 3: dated signal */
  const sig = t.signal;
  const trendRows = [];
  if (sig.override) for (const o of sig.override) trendRows.push({ kind: 'signal', text: o.text, when: o.src });
  for (const i of sig.trends) {
    const tr = L.trend[i];
    if (!tr) { problems.push(`${t.slug}: no trend row ${i}`); continue; }
    if (t.slug === 'gtm-engineer' && i === 0) continue;                 // stale paraphrase, replaced by the verbatim quote
    if (t.slug === 'revops-engineer' && i === 0) continue;              // withdrawn claim
    const flagged = /Conductor/.test(tr.source) ? ' Self-reported survey of marketing leaders, not a postings dataset.' : '';
    trendRows.push({ kind: 'signal', text: tr.claim + flagged, when: `${tr.source} · ${tr.date}` });
  }
  if (sig.note) trendRows.push({ kind: 'caveat', text: sig.note });
  for (const [i, s] of (sig.must || [])) must(String(L.trend[i]?.claim || '').includes(s), `${t.slug}: ring-3 caption quotes "${s}" but ledger trend[${i}] does not contain it`);
  for (const s of (sig.mustOverride || [])) must(sig.override.some(o => o.text.includes(s)), `${t.slug}: override lacks ${s}`);

  /* ---- readings: authored, with computed figures substituted in */
  const vars = {
    gap: gapText ?? '—', spread: money(hi.median - lo.median), ratio: ratioText, lo: money(lo.median), hi: money(hi.median),
    topSpread: money(topHi.high - topLo.high),
  };
  const reads = Object.fromEntries(Object.entries(t.reads).map(([kk, v]) => [kk, fill(v, vars)]));

  out.push({
    slug: t.slug, name: t.name, crown: t.crown, icon: t.icon,
    confidence: L.confidence, thin: L.confidence === 'low', mentions: !!t.mentions,
    definition: L.definition, definitionSource: L.definition_source.replace(/,?\s*https?:\/\/\S+/g, '').replace(/\s+,/g, ','),
    section: t.section,
    postings: {
      floor, ceiling, ceilingText, gap: gapText,
      face: t.mentions ? [floor.toLocaleString('en-US'), 'mentions'] : [floor.toLocaleString('en-US'), ceilingText],
      rail: t.mentions ? `${floor} mentions · ${ceilingText}` : `${floor.toLocaleString('en-US')} vs ${ceilingText}`,
      query: exact.query, rows,
    },
    pay: {
      lo: { v: lo.median, src: lo.name, date: lo.date }, hi: { v: hi.median, src: hi.name, date: hi.date },
      ratio: Number(ratioText), basis: t.payBasis,
      face: [`${ratioText}×`, `${k(lo.median)}–${k(hi.median)}`],
      rail: `${money(lo.median)}–${money(hi.median)} · ${ratioText}×${payFlag ? ` ${payFlag}` : ''}`,
      rows: pays.map(p => ({ name: p.name, label: p.label, low: p.low, median: p.median, high: p.high, date: p.date,
        notes: p.notes, role: p === lo ? 'floor' : p === hi ? 'ceiling' : '' })),
      caveat: { proxy: 'Both figures are proxies from an adjacent title. No pay data exists for this exact title.',
        family: 'Both figures measure the broader RevOps family, not the engineer title.',
        bands: 'Different seniority bands, so the spread is scope rather than disagreement.', title: '' }[t.payBasis],
    },
    signal: { type: sig.type, face: sig.face || null, sub: sig.sub || null, rail: sig.rail, rows: trendRows },
    employers: (L.employers || []).slice(0, 7),
    stack: (L.stack || []).slice(0, 8),
    reads,
  });
}

/* ---- wheel order: most exact-phrase postings first, clockwise from 12 o'clock.
   A mentions count cannot hold a rank against title counts, so it goes last.
   Ties break toward the better-documented title. */
const confRank = { high: 0, medium: 1, low: 2 };
out.sort((a, b) => (a.mentions - b.mentions) || (b.postings.floor - a.postings.floor) || (confRank[a.confidence] - confRank[b.confidence]));
out.forEach((t, i) => { t.hue = HUES[i]; t.pos = i; });

const DATA = {
  meta: {
    retrieved: RETRIEVED,
    liveUrl: 'mj2.pro/viz/growth-title-market/',
    headline: { floor: 0, ceiling: 10000, ceilingText: '10,000+', slug: 'growth-ops-engineer' },
    method: 'The floor is an exact-phrase search on SimplyHired, United States, run on 14 September 2026; a zero is a real zero. The ceiling is LinkedIn’s public guest search for the same words, which reports rounded placeholders such as 11,000+ and does not match on title, so every gap is a lower bound, not a measurement. Pay is the lowest and highest median any source publishes for the title: nothing is averaged, because the disagreement is the finding. Ring 1 bars are log scale (1 to 12,000 postings); ring 2 bars are linear ($40,000 to $480,000). Titles marked thin data have almost no exact-title postings, and their pay figures are proxies from an adjacent title. Head of AEO/GEO’s 435 counts postings that mention AEO and GEO anywhere, not titles, so it is held out of the wheel’s order. A RevOps growth figure in circulation was withdrawn: it traces to one trade article with no reachable dataset. No Google Trends data appears here: the page would not load during the research window.',
  },
  titles: out,
  sources: SOURCES,
};

/* ------------------------------------------------------------- validation */
const hl = out.find(t => t.slug === DATA.meta.headline.slug);
must(hl && hl.postings.floor === DATA.meta.headline.floor && hl.postings.ceiling === DATA.meta.headline.ceiling, 'headline no longer matches the ledger');
must(out.length === 10, 'expected ten titles');
must(new Set(out.map(t => t.hue)).size === 10, 'hues must be unique');
const json = JSON.stringify(DATA, null, 1);
must(!/127\s*%/.test(json), 'withdrawn RevOps figure leaked into the data');
must(!/1,400/.test(json), 'stale GTM "1,400" paraphrase leaked into the data');
if (problems.length) { console.error('DATA PROBLEMS:\n- ' + problems.join('\n- ')); process.exit(1); }

/* ------------------------------------------------------------------ output */
const block = json.replace(/<\//g, '<\\/');
const file = join(HERE, 'index.html');
const RE = /(<script type="application\/json" id="viz-data">)[\s\S]*?(<\/script>)/;
if (process.argv.includes('--inject')) {
  const html = readFileSync(file, 'utf8');
  if (!RE.test(html)) throw new Error('index.html has no #viz-data block');
  writeFileSync(file, html.replace(RE, (_, a, b) => `${a}\n${block}\n${b}`));
  console.error(`injected ${block.length} bytes into ${file}`);
} else if (process.argv.includes('--check')) {
  const cur = (readFileSync(file, 'utf8').match(RE) || [])[0] || '';
  const same = cur.includes(`\n${block}\n`);
  console.error(same ? 'viz-data matches the ledger' : 'viz-data has DRIFTED from the ledger: run --inject');
  if (!same) process.exit(1);
} else {
  process.stdout.write(`${json}\n`);
}
