/**
 * Population workbench model — pure functions, no DOM, no network.
 *
 * Runs in three places with identical results: the Astro build (baseline
 * numbers rendered into static HTML), the browser island, and the Node
 * verification script. Keep it free of side effects and non-erasable
 * TypeScript syntax (no enums, no parameter properties).
 *
 * Value provenance labels used throughout the UI and exports:
 *   observed   — read directly from a Census microdata record
 *   calculated — arithmetic on observed records and their survey weights
 *   simulated  — output of the UBI policy model applied to the records
 *   assumed    — a number the user typed in
 *   estimate   — arithmetic on assumed numbers; not a forecast
 */
import { simulate, type UbiMeta, type UbiParams, type UbiResult, type UbiSample } from './ubi';

export type { UbiMeta, UbiParams, UbiResult, UbiSample };
export { simulate };

export const MODEL_VERSION = '1.0.0';
export const DATA_SOURCE = 'U.S. Census Bureau, 2019 ACS 1-Year PUMS, California person records (public domain)';

export const DISCLAIMERS = {
  personas: 'Synthetic composites drawn from Census microdata. Not real people.',
  reach: 'Assumption-driven estimate, not a forecast.',
  ubi: 'Model output on a weighted Census sample. Illustrative, not a fiscal forecast; poverty uses a personal-income proxy, not the official household measure.',
  sample: 'A 12,000-record weighted sample of the 380,091 California person records in the 2019 ACS 1-Year PUMS. Identical logic to the full-data model; aggregates are near-identical, not exact.',
} as const;

/* ------------------------------------------------------------------ */
/* Population                                                          */
/* ------------------------------------------------------------------ */

export interface Population {
  n: number;
  /** Per-record survey weight (persons represented). */
  weight: number[];
  age: number[];
  income: number[];
  sex: string[];
  race: string[];
  education: string[];
  employment: string[];
  /** Sum of all weights. */
  totalWeight: number;
}

/** Build a Population from the columnar sample file. */
export function fromSample(sample: UbiSample): Population {
  const n = sample.age.length;
  const weight = new Array<number>(n).fill(sample.scaledWeight);
  return {
    n,
    weight,
    age: sample.age,
    income: sample.income,
    sex: sample.sex,
    race: sample.race,
    education: sample.education,
    employment: sample.employment,
    totalWeight: n * sample.scaledWeight,
  };
}

export interface Band { label: string; min: number; max: number; }

/** Personal income bands (annual, dollars). min inclusive, max exclusive. */
export const INCOME_BANDS: Band[] = [
  { label: '$0 or less', min: -Infinity, max: 1 },
  { label: '$1–$14,999', min: 1, max: 15000 },
  { label: '$15,000–$29,999', min: 15000, max: 30000 },
  { label: '$30,000–$49,999', min: 30000, max: 50000 },
  { label: '$50,000–$74,999', min: 50000, max: 75000 },
  { label: '$75,000–$99,999', min: 75000, max: 100000 },
  { label: '$100,000–$149,999', min: 100000, max: 150000 },
  { label: '$150,000 or more', min: 150000, max: Infinity },
];

/** Age groups, matching the UBI model's grouping. min/max inclusive. */
export const AGE_GROUPS: Band[] = [
  { label: 'Under 18', min: 0, max: 17 },
  { label: '18–24', min: 18, max: 24 },
  { label: '25–34', min: 25, max: 34 },
  { label: '35–44', min: 35, max: 44 },
  { label: '45–54', min: 45, max: 54 },
  { label: '55–64', min: 55, max: 64 },
  { label: '65+', min: 65, max: 200 },
];

export const EDUCATION_LEVELS = ['N/A (under 3 yrs)', 'No HS diploma', 'High school', 'Some college / Associate', "Bachelor's", 'Graduate degree'];
export const EMPLOYMENT_STATUSES = ['Employed', 'Unemployed', 'Armed forces', 'Not in labor force', 'Under 16'];
export const SEXES = ['Female', 'Male'];
export const RACES = ['American Indian / Alaska Native', 'Asian', 'Black', 'Native Hawaiian / Pacific Islander', 'Other race', 'Two or more races', 'White'];

