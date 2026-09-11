export interface UbiSample {
  scaledWeight: number;
  age: number[];
  income: number[];
  sex: string[];
  race: string[];
  education: string[];
  employment: string[];
}

export interface UbiMeta {
  source: string;
  totalPopulation: number;
  sampleRecords: number;
  meanPersonalIncome: number;
  medianPersonalIncome: number;
  adultMeanIncome: number;
  povertyLine: number;
  raceShares: Record<string, number>;
  eduShares: Record<string, number>;
}

export interface UbiParams {
  /** Monthly UBI for adults, in dollars. */
  adultMonthly: number;
  /** Monthly benefit for those under the adult age, in dollars. */
  childMonthly: number;
  /** Age at which a person is treated as an adult. */
  adultAge: number;
  /** Income tax rate funding the program, 0-1. */
  taxRate: number;
  /** When true, only income above `exemption` is taxed (progressive). */
  progressive: boolean;
  /** Income exempt from tax when progressive, in dollars. */
  exemption: number;
}

export interface GroupStat {
  label: string;
  meanNetChange: number;
  people: number;
}

export interface UbiResult {
  totalUbiCost: number;
  totalTaxRevenue: number;
  netFiscal: number; // revenue - cost; >0 surplus, <0 deficit
  fundedTaxRate: number; // flat rate that would make program revenue-neutral
  meanNetChange: number;
  medianNetChange: number;
  medianAdultNetChange: number;
  beneficiaries: number; // people with positive net change
  payers: number; // people with negative net change
  neutral: number;
  povertyBefore: number; // share 0-1
  povertyAfter: number;
  histogram: { bin: string; people: number; order: number }[];
  byRace: GroupStat[];
  byEducation: GroupStat[];
  byAge: GroupStat[];
}

const AGE_GROUPS: { label: string; min: number; max: number }[] = [
  { label: "Under 18", min: 0, max: 17 },
  { label: "18–24", min: 18, max: 24 },
  { label: "25–34", min: 25, max: 34 },
  { label: "35–44", min: 35, max: 44 },
  { label: "45–54", min: 45, max: 54 },
  { label: "55–64", min: 55, max: 64 },
  { label: "65+", min: 65, max: 200 },
];

const HIST_BINS: { label: string; min: number; max: number; order: number }[] = [
  { label: "< –20k", min: -Infinity, max: -20000, order: 0 },
  { label: "–20k to –10k", min: -20000, max: -10000, order: 1 },
  { label: "–10k to –5k", min: -10000, max: -5000, order: 2 },
  { label: "–5k to 0", min: -5000, max: 0, order: 3 },
  { label: "0 to 5k", min: 0, max: 5000, order: 4 },
  { label: "5k to 10k", min: 5000, max: 10000, order: 5 },
  { label: "10k to 12k", min: 10000, max: 12000, order: 6 },
  { label: "> 12k", min: 12000, max: Infinity, order: 7 },
];

function weightedMedian(pairs: { value: number; weight: number }[]): number {
  if (pairs.length === 0) return 0;
  const sorted = [...pairs].sort((a, b) => a.value - b.value);
  const total = sorted.reduce((s, p) => s + p.weight, 0);
  let cum = 0;
  for (const p of sorted) {
    cum += p.weight;
    if (cum >= total / 2) return p.value;
  }
  return sorted[sorted.length - 1].value;
}

