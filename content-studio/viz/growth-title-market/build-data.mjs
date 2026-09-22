#!/usr/bin/env node
/**
 * Build the #viz-data block for the Growth Title Market artifact.
 *
 *   node build-data.mjs > data.viz.json
 *   node build-data.mjs --inject          # rewrite the #viz-data block in index.html
 *
 * Every NUMBER on the artifact is derived here from the research ledger at
 * content-studio/research/2026-09-14/titles/data.json. Nothing numeric is typed
 * by hand. Only the editorial strings (the one-line readings) are authored, and
 * each one restates a figure that this script also computes.
 *
 * Two readings per number, never an average:
 *   floor   = the strictest / lowest published figure
 *   ceiling = the loosest / highest published figure
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const LEDGER = resolve(here, '../../research/2026-09-14/titles/data.json');
const raw = JSON.parse(readFileSync(LEDGER, 'utf8'));
const byTitle = Object.fromEntries(Object.values(raw).map(t => [t.title, t]));

/* ------------------------------------------------------------------ sources */
const SOURCES = [
  { id: 's-sh', label: 'SimplyHired — exact-phrase US job search', asOf: '2026-09-14',
    url: 'https://www.simplyhired.com/', detail: 'Quoted phrase, location United States. Returns a literal count, including zero. This is the floor figure for every postings row.' },
  { id: 's-li', label: 'LinkedIn — public guest job search (loose keyword match)', asOf: '2026-09-14',
    url: 'https://www.linkedin.com/jobs/', detail: 'Not an exact-title count. Reports rounded ceilings such as 11,000+ for terms with near-zero exact-phrase results, so it is treated as a placeholder, not a measurement.' },
  { id: 's-bi', label: 'Built In — keyword job search', asOf: '2026-09-14',
    url: 'https://builtin.com/jobs', detail: 'Tech-company board. Used as a second literal count; several titles return zero here.' },
  { id: 's-zip', label: 'ZipRecruiter — salary pages', asOf: '2026-08',
    url: 'https://www.ziprecruiter.com/Salaries/', detail: 'National averages by title slug. Two different slugs for the same growth-engineer role return different averages; both are kept.' },
  { id: 's-gd', label: 'Glassdoor — salary pages', asOf: '2026-05',
    url: 'https://www.glassdoor.com/Salaries/', detail: 'Self-reported pay. The growth-engineer page is n=38, which is why it sits three times above every other source.' },
  { id: 's-lev', label: 'Levels.fyi — title pages', asOf: '2026-09-14',
    url: 'https://www.levels.fyi/t/gtm-engineer', detail: 'Verified total compensation including equity. GTM Engineer page shows 25th 110,000, 75th 295,000, 90th 397,000.' },
  { id: 's-sal', label: 'Salary.com — posted-salary research', asOf: '2026-08-01',
    url: 'https://www.salary.com/', detail: 'Posting-derived ranges. The SEO-director figure on this source is dated July 2025.' },
  { id: 's-rh', label: 'Robert Half — 2026 salary guide and job pages', asOf: '2026',
    url: 'https://www.roberthalf.com/us/en/insights/research/data-reveals-which-marketing-and-creative-roles-are-in-highest-demand', detail: 'Staffing-firm placement data for marketing roles, plus the 2026 marketing hiring outlook.' },
  { id: 's-gtal', label: 'Growth.Talent — role guide', asOf: '2026',
    url: 'https://www.growthtalent.org/guides/role/growth-operations', detail: 'SaaS/growth-specific band for Growth Operations Manager, used as the closest tracked proxy title.' },
  { id: 's-afh', label: 'Agents for Hire — Revenue Operations Engineer salary, 2026', asOf: '2026',
    url: 'https://agentsforhire.ai/blog/revenue-operations-engineer-salary-in-2026-why-rev-ops-costs-100-k-150-k', detail: 'Mid-career band, plus a company-size premium: 100,000 median OTE under 50 employees against 162,000 at 1,000+.' },
  { id: 's-bloom', label: 'Bloomberry — 1,000 GTM Engineering job postings analysed', asOf: '2026-01-25',
    url: 'https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/', detail: 'Published 2025-10-03, updated 2026-01-25. Median from posting text; top named comp Vercel 252,000, OpenAI 250,000. SQL and Python each in 38% of postings.' },
  { id: 's-gtme', label: 'GTME Pulse — job-market analysis and Levels.fyi comparison', asOf: '2026-03',
    url: 'https://gtmepulse.com/insights/job-market-2026/', detail: 'Rome Thorndike, March 2026. Quoted as the page reads: postings grew 205% year over year from 2024 to 2025, and more than 3,000 GTM Engineer roles were open across major job boards as of March 2026. Re-checked against the live page on 14 September 2026.' },
  { id: 's-km', label: 'Kaleigh Moore — AEO Job Openings in 2026', asOf: '2026-07-06',
    url: 'https://www.kaleighmoore.com/blog/2026/7/6/ai-search-jobs', detail: '50+ named companies tracked with a dedicated AEO or AI-search role, with one manager-level posted band from Experian.' },
  { id: 's-sloane', label: 'Sloane Staffing — AEO/GEO Hiring in 2026', asOf: '2026-08-11',
    url: 'https://www.sloane-staffing.com/insights/aeo-geo-hiring-2026/', detail: 'Recruiter bands at specialist and senior-enterprise level, and the Conductor survey of 250+ CMOs it cites.' },
  { id: 's-sfh', label: 'SearchForHire — 328,650 marketing job postings analysed', asOf: '2026-07-15',
    url: 'https://www.searchforhire.com/blog/the-future-of-search-5-experts-and-328650-job-postings-on-what-happens-next/', detail: '328,650 marketing postings of 632,840 collected July 2025 to June 2026. Largest and most methodologically transparent study in this set.' },
  { id: 's-crmt', label: 'CRM Today — RevOps hiring write-up', asOf: '2026',
    url: 'https://crmtoday.news/industry/revops-fastest-growing-role', detail: 'Trade publisher, Marcus Veld, 27 June 2026. Its 127% year-over-year claim is cited here only as the claim that was withdrawn: it attributes the figure to a LinkedIn workforce report with no link and no methodology, and that dataset could not be reached.' },
  { id: 's-jpikr', label: 'JobsPikr — Data Engineer Demand Report 2026', asOf: '2026',
    url: 'https://www.jobspikr.com/blog/global-data-engineer-demand-2026/', detail: 'Growth figure covers data engineering as a whole, not the growth specialisation, so it is marked as a proxy.' },
  { id: 's-alm', label: 'ALM Corp, citing a Semrush analysis of 3,900 SEO job listings', asOf: '2026',
    url: 'https://almcorp.com/blog/seo-job-market-2026/', detail: 'Read from public third-party coverage of Semrush’s published analysis, not pulled from the Semrush API.' },
  { id: 's-peng', label: 'The Pragmatic Engineer — What is Growth Engineering?', asOf: '2025-03-20',
    url: 'https://newsletter.pragmaticengineer.com/p/what-is-growth-engineering', detail: 'Named primary interview. A fully-loaded growth team costs about 1,000,000 a year and needs 5,000,000+ ARR to justify.' },
  { id: 's-gtm8020', label: 'GTM 8020 — 28 RevOps statistics', asOf: '2026',
    url: 'https://www.gtm8020.com/blog/revops-statistics-revenue-operations-trends', detail: 'Projection that 75% of high-growth B2B organisations would have a dedicated RevOps function by end of 2025.' },
  { id: 's-kalungi', label: 'Kalungi — AI’s impact on marketing careers', asOf: '2026',
    url: 'https://www.kalungi.com/blog/ais-seismic-impact-on-marketing-careers', detail: 'Marketing-manager postings up 14% year over year while total marketing postings sit 27% below pre-pandemic levels.' },
];
const SOURCE_IDS = new Set(SOURCES.map(s => s.id));