export function incomeBandOf(income: number): string {
  for (const b of INCOME_BANDS) if (income >= b.min && income < b.max) return b.label;
  return INCOME_BANDS[INCOME_BANDS.length - 1].label;
}

export function ageGroupOf(age: number): string {
  for (const g of AGE_GROUPS) if (age >= g.min && age <= g.max) return g.label;
  return AGE_GROUPS[AGE_GROUPS.length - 1].label;
}

/* ------------------------------------------------------------------ */
/* Filters                                                             */
/* ------------------------------------------------------------------ */

export interface Filters {
  ageMin: number;
  ageMax: number;
  /** Selected income band labels; empty = all. */
  incomeBands: string[];
  education: string[];
  employment: string[];
  sex: string[];
  race: string[];
}

export const DEFAULT_FILTERS: Filters = {
  ageMin: 0,
  ageMax: 94,
  incomeBands: [],
  education: [],
  employment: [],
  sex: [],
  race: [],
};

/** Indices of records passing every filter. Empty category lists mean "any". */
export function filterPopulation(pop: Population, f: Filters): number[] {
  const bands = f.incomeBands.length ? new Set(f.incomeBands) : null;
  const edu = f.education.length ? new Set(f.education) : null;
  const emp = f.employment.length ? new Set(f.employment) : null;
  const sex = f.sex.length ? new Set(f.sex) : null;
  const race = f.race.length ? new Set(f.race) : null;
  const out: number[] = [];
  for (let i = 0; i < pop.n; i++) {
    const age = pop.age[i];
    if (age < f.ageMin || age > f.ageMax) continue;
    if (bands && !bands.has(incomeBandOf(pop.income[i]))) continue;
    if (edu && !edu.has(pop.education[i])) continue;
    if (emp && !emp.has(pop.employment[i])) continue;
    if (sex && !sex.has(pop.sex[i])) continue;
    if (race && !race.has(pop.race[i])) continue;
    out.push(i);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Weighted summary                                                    */
/* ------------------------------------------------------------------ */

export interface ShareRow { label: string; people: number; share: number; }

export interface Summary {
  /** observed: number of microdata records in the selection */
  records: number;
  /** calculated: persons represented (sum of weights) */
  people: number;
  /** calculated: people / total California weight */
  shareOfCalifornia: number;
  /** calculated: weighted mean personal income */
  meanIncome: number;
  /** calculated: weighted median personal income */
  medianIncome: number;
  /** calculated: weighted mean age */
  meanAge: number;
  ageHistogram: ShareRow[];
  incomeHistogram: ShareRow[];
  educationShares: ShareRow[];
  employmentShares: ShareRow[];
  sexShares: ShareRow[];
  raceShares: ShareRow[];
}

export function weightedMedian(values: number[], weights: number[]): number {
  if (values.length === 0) return 0;
  const order = values.map((_, i) => i).sort((a, b) => values[a] - values[b]);
  let total = 0;
  for (const w of weights) total += w;
  let cum = 0;
  for (const i of order) {
    cum += weights[i];
    if (cum >= total / 2) return values[i];
  }
  return values[order[order.length - 1]];
}

function shareRows(labels: string[], counts: Map<string, number>, total: number): ShareRow[] {
  return labels.map((label) => {
    const people = counts.get(label) ?? 0;
    return { label, people, share: total > 0 ? people / total : 0 };
  });
}

export function summarize(pop: Population, idx: number[]): Summary {
  let people = 0;
  let incomeSum = 0;
  let ageSum = 0;
  const ageC = new Map<string, number>();
  const incC = new Map<string, number>();
  const eduC = new Map<string, number>();
  const empC = new Map<string, number>();
  const sexC = new Map<string, number>();
  const raceC = new Map<string, number>();
  const bump = (m: Map<string, number>, k: string, w: number) => m.set(k, (m.get(k) ?? 0) + w);
  const values: number[] = new Array(idx.length);
  const weights: number[] = new Array(idx.length);
  for (let j = 0; j < idx.length; j++) {
    const i = idx[j];
    const w = pop.weight[i];
    people += w;
    incomeSum += pop.income[i] * w;
    ageSum += pop.age[i] * w;
    values[j] = pop.income[i];
    weights[j] = w;
    bump(ageC, ageGroupOf(pop.age[i]), w);
    bump(incC, incomeBandOf(pop.income[i]), w);
    bump(eduC, pop.education[i], w);
    bump(empC, pop.employment[i], w);
    bump(sexC, pop.sex[i], w);
    bump(raceC, pop.race[i], w);
  }
  return {
    records: idx.length,
    people,
    shareOfCalifornia: pop.totalWeight > 0 ? people / pop.totalWeight : 0,
    meanIncome: people > 0 ? incomeSum / people : 0,
    medianIncome: weightedMedian(values, weights),
    meanAge: people > 0 ? ageSum / people : 0,
    ageHistogram: shareRows(AGE_GROUPS.map((g) => g.label), ageC, people),
    incomeHistogram: shareRows(INCOME_BANDS.map((b) => b.label), incC, people),
    educationShares: shareRows(EDUCATION_LEVELS, eduC, people),
    employmentShares: shareRows(EMPLOYMENT_STATUSES, empC, people),
    sexShares: shareRows(SEXES, sexC, people),
    raceShares: shareRows(RACES, raceC, people),
  };
}

/* ------------------------------------------------------------------ */
/* Scenario A — UBI policy model (ported, unchanged)                   */
/* ------------------------------------------------------------------ */

export const DEFAULT_UBI_PARAMS: UbiParams = {
  adultMonthly: 1000,
  childMonthly: 0,
  adultAge: 18,
  taxRate: 0.3,
  progressive: false,
  exemption: 25000,
};

/**
 * Run the ported UBI model on a selection. The ported model takes one scalar
 * weight for the whole sample, so the selection must carry a uniform weight
 * (true for this sample, where every record represents 3,292.6852 people).
 */
export function runUbi(pop: Population, idx: number[], meta: UbiMeta, params: UbiParams): UbiResult | null {
  if (idx.length === 0) return null;
  const w = pop.weight[idx[0]];
  for (const i of idx) if (pop.weight[i] !== w) throw new Error('UBI model requires a uniform record weight');
  const sub: UbiSample = {
    scaledWeight: w,
    age: idx.map((i) => pop.age[i]),
    income: idx.map((i) => pop.income[i]),
    sex: idx.map((i) => pop.sex[i]),
    race: idx.map((i) => pop.race[i]),
    education: idx.map((i) => pop.education[i]),
    employment: idx.map((i) => pop.employment[i]),
  };
  return simulate(sub, meta, params);
}

/* ------------------------------------------------------------------ */
/* Scenario B — reach and adoption (assumption-driven arithmetic)      */
/* ------------------------------------------------------------------ */

export interface ReachAssumptions {
  /** 0–1: share of the filtered population that could use the offer */
  eligibleShare: number;
  /** 0–1: share of eligible people who become aware */
  awarenessRate: number;
  /** 0–1: share of aware people who adopt */
  adoptionRate: number;
  /** dollars per adopter per period */
  valuePerAdopter: number;
  /** whether valuePerAdopter is revenue earned or cost incurred */
  valueKind: 'revenue' | 'cost';
  /** dollars available for the period */
  budget: number;
}

export const DEFAULT_REACH: ReachAssumptions = {
  eligibleShare: 0.5,
  awarenessRate: 0.2,
  adoptionRate: 0.05,
  valuePerAdopter: 120,
  valueKind: 'revenue',
  budget: 250000,
};

export interface ReachResult {
  eligiblePeople: number;
  awarePeople: number;
  adopters: number;
  /** adopters / filtered people */
  adopterShareOfFiltered: number;
  /** adopters × valuePerAdopter */
  totalValue: number;
  /** budget / adopters (null when no adopters) */
  budgetPerAdopter: number | null;
  /** cost kind: share of total cost the budget covers; revenue kind: totalValue / budget */
  budgetRatio: number | null;
  /** cost kind only: adopters the budget can fund at valuePerAdopter */
  fundedAdopters: number | null;
}

export function runReach(filteredPeople: number, a: ReachAssumptions): ReachResult {
  const clamp01 = (v: number) => Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0));
  const eligiblePeople = filteredPeople * clamp01(a.eligibleShare);
  const awarePeople = eligiblePeople * clamp01(a.awarenessRate);
  const adopters = awarePeople * clamp01(a.adoptionRate);
  const totalValue = adopters * Math.max(0, a.valuePerAdopter);
  const budget = Math.max(0, a.budget);
  return {
    eligiblePeople,
    awarePeople,
    adopters,
    adopterShareOfFiltered: filteredPeople > 0 ? adopters / filteredPeople : 0,
    totalValue,
    budgetPerAdopter: adopters > 0 ? budget / adopters : null,
    budgetRatio: a.valueKind === 'cost' ? (totalValue > 0 ? budget / totalValue : null) : budget > 0 ? totalValue / budget : null,
    fundedAdopters: a.valueKind === 'cost' && a.valuePerAdopter > 0 ? budget / a.valuePerAdopter : null,
  };
}