export function simulate(data: UbiSample, meta: UbiMeta, params: UbiParams): UbiResult {
  const w = data.scaledWeight;
  const n = data.age.length;
  const adultAnnual = params.adultMonthly * 12;
  const childAnnual = params.childMonthly * 12;

  let totalUbiCost = 0;
  let totalTaxRevenue = 0;
  let totalTaxableIncome = 0;
  let beneficiaries = 0;
  let payers = 0;
  let neutral = 0;
  let povBefore = 0;
  let povAfter = 0;

  const netChanges: { value: number; weight: number }[] = new Array(n);
  const adultNetChanges: { value: number; weight: number }[] = [];

  const raceAgg = new Map<string, { sum: number; people: number }>();
  const eduAgg = new Map<string, { sum: number; people: number }>();
  const ageAgg = new Map<string, { sum: number; people: number }>();
  const histAgg = new Array(HIST_BINS.length).fill(0);

  const add = (m: Map<string, { sum: number; people: number }>, key: string, net: number) => {
    const cur = m.get(key) ?? { sum: 0, people: 0 };
    cur.sum += net * w;
    cur.people += w;
    m.set(key, cur);
  };

  const ageGroupLabel = (age: number) =>
    AGE_GROUPS.find((g) => age >= g.min && age <= g.max)?.label ?? "65+";

  for (let i = 0; i < n; i++) {
    const age = data.age[i];
    const income = data.income[i];
    const benefit = age >= params.adultAge ? adultAnnual : childAnnual;
    const taxable = params.progressive ? Math.max(income - params.exemption, 0) : Math.max(income, 0);
    const tax = taxable * params.taxRate;
    const net = benefit - tax;
    const newIncome = income + net;

    totalUbiCost += benefit * w;
    totalTaxRevenue += tax * w;
    totalTaxableIncome += taxable * w;

    if (net > 0.5) beneficiaries += w;
    else if (net < -0.5) payers += w;
    else neutral += w;

    if (income < meta.povertyLine) povBefore += w;
    if (newIncome < meta.povertyLine) povAfter += w;

    netChanges[i] = { value: net, weight: w };
    if (age >= params.adultAge) adultNetChanges.push({ value: net, weight: w });

    add(raceAgg, data.race[i], net);
    add(eduAgg, data.education[i], net);
    add(ageAgg, ageGroupLabel(age), net);

    const bin = HIST_BINS.find((b) => net >= b.min && net < b.max) ?? HIST_BINS[HIST_BINS.length - 1];
    histAgg[bin.order] += w;
  }

  const totalPeople = n * w;
  const meanNetChange =
    netChanges.reduce((s, p) => s + p.value * p.weight, 0) / totalPeople;

  const toStats = (m: Map<string, { sum: number; people: number }>): GroupStat[] =>
    Array.from(m.entries())
      .map(([label, v]) => ({ label, meanNetChange: v.sum / v.people, people: v.people }))
      .sort((a, b) => b.meanNetChange - a.meanNetChange);

  const byAge = AGE_GROUPS.map((g) => {
    const v = ageAgg.get(g.label) ?? { sum: 0, people: 1 };
    return { label: g.label, meanNetChange: v.sum / v.people, people: v.people };
  });

  // Flat rate that would fully fund the chosen benefit (revenue-neutral).
  const fundedTaxRate = totalTaxableIncome > 0 ? totalUbiCost / totalTaxableIncome : 0;

  return {
    totalUbiCost,
    totalTaxRevenue,
    netFiscal: totalTaxRevenue - totalUbiCost,
    fundedTaxRate,
    meanNetChange,
    medianNetChange: weightedMedian(netChanges),
    medianAdultNetChange: weightedMedian(adultNetChanges),
    beneficiaries,
    payers,
    neutral,
    povertyBefore: povBefore / totalPeople,
    povertyAfter: povAfter / totalPeople,
    histogram: HIST_BINS.map((b) => ({ bin: b.label, people: histAgg[b.order], order: b.order })),
    byRace: toStats(raceAgg),
    byEducation: toStats(eduAgg),
    byAge,
  };
}

export const fmtUSD = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const fmtBillions = (v: number) => {
  const b = v / 1e9;
  return `${b >= 0 ? "" : "-"}$${Math.abs(b).toFixed(1)}B`;
};

export const fmtMillionsPeople = (v: number) => `${(v / 1e6).toFixed(2)}M`;

export const fmtPct = (v: number) => `${(v * 100).toFixed(1)}%`;