/* Map a research salary-source string onto a source id. */
const payId = (label) => {
  if (/GTME Pulse/i.test(label)) return 's-gtme';
  if (/ZipRecruiter/i.test(label)) return 's-zip';
  if (/Glassdoor/i.test(label)) return 's-gd';
  if (/Levels\.fyi/i.test(label)) return 's-lev';
  if (/Bloomberry/i.test(label)) return 's-bloom';
  if (/Robert Half/i.test(label)) return 's-rh';
  if (/Salary aggregator|Salary\.com/i.test(label)) return 's-sal';
  if (/Growth\.Talent/i.test(label)) return 's-gtal';
  if (/Agents for Hire/i.test(label)) return 's-afh';
  if (/Kaleigh Moore/i.test(label)) return 's-km';
  if (/Sloane Staffing|Same two sources/i.test(label)) return 's-sloane';
  throw new Error(`Unmapped salary source: ${label}`);
};
const shortOf = id => (SOURCES.find(s => s.id === id) || {}).label.split(' — ')[0];

/* ------------------------------------------------------------------ titles */
/* ledgerKey: the exact `title` string in the research ledger.
   exactBoard / looseBoard: which posting row supplies the floor and the ceiling.
   Editorial strings restate figures this script also computes. */
const TITLES = [
  {
    id: 'director-of-seo', label: 'Director of SEO', ledgerKey: 'Director of SEO',
    confidence: 'high', payBasis: 'title',
    exactIdx: 0, looseIdx: 3,
    momentum: null,
    momentumNote: 'No dated year-over-year posting figure exists for this title. What does exist is a share: 12.2% of SEO ads named AI search, GEO or AEO in December 2025, 20.3% by June 2026.',
    reads: {
      jobs: 'Nineteen exact-phrase postings in the whole United States, and zero on Built In. The title is 158 times rarer than the LinkedIn number for the same words implies.',
      pay: 'Two sources publish a median and they are 50,658 apart. Neither is wrong; they are counting different populations under one label.',
      signals: 'The strongest signal here is not about the title at all: it is the 20.5% pay premium on SEO postings that name AI search.',
    },
  },
  {
    id: 'head-of-aeo', label: 'Head of AEO / GEO', ledgerKey: 'Head of AEO/GEO (AI Search Lead)',
    confidence: 'medium', payBasis: 'seniority',
    caution: 'The floor for this title is a mentions count, not a title match: postings where AEO and GEO both appear anywhere. It is excluded from the postings ranking.',
    floorSub: 'Mentions count, not a title match. Not comparable with the other floors.',
    rankExclude: { postings: true, gap: true },
    exactIdx: 0, looseIdx: 1,
    momentum: null,
    momentumNote: 'No year-over-year figure. The dated measurement is a stock, not a rate: 720 postings in twelve months carry AI search, GEO or AEO in the job title.',
    reads: {
      jobs: 'The 435 is not a title count: it counts postings where AEO and GEO both appear anywhere. It is excluded from the ranking below for that reason, and it belongs beside the other floors only as a mentions figure.',
      pay: 'This spread is seniority, not disagreement. 85,000 is a specialist posting and 180,000 a senior enterprise band, published by the same recruiter on the same day.',
      signals: 'Fifty-plus named companies, 28% of new AI-search titles at Director level or above against 15% for standard SEO titles. Companies are hiring leaders into this, not juniors.',
    },
  },
  {
    id: 'gtm-engineer', label: 'GTM Engineer', ledgerKey: 'GTM Engineer (Go-to-Market Engineer)',
    confidence: 'high', payBasis: 'title',
    exactIdx: 0, looseIdx: 2,
    momentum: 205, momentumBasis: 'title', momentumSource: 's-gtme',
    momentumNote: 'The cited page states: \u201cGTM Engineer job postings grew 205% year-over-year from 2024 to 2025\u201d and \u201cAs of March 2026, there are more than 3,000 open GTM Engineer roles across major job boards.\u201d Re-checked against the live page on 14 Sep 2026.',
    trendOverride: [
      { text: '\u201cGTM Engineer job postings grew 205% year-over-year from 2024 to 2025.\u201d \u201cAs of March 2026, there are more than 3,000 open GTM Engineer roles across major job boards.\u201d', when: 'GTME Pulse, March 2026 \u00b7 quoted from the live page, re-checked 2026-09-14' },
      { text: '1,000 GTM Engineering postings analysed: average experience required 4.11 years, SQL and Python each in 38% of postings, Clay the most-cited tool.', when: 'Bloomberry \u00b7 2025-10-03, updated 2026-01-25' },
    ],
    reads: {
      jobs: 'The best-documented title in the set. 146 literal postings, and a thousand-posting study behind the definition, so the floor here means something.',
      pay: 'The two sources are 28,500 apart at the median and 145,000 apart at the top, because one measures posting text and the other measures verified total compensation with equity.',
      signals: 'The only title here with a dated growth rate measured on the title itself. Clay is the most-cited tool in the postings, ahead of HubSpot at 52%.',
    },
  },
  {
    id: 'growth-engineer', label: 'Growth Engineer', ledgerKey: 'Growth Engineer',
    confidence: 'medium', payBasis: 'title',
    exactIdx: 0, looseIdx: 2,
    momentum: null,
    momentumNote: 'No dated year-over-year posting figure for this title. The discipline itself is documented back to Facebook’s 2007 growth team.',
    reads: {
      jobs: 'Sixty-four literal postings, three on Built In. A well-known title with a small exact-phrase footprint.',
      pay: '3.5 times between the lowest and highest published median. Glassdoor’s average rests on 38 self-reported salaries; ZipRecruiter returns two different averages from two of its own URL slugs.',
      signals: 'A fully-loaded growth team runs about 1,000,000 a year and is not usually justified below 5,000,000 in recurring revenue. That is why the title is rarer than the discipline.',
    },
  },
  {
    id: 'growth-marketing-manager', label: 'Growth Marketing Manager', ledgerKey: 'Growth Marketing Manager',
    confidence: 'high', payBasis: 'title',
    exactIdx: 0, looseIdx: 2,
    momentum: 14, momentumBasis: 'proxy', momentumSource: 's-kalungi',
    momentumNote: 'Marketing-manager postings overall were up 14% year over year in 2026, while total marketing postings sat 27% below pre-pandemic levels. Category, not title.',
    reads: {
      jobs: 'The highest literal count in the set: 239 exact-phrase postings. This is what a genuinely standard title looks like.',
      pay: 'Four independent sources, and they agree more closely than any other title here: 18,199 between the lowest and highest published median.',
      signals: 'A bifurcated market. Senior and strategic marketing roles hold; execution roles decline. The title survives because it reads as the senior one.',
    },
  },
  {
    id: 'growth-strategist', label: 'Growth Strategist', ledgerKey: 'Growth Strategist',
    confidence: 'medium', payBasis: 'title',
    exactIdx: 0, looseIdx: 2,
    momentum: null,
    momentumNote: 'No title-specific trend article was found in this research session. Strategist roles appear in 2026 demand coverage only as a category.',
    reads: {
      jobs: 'A healthy 108 exact-phrase postings, but only one listing on Built In. Steady demand, not a surge.',
      pay: 'Two sources, 25,687 apart at the median, and Glassdoor’s 90th percentile reaches 302,964. The top of this title is far above its middle.',
      signals: 'The one title here with no dated momentum figure at all. Established, not emerging: the opposite pattern to GTM Engineer.',
    },
  },
  {
    id: 'revops-engineer', label: 'RevOps Engineer', ledgerKey: 'RevOps Engineer / Revenue Operations Engineer',
    confidence: 'medium', payBasis: 'family',
    exactIdx: 0, looseIdx: 2,
    momentum: null,
    momentumNote: 'No growth figure is shown. A 127% year-over-year claim is in circulation; it traces to one trade article (CRM Today, 27 June 2026), which attributes it to a LinkedIn workforce report with no link and no methodology. The underlying dataset could not be reached on 14 Sep 2026, so the figure is withdrawn from this artifact rather than shown with a caveat.',
    trendOverride: [
      { text: 'By the end of 2025, 75% of high-growth B2B organisations were projected to have a dedicated RevOps function in place.', when: 'GTM 8020 \u00b7 2026' },
    ],
    reads: {
      jobs: 'One exact-phrase posting. Three if RevOps Engineer is allowed as an alternate spelling. The umbrella term is where the hiring actually happens.',
      pay: 'Both sources measure the RevOps family rather than the engineer title, and they land 15,000 apart at the median. Unusually close, because neither is measuring the rare thing.',
      signals: 'The broad RevOps keyword returns a figure around 174,000 on ZipRecruiter. Same work, same day, roughly fifty thousand times the exact-title count.',
      // kept for reference; the signals question was removed, this text is unused
    },
  },
  {
    id: 'marketing-automation-engineer', label: 'Marketing Automation Engineer', ledgerKey: 'Marketing Automation Engineer',
    confidence: 'medium', payBasis: 'title',
    exactIdx: 0, looseIdx: 2,
    momentum: 10, momentumBasis: 'proxy', momentumSource: 's-rh',
    momentumNote: 'Roughly 10% year-over-year growth across 2025 for marketing-automation manager and engineer-adjacent postings. Category, not title.',
    reads: {
      jobs: 'Six exact-phrase postings and zero on Built In. The work is common; this spelling of it is not. Manager and Specialist are where it gets posted.',
      pay: 'The rarest thing in this dataset: two salary sources that agree. 9,374 apart at the median, under 10%.',
      signals: 'Automation skills carried a 36% pay premium and 78% of marketing leaders said they pay more for AI skills. The premium is on the skill, not the title.',
    },
  },
  {
    id: 'growth-ops-engineer', label: 'Growth Operations Engineer', ledgerKey: 'Growth Operations Engineer',
    confidence: 'low', payBasis: 'proxy',
    exactIdx: 0, looseIdx: 1,
    momentum: null,
    momentumNote: 'No postings trend exists for a title with no postings. Career-path guides place Head of Growth Ops and Head of RevOps as the usual next step.',
    reads: {
      jobs: 'Zero. SimplyHired returns the sentence in full: we could not find any growth operations engineer jobs in United States. LinkedIn shows 10,000+ for the same words on the same day.',
      pay: 'Neither figure is for this title. Both are Growth Operations Manager, the closest thing anyone tracks, and they are almost twice apart at the median.',
      signals: 'This is job-description language, not a title people are hired under. Useful to describe work; costly to put on a resume.',
    },
  },
  {
    id: 'growth-data-engineer', label: 'Data Engineer, Growth', ledgerKey: 'Data Engineer, Growth',
    confidence: 'low', payBasis: 'proxy',
    exactIdx: 0, looseIdx: 1,
    momentum: 23, momentumBasis: 'proxy', momentumSource: 's-jpikr',
    momentumNote: 'Data-engineering roles grew about 23% year over year with an estimated 260,000 open US positions. That is the whole occupation, not the growth specialisation.',
    reads: {
      jobs: 'One posting in the country, a Senior Growth Data Engineer at Roblox. LinkedIn claims 11,000+ for the same three words: the widest measurable gap in the set.',
      pay: 'Neither number is growth-specific. One is the general data-engineer market, the other is one company’s total compensation with equity. Shown to expose the proxy, not to price the job.',
      signals: 'An internal specialisation inside larger data organisations, not a job-market category. Real-time and streaming skills are where the pay is moving.',
    },
  },
];