/* ------------------------------------------------------------------ */
/* Personas — weight-proportional sampling without replacement         */
/* ------------------------------------------------------------------ */

export interface Persona {
  /** 1-based position in the sample (recordIndex + 1), for reproducibility */
  record: number;
  age: number;
  ageGroup: string;
  /** observed reported personal income (dollars) */
  income: number;
  incomeBand: string;
  education: string;
  employment: string;
  sex: string;
  race: string;
  /** persons this record represents */
  weight: number;
}

/** Deterministic 32-bit PRNG (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sample `count` distinct indices with probability proportional to weight
 * (Efraimidis–Spirakis: key = u^(1/w), keep the largest keys).
 */
export function sampleIndices(pop: Population, idx: number[], count: number, seed: number): number[] {
  const n = Math.max(0, Math.min(count, idx.length));
  if (n === 0) return [];
  const rand = mulberry32(seed);
  const keyed = idx.map((i) => ({ i, key: Math.pow(rand(), 1 / Math.max(pop.weight[i], 1e-12)) }));
  keyed.sort((a, b) => b.key - a.key);
  return keyed.slice(0, n).map((k) => k.i);
}

export function samplePersonas(pop: Population, idx: number[], count: number, seed: number): Persona[] {
  return sampleIndices(pop, idx, count, seed).map((i) => ({
    record: i + 1,
    age: pop.age[i],
    ageGroup: ageGroupOf(pop.age[i]),
    income: pop.income[i],
    incomeBand: incomeBandOf(pop.income[i]),
    education: pop.education[i],
    employment: pop.employment[i],
    sex: pop.sex[i],
    race: pop.race[i],
    weight: pop.weight[i],
  }));
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export const fmtInt = (v: number) => Math.round(v).toLocaleString('en-US');
export const fmtUSD = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
/** Two decimals for small per-person amounts such as budget per adopter. */
export const fmtUSDcents = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtPct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;
export const fmtBillions = (v: number) => `${v < 0 ? '-' : ''}$${(Math.abs(v) / 1e9).toFixed(1)}B`;
export const fmtMillions = (v: number) => `${(v / 1e6).toFixed(2)}M`;

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */

export interface WorkbenchState {
  question: string;
  filters: Filters;
  ubiParams: UbiParams;
  reach: ReachAssumptions;
  personaCount: number;
  personaSeed: number;
}

export interface WorkbenchResults {
  summary: Summary;
  ubi: UbiResult | null;
  reach: ReachResult;
  personas: Persona[];
}

export interface ExportBundle {
  generatedAt: string;
  tool: { name: string; version: string; url: string };
  data: { source: string; sampleRecords: number; fullRecords: number; totalPopulation: number; povertyLine: number; note: string };
  labels: Record<string, string>;
  state: WorkbenchState;
  results: WorkbenchResults;
}

export function buildBundle(state: WorkbenchState, results: WorkbenchResults, meta: UbiMeta, pop: Population, generatedAt = new Date().toISOString()): ExportBundle {
  return {
    generatedAt,
    tool: { name: 'Population workbench', version: MODEL_VERSION, url: 'https://mj2.pro/lab/population-workbench/' },
    data: {
      source: DATA_SOURCE,
      sampleRecords: pop.n,
      fullRecords: meta.sampleRecords,
      totalPopulation: meta.totalPopulation,
      povertyLine: meta.povertyLine,
      note: DISCLAIMERS.sample,
    },
    labels: {
      observed: 'read directly from a Census microdata record',
      calculated: 'arithmetic on observed records and their survey weights',
      simulated: 'output of the UBI policy model applied to the records',
      assumed: 'a number the user typed in',
      estimate: 'arithmetic on assumed numbers; not a forecast',
      personas: DISCLAIMERS.personas,
      reach: DISCLAIMERS.reach,
      ubi: DISCLAIMERS.ubi,
    },
    state,
    results,
  };
}

export function buildJson(bundle: ExportBundle): string {
  return JSON.stringify(bundle, null, 2);
}

function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildCsv(personas: Persona[]): string {
  const header = ['persona', 'sample_record', 'age', 'age_group', 'income_band', 'reported_personal_income_usd', 'education', 'employment', 'sex', 'race', 'persons_represented', 'note'];
  const rows = personas.map((p, i) => [
    `P${i + 1}`, p.record, p.age, p.ageGroup, p.incomeBand, p.income, p.education, p.employment, p.sex, p.race, p.weight.toFixed(4), DISCLAIMERS.personas,
  ].map(csvCell).join(','));
  return [header.join(','), ...rows].join('\n') + '\n';
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function barRows(rows: ShareRow[]): string {
  const max = Math.max(...rows.map((r) => r.share), 0.0001);
  return rows
    .map((r) => `<div class="bar"><span class="lbl">${esc(r.label)}</span><span class="trk"><i style="width:${((r.share / max) * 100).toFixed(1)}%"></i></span><span class="val">${fmtPct(r.share)} · ${fmtInt(r.people)}</span></div>`)
    .join('');
}

/**
 * Self-contained interactive HTML report: inline CSS and JS only, no
 * external requests. Reach assumptions are editable inside the report; the
 * UBI results are the values computed at export time.
 */
export function buildHtmlReport(bundle: ExportBundle): string {
  const { state, results, data, generatedAt } = bundle;
  const s = results.summary;
  const u = results.ubi;
  const r = results.reach;
  const p = state.ubiParams;
  const q = state.question.trim() || '(no question recorded)';
  const filt = state.filters;
  const any = (a: string[]) => (a.length ? a.join(', ') : 'any');
  const ubiBlock = u
    ? `<div class="grid">
<div class="stat"><small>simulated · program cost</small><b>${fmtBillions(u.totalUbiCost)}</b></div>
<div class="stat"><small>simulated · tax revenue</small><b>${fmtBillions(u.totalTaxRevenue)}</b></div>
<div class="stat"><small>simulated · net fiscal</small><b>${fmtBillions(u.netFiscal)}</b></div>
<div class="stat"><small>simulated · revenue-neutral flat rate</small><b>${fmtPct(u.fundedTaxRate)}</b></div>
<div class="stat"><small>simulated · mean net change</small><b>${fmtUSD(u.meanNetChange)}</b></div>
<div class="stat"><small>simulated · median adult net change</small><b>${fmtUSD(u.medianAdultNetChange)}</b></div>
<div class="stat"><small>simulated · net gainers</small><b>${fmtMillions(u.beneficiaries)}</b></div>
<div class="stat"><small>simulated · net payers</small><b>${fmtMillions(u.payers)}</b></div>
<div class="stat"><small>simulated · poverty proxy before → after</small><b>${fmtPct(u.povertyBefore)} → ${fmtPct(u.povertyAfter)}</b></div>
</div>
<h4>Distribution of annual net change</h4>${barRows(u.histogram.map((h) => ({ label: h.bin, people: h.people, share: s.people > 0 ? h.people / s.people : 0 })))}
<h4>Mean net change by age group</h4><table><tr><th>Age</th><th>People</th><th>Mean net change</th></tr>${u.byAge.map((g) => `<tr><td>${esc(g.label)}</td><td>${fmtInt(g.people)}</td><td>${fmtUSD(g.meanNetChange)}</td></tr>`).join('')}</table>`
    : '<p>No records matched the filter, so the UBI model did not run.</p>';
  const personaCards = results.personas.length
    ? results.personas
        .map((pp, i) => `<div class="card"><b>Persona ${i + 1}</b><span>Age ${pp.age} · ${esc(pp.sex)}</span><span>${esc(pp.incomeBand)}</span><span>${esc(pp.education)}</span><span>${esc(pp.employment)}</span><span>${esc(pp.race)}</span><small>sample record ${pp.record} · represents ${fmtInt(pp.weight)} people</small></div>`)
        .join('')
    : '<p>No personas were sampled.</p>';
  const json = buildJson(bundle).replace(/<\/script/gi, '<\\/script');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Population workbench report — ${esc(q).slice(0, 80)}</title>
<style>
:root{color-scheme:light}body{margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#1d211e;background:#fafaf7}main{max-width:900px;margin:0 auto;padding:32px 20px 60px}h1{font-size:30px;letter-spacing:-.02em;margin:0 0 6px}h2{font-size:20px;margin:36px 0 10px;padding-top:14px;border-top:1px solid #d9dad4}h4{margin:20px 0 6px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#60655e}
.meta{color:#60655e;font-size:14px}.tag{display:inline-block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;border:1px solid #cc3524;color:#cc3524;padding:2px 8px;border-radius:2px;margin:6px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.stat{border:1px solid #d9dad4;background:#fff;padding:12px}.stat small{display:block;color:#60655e;font-size:12px}.stat b{font-size:22px}
.bar{display:grid;grid-template-columns:170px 1fr 130px;gap:10px;align-items:center;font-size:13px;margin:4px 0}.trk{height:10px;background:#e8e9e3}.trk i{display:block;height:100%;background:#cc3524}.val{color:#60655e;text-align:right}
table{border-collapse:collapse;font-size:14px}td,th{border:1px solid #d9dad4;padding:6px 10px;text-align:left}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}.card{border:1px solid #d9dad4;background:#fff;padding:12px;display:flex;flex-direction:column;gap:2px;font-size:14px}.card b{font-size:15px}.card small{color:#60655e;margin-top:6px}
label{display:block;font-size:13px;margin:8px 0}input{font:inherit;padding:4px 6px;width:120px}dl{display:grid;grid-template-columns:max-content 1fr;gap:4px 16px;font-size:14px}dt{color:#60655e}dd{margin:0}
.warn{background:#fff3ef;border-left:3px solid #cc3524;padding:10px 14px;font-size:14px}details{margin-top:20px}pre{background:#f0f1ec;padding:12px;overflow:auto;font-size:12px}
@media(max-width:600px){.bar{grid-template-columns:1fr}.val{text-align:left}}
</style></head><body><main>
<p class="meta">Population workbench report · generated ${esc(generatedAt)} · model ${esc(bundle.tool.version)} · <a href="${esc(bundle.tool.url)}">${esc(bundle.tool.url)}</a></p>
<h1>${esc(q)}</h1>
<p class="meta">Data: ${esc(data.source)}. ${esc(data.note)}</p>
<p class="warn">Observed values come from Census records; calculated values are weighted arithmetic on those records; simulated values are UBI model outputs; assumed values were typed in; estimates are arithmetic on assumptions. Nothing here is a forecast.</p>

<h2>Filtered population</h2>
<dl><dt>Age</dt><dd>${filt.ageMin}–${filt.ageMax}</dd><dt>Income bands</dt><dd>${esc(any(filt.incomeBands))}</dd><dt>Education</dt><dd>${esc(any(filt.education))}</dd><dt>Employment</dt><dd>${esc(any(filt.employment))}</dd><dt>Sex</dt><dd>${esc(any(filt.sex))}</dd><dt>Race</dt><dd>${esc(any(filt.race))}</dd></dl>
<div class="grid">
<div class="stat"><small>observed · records</small><b>${fmtInt(s.records)}</b></div>
<div class="stat"><small>calculated · people represented</small><b>${fmtInt(s.people)}</b></div>
<div class="stat"><small>calculated · share of California</small><b>${fmtPct(s.shareOfCalifornia)}</b></div>
<div class="stat"><small>calculated · median personal income</small><b>${fmtUSD(s.medianIncome)}</b></div>
<div class="stat"><small>calculated · mean personal income</small><b>${fmtUSD(s.meanIncome)}</b></div>
<div class="stat"><small>calculated · mean age</small><b>${s.meanAge.toFixed(1)}</b></div>
</div>
<h4>Age</h4>${barRows(s.ageHistogram)}
<h4>Personal income</h4>${barRows(s.incomeHistogram)}
<h4>Education</h4>${barRows(s.educationShares)}
<h4>Employment</h4>${barRows(s.employmentShares)}

<h2>Scenario A — UBI policy model</h2>
<p class="meta">Adults ${p.adultAge}+ receive ${fmtUSD(p.adultMonthly)}/month${p.childMonthly > 0 ? `, children ${fmtUSD(p.childMonthly)}/month` : ''}, funded by a ${fmtPct(p.taxRate, 0)} ${p.progressive ? `tax on personal income above ${fmtUSD(p.exemption)}` : 'flat tax on personal income'}, applied to the filtered population.</p>
<span class="tag">simulated</span>
${ubiBlock}
<p class="meta">${esc(DISCLAIMERS.ubi)}</p>

<h2>Scenario B — reach and adoption</h2>
<span class="tag">${esc(DISCLAIMERS.reach)}</span>
<p class="meta">Edit the assumptions; the estimate recomputes in this page. Filtered population: <b id="rp">${fmtInt(s.people)}</b> people (calculated).</p>
<div class="grid">
<label>Eligible share % <input id="a1" type="number" min="0" max="100" step="1" value="${(state.reach.eligibleShare * 100).toFixed(1)}"></label>
<label>Awareness % <input id="a2" type="number" min="0" max="100" step="1" value="${(state.reach.awarenessRate * 100).toFixed(1)}"></label>
<label>Adoption % <input id="a3" type="number" min="0" max="100" step="1" value="${(state.reach.adoptionRate * 100).toFixed(1)}"></label>
<label>${state.reach.valueKind === 'cost' ? 'Cost' : 'Revenue'} per adopter $ <input id="a4" type="number" min="0" step="1" value="${state.reach.valuePerAdopter}"></label>
<label>Budget $ <input id="a5" type="number" min="0" step="1000" value="${state.reach.budget}"></label>
</div>
<div class="grid" id="reachOut">
<div class="stat"><small>estimate · eligible people</small><b id="o1">${fmtInt(r.eligiblePeople)}</b></div>
<div class="stat"><small>estimate · aware people</small><b id="o2">${fmtInt(r.awarePeople)}</b></div>
<div class="stat"><small>estimate · adopters</small><b id="o3">${fmtInt(r.adopters)}</b></div>
<div class="stat"><small>estimate · adopters as share of filtered</small><b id="o4">${fmtPct(r.adopterShareOfFiltered, 2)}</b></div>
<div class="stat"><small>estimate · total ${esc(state.reach.valueKind)}</small><b id="o5">${fmtUSD(r.totalValue)}</b></div>
<div class="stat"><small>estimate · budget per adopter</small><b id="o6">${r.budgetPerAdopter === null ? '—' : fmtUSDcents(r.budgetPerAdopter)}</b></div>
</div>

<h2>Personas</h2>
<span class="tag">${esc(DISCLAIMERS.personas)}</span>
<p class="meta">${results.personas.length} records sampled from the filtered population with probability proportional to survey weight (seed ${state.personaSeed}). Attributes are the observed values on each record.</p>
<div class="cards">${personaCards}</div>

<details><summary>All inputs, assumptions and results (JSON)</summary><pre id="bundle">${esc(json)}</pre></details>
</main>
<script>
(function(){var P=${JSON.stringify(s.people)};var K=${JSON.stringify(state.reach.valueKind)};
function g(id){return document.getElementById(id)}
function n(v){v=parseFloat(v);return isFinite(v)?v:0}
function pct(v){return Math.min(1,Math.max(0,n(v)/100))}
function fi(v){return Math.round(v).toLocaleString('en-US')}
function fu(v){return v.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})}
function fc(v){return v.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2})}
function run(){var e=P*pct(g('a1').value),a=e*pct(g('a2').value),d=a*pct(g('a3').value),t=d*Math.max(0,n(g('a4').value)),b=Math.max(0,n(g('a5').value));
g('o1').textContent=fi(e);g('o2').textContent=fi(a);g('o3').textContent=fi(d);g('o4').textContent=(P>0?(d/P*100):0).toFixed(2)+'%';g('o5').textContent=fu(t);g('o6').textContent=d>0?fc(b/d):'—';}
['a1','a2','a3','a4','a5'].forEach(function(id){g(id).addEventListener('input',run)});})();
</script>
</body></html>
`;
}