/* --------------------------------------------------------------- helpers */
const looseNum = (v) => {
  if (typeof v === 'number') return v;
  const m = String(v).replace(/,/g, '').match(/(\d+)/);
  if (!m) throw new Error(`Cannot read a count from: ${v}`);
  return Number(m[1]);
};
const money = n => `$${Number(n).toLocaleString('en-US')}`;
const pick = (arr, key, cmp) => arr.filter(x => x[key] != null)
  .reduce((best, x) => (best == null || cmp(x[key], best[key]) ? x : best), null);

/* ------------------------------------------------------------ assembly */
const values = {};
const cellSources = {};
const serp = {};
const rankValues = {};
const rankFlags = {};
const rankExclude = {};
const audit = [];

/* Two questions, because two questions have a floor and a ceiling for all ten
   titles. There is no per-title pair for the dated signals — some titles have a
   growth rate measured on the title, most have none at all — so "where is it
   heading" is not offered as a measurement. The signals themselves stay on the
   artifact, in the evidence lane, under both questions. */
const LENSES = [
  { id: 'jobs', label: 'how many jobs exist' },
  { id: 'pay', label: 'what it pays' },
];

for (const t of TITLES) {
  const L = byTitle[t.ledgerKey];
  if (!L) throw new Error(`Ledger has no title: ${t.ledgerKey}`);

  /* ---- postings: floor = literal exact-phrase count, ceiling = loose keyword count */
  const exact = L.postings[t.exactIdx];
  const loose = L.postings[t.looseIdx];
  if (!/SimplyHired/.test(exact.board)) throw new Error(`${t.id}: floor row is not SimplyHired`);
  if (!/LinkedIn/.test(loose.board)) throw new Error(`${t.id}: ceiling row is not LinkedIn`);
  const exactN = looseNum(exact.count);
  const looseN = looseNum(loose.count);
  const builtIn = L.postings.find(p => /Built In/.test(p.board));

  /* ---- pay: every published figure, normalised, never averaged */
  const pays = L.salary.map(s => ({
    id: payId(s.source), label: s.source, low: s.low, median: s.median, high: s.high,
    date: String(s.date).replace(/\s*\(.*$/, ''), url: s.url, notes: s.notes,
  }));
  const minMed = pick(pays, 'median', (a, b) => a < b);
  const maxMed = pick(pays, 'median', (a, b) => a > b);
  const minHigh = pick(pays, 'high', (a, b) => a < b);
  const maxHigh = pick(pays, 'high', (a, b) => a > b);
  const minLow = pick(pays, 'low', (a, b) => a < b);
  if (!minMed || !maxMed || !minHigh || !maxHigh || !minLow) throw new Error(`${t.id}: incomplete pay data`);

  const block = {
    postings: [exactN, looseN],
    pay_med: [minMed.median, maxMed.median],
    pay_top: [minHigh.high, maxHigh.high],
    pay_band: [minLow.low, maxHigh.high],
  };
  values[t.id] = Object.fromEntries(LENSES.map(l => [l.id, block]));
  cellSources[t.id] = {
    postings: ['s-sh', 's-li'],
    pay_med: [minMed.id, maxMed.id],
    pay_top: [minHigh.id, maxHigh.id],
    pay_band: [minLow.id, maxHigh.id],
  };

  /* ---- rank lane */
  rankValues[t.id] = {
    postings: exactN,
    pay_med: [minMed.median, maxMed.median],
    gap: exactN === 0 ? null : Number((looseN / exactN).toFixed(looseN / exactN >= 100 ? 0 : 1)),
    momentum: t.momentum,
  };
  rankFlags[t.id] = {
    postings: exactN === 0 ? 'zero' : (t.rankExclude?.postings ? 'mentions' : ''),
    pay_med: t.payBasis === 'title' ? '' : (t.payBasis === 'seniority' ? 'bands' : 'proxy'),
    gap: exactN === 0 ? 'nofloor' : (t.rankExclude?.gap ? 'mentions' : ''),
    momentum: t.momentum == null ? 'none' : (t.momentumBasis === 'title' ? '' : t.momentumBasis),
  };
  /* A count that is not a title match cannot hold a rank position against ones
     that are, so it is shown out of the order rather than deleted. */
  if (t.rankExclude) rankExclude[t.id] = { ...t.rankExclude };

  /* ---- evidence lane: jobs */
  const jobRows = [
    { kind: 'floor', text: `<b>${exactN.toLocaleString('en-US')}</b> — SimplyHired, ${esc(exact.query)}` },
    { kind: 'ceiling', text: `<b>${looseN.toLocaleString('en-US')}+</b> — LinkedIn public guest search, ${esc(loose.query)}. Rounded, loose keyword match.` },
  ];
  if (builtIn) jobRows.push({ kind: 'second', text: `<b>${esc(String(builtIn.count))}</b> — Built In, ${esc(builtIn.query)}` });
  if (exact.note) jobRows.push({ kind: 'caveat', text: esc(exact.note) });
  if (t.id === 'head-of-aeo') jobRows.push({ kind: 'caveat', text: 'The floor here is a co-occurrence count for AEO and GEO anywhere in the posting, not an exact-title match.' });
  if (t.id === 'revops-engineer') jobRows.push({ kind: 'second', text: '<b>3</b> — SimplyHired, revenue operations engineer OR revops engineer' });
  if (t.id === 'director-of-seo') jobRows.push({ kind: 'second', text: '<b>74</b> — LinkedIn topic page, head of seo jobs in United States. Tighter and more credible than the same board’s guest-search figure.' });

  /* ---- evidence lane: pay */
  const payRows = pays.map(p => ({
    kind: 'source',
    text: `<b>${shortOf(p.id)}</b> — ${[p.low && money(p.low), p.median && money(p.median), p.high && money(p.high)].filter(Boolean).join(' / ')}` +
      ` <span class="sr-when">${esc(p.date)}</span>`,
  }));
  if (t.payBasis === 'proxy') payRows.push({ kind: 'caveat', text: 'Both figures are proxies from an adjacent title. No pay data exists for this exact title.' });
  if (t.payBasis === 'family') payRows.push({ kind: 'caveat', text: 'Both figures measure the broader RevOps family, not the engineer title.' });
  if (t.payBasis === 'seniority') payRows.push({ kind: 'caveat', text: 'These are different seniority bands from two publishers, so the spread is scope rather than disagreement.' });
  payRows.push({ kind: 'method', text: 'Low / median / high as published. Nothing here is averaged across sources.' });

  /* ---- dated signals, shown under both questions.
     `trendOverride` replaces the ledger paraphrase where the live source has
     since been re-read and must be quoted as it reads today. */
  const sigRows = [];
  if (t.trendOverride) {
    for (const tr of t.trendOverride) sigRows.push({ kind: 'signal', text: `${esc(tr.text)} <span class="sr-when">${esc(tr.when)}</span>` });
  } else {
    for (const tr of (L.trend || []).slice(0, 2)) {
      sigRows.push({ kind: 'signal', text: `${esc(condense(tr.claim))} <span class="sr-when">${esc(tr.source)} · ${esc(tr.date)}</span>` });
    }
  }
  if (t.momentum == null) sigRows.push({ kind: 'caveat', text: esc(t.momentumNote) });
  if ((L.employers || []).length) sigRows.push({ kind: 'named', text: `<b>Hiring under this title:</b> ${esc(L.employers.slice(0, 6).join(', '))}` });
  if ((L.stack || []).length) sigRows.push({ kind: 'stack', text: `<b>Stack named in postings:</b> ${esc(L.stack.slice(0, 7).join(', '))}` });

  const payDates = [...new Set(pays.map(p => p.date))].sort();
  serp[t.id] = {
    jobs: {
      head: 'Every board count, how it was counted, and what else is dated',
      query: `${exact.query} · retrieved 2026-09-14`,
      note: t.reads.jobs, rows: [...jobRows, ...sigRows],
    },
    pay: {
      head: 'Every published pay figure, side by side, and what else is dated',
      query: `${pays.length} published sources · ${payDates[0]}${payDates.length > 1 ? ` to ${payDates[payDates.length - 1]}` : ''} · no average taken`,
      note: t.reads.pay, rows: [...payRows, ...sigRows],
    },
  };

  audit.push({
    title: t.label, confidence: t.confidence,
    postings: `${exactN} vs ${looseN}+`,
    gap: exactN === 0 ? 'no floor' : `${(looseN / exactN).toFixed(0)}x`,
    median: `${money(minMed.median)} (${minMed.id}) – ${money(maxMed.median)} (${maxMed.id}) = ${(maxMed.median / minMed.median).toFixed(1)}x`,
    top: `${money(minHigh.high)} – ${money(maxHigh.high)} = ${(maxHigh.high / minHigh.high).toFixed(1)}x`,
    band: `${money(minLow.low)} – ${money(maxHigh.high)} = ${(maxHigh.high / minLow.low).toFixed(1)}x`,
    momentum: t.momentum == null ? '—' : `${t.momentum}% (${t.momentumBasis})`,
  });
}

function condense(s) {
  const one = String(s).split(/(?<=[.;])\s+/)[0];
  return one.length > 190 ? `${one.slice(0, 187)}…` : one;
}
function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* -------------------------------------------------------------- the block */
const DATA = {
  meta: {
    sample: false,
    seed: 20260914,
    palette: 'aurora',
    eyebrow: 'Living infographic · Job-title market · 14 September 2026',
    title: 'Ten job titles. Every number here has {lit}two right answers{/lit}.',
    deck: 'One US market, counted twice on the same day. The floor is what a board returns for the exact phrase. The ceiling is what a loose keyword search claims, or the most generous figure any salary source publishes. Pick a title, pick a question, and read the distance between them.',
    askPrefix: 'What happens to',
    askMiddle: 'when you ask',
    askSuffix: '?',
    columns: {
      cited: { name: 'The floor', sub: 'Strictest count. Lowest published figure.' },
      absent: { name: 'The ceiling', sub: 'Loosest count. Highest published figure.' },
    },
    hero: { jobs: 'postings', pay: 'pay_med' },
    deltaLabel: 'apart',
    byline: 'Mitchell Miller · mitchjmiller.com',
    liveUrl: 'mitchjmiller.com/viz/growth-title-market/',
    method: '<b>How these numbers were counted.</b> The floor is an exact-phrase search run on 14 September 2026; a zero is a real zero. The ceiling for postings is LinkedIn’s public guest search for the same words, which reports rounded placeholders such as 11,000+ and does not match on title, so every gap shown is a lower bound rather than a measurement. Pay figures are the lowest and highest published by any source for that title: nothing is averaged, because the disagreement is the finding. Titles marked <b>thin data</b> have almost no exact-title postings, and their pay figures are proxies from an adjacent title. No Google Trends data appears anywhere on this artifact: the page would not load.',
    gifNote: 'Rudimentary GIF of a living artifact.',
    gifNoteSub: 'The living version switches all ten titles, opens every board count and pay source, and dates each one: mitchjmiller.com/viz/growth-title-market/',
  },

  dimensions: {
    vertical: {
      label: 'job title',
      options: TITLES.map(t => ({
        id: t.id,
        label: t.confidence === 'low' ? `${t.label} · thin` : t.label,
        plain: t.label,
        confidence: t.confidence,
        ...(t.caution ? { caution: t.caution } : {}),
        ...(t.floorSub ? { floorSub: t.floorSub } : {}),
      })),
    },
    intent: { label: 'question', options: LENSES.map(l => ({ id: l.id, label: l.label })) },
  },

  confidence: {
    high: { label: 'Well documented', note: 'Multiple dated sources that agree in direction, or one large primary study.' },
    medium: { label: 'Mixed evidence', note: 'Sources exist but disagree on magnitude, or the title is too new to be standardised.' },
    low: { label: 'Thin data', note: 'Almost no exact-title postings exist. Pay figures are proxies from an adjacent title.' },
  },

  prompts: [
    { label: 'Which title returns zero postings?', set: { vertical: 'growth-ops-engineer', intent: 'jobs' } },
    { label: 'Where do two salary sources disagree by 3.5×?', set: { vertical: 'growth-engineer', intent: 'pay' } },
    { label: 'What happens to pay when the title says AI search?', set: { vertical: 'head-of-aeo', intent: 'pay' } },
    { label: 'Which title is actually growing, with a date on it?', set: { vertical: 'gtm-engineer', intent: 'jobs' } },
    { label: 'What does Director of SEO really return?', set: { vertical: 'director-of-seo', intent: 'jobs' } },
  ],

  metrics: {
    jobs: [
    { id: 'postings', label: 'US postings found on 14 Sep 2026', note: 'Exact phrase on SimplyHired against LinkedIn’s loose keyword search for the same words. Only the floor is an exact-title count.', unit: '', unitB: '+', decimals: 0, better: 'higher', source: 's-sh' },
    ],
    pay: [
    { id: 'pay_med', label: 'Median pay, as published', note: 'Lowest and highest median any source publishes for this title. Not averaged.', unit: '$', prefix: true, decimals: 0, better: 'higher', source: 's-zip' },
    { id: 'pay_top', label: 'Top of the range, as published', note: 'The two sources disagree about the ceiling as well as the middle.', unit: '$', prefix: true, decimals: 0, better: 'higher', source: 's-zip' },
    { id: 'pay_band', label: 'The whole published band, end to end', note: 'Lowest figure anyone publishes to the highest figure anyone publishes.', unit: '$', prefix: true, decimals: 0, better: 'higher', source: 's-zip' },
    ],
  },

  values,
  cellSources,
  serp,

  rank: {
    title: 'Rank all ten titles by',
    metrics: [
      { id: 'postings', label: 'Postings that exist', unit: '', decimals: 0, source: 's-sh',
        note: 'Exact-phrase US postings on SimplyHired, 14 Sep 2026. A zero is a real zero.' },
      { id: 'pay_med', label: 'Median pay, published range', unit: '$', prefix: true, decimals: 0, range: true, source: 's-zip',
        note: 'Each bar spans the lowest to the highest median published for that title. Sorted by the high end. Bars marked proxy use an adjacent title; bands means two seniority levels, not a disagreement.' },
      { id: 'momentum', label: 'Year-over-year growth', unit: '%', decimals: 0, source: 's-gtme',
        note: 'Only one title in this set has a dated growth rate measured on the title itself and quotable from its live source. Six have none at all, and three of the rest are category figures, marked proxy. A RevOps figure in circulation was withdrawn: it traces to one trade article with no reachable dataset.' },
      { id: 'gap', label: 'Gap between the two counts', unit: '×', decimals: 1, source: 's-li',
        note: 'LinkedIn’s rounded keyword count divided by the exact-phrase count. Because the LinkedIn figure is a rounded ceiling, each ratio is a lower bound.' },
    ],
    values: rankValues,
    flags: rankFlags,
    exclude: rankExclude,
    flagText: {
      proxy: 'proxy', bands: 'bands', family: 'family', none: 'no dated figure',
      zero: 'zero', nofloor: 'no floor', mentions: 'mentions, not titles',
    },
  },

  sources: SOURCES,
};

/* ------------------------------------------------------------- validation */
const problems = [];
const ALL_METRICS = Object.values(DATA.metrics).flat();
for (const m of ALL_METRICS) if (!SOURCE_IDS.has(m.source)) problems.push(`metric ${m.id} source ${m.source}`);
for (const l of LENSES) {
  if (!(DATA.metrics[l.id] || []).length) problems.push(`no metrics for question ${l.id}`);
  if (!DATA.meta.hero[l.id]) problems.push(`no hero for question ${l.id}`);
  if (!(DATA.metrics[l.id] || []).some(m => m.id === DATA.meta.hero[l.id])) problems.push(`hero ${DATA.meta.hero[l.id]} not in question ${l.id}`);
}
for (const p of DATA.prompts) if (p.set.intent && !LENSES.some(l => l.id === p.set.intent)) problems.push(`prompt points at removed question ${p.set.intent}`);
for (const [t, mm] of Object.entries(cellSources)) for (const [k, ids] of Object.entries(mm))
  for (const id of ids) if (!SOURCE_IDS.has(id)) problems.push(`cellSource ${t}.${k} ${id}`);
for (const t of TITLES) for (const l of LENSES) {
  if (!values[t.id]?.[l.id]) problems.push(`values ${t.id}.${l.id}`);
  if (!serp[t.id]?.[l.id]) problems.push(`serp ${t.id}.${l.id}`);
  for (const m of (DATA.metrics[l.id] || [])) if (!Array.isArray(values[t.id][l.id][m.id])) problems.push(`values ${t.id}.${l.id}.${m.id}`);
}
for (const s of SOURCES) if (!s.asOf) problems.push(`source ${s.id} has no asOf`);
if (problems.length) { console.error('DATA PROBLEMS:\n- ' + problems.join('\n- ')); process.exit(1); }

/* ------------------------------------------------------------------ output */
const json = JSON.stringify(DATA, null, 2);
if (process.argv.includes('--inject')) {
  const file = join(here, 'index.html');
  const html = readFileSync(file, 'utf8');
  const re = /(<script type="application\/json" id="viz-data">)[\s\S]*?(<\/script>)/;
  if (!re.test(html)) throw new Error('index.html has no #viz-data block');
  writeFileSync(file, html.replace(re, (_, a, b) => `${a}\n${json}\n${b}`));
  console.error(`injected ${json.length} bytes of data into ${file}`);
} else if (process.argv.includes('--audit')) {
  console.error(JSON.stringify(audit, null, 1));
} else {
  process.stdout.write(`${json}\n`);
}
