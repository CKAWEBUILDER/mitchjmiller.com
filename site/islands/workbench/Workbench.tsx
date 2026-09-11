import { useEffect, useMemo, useState } from 'react';
import './workbench.css';
import {
  AGE_GROUPS, DEFAULT_FILTERS, DEFAULT_REACH, DEFAULT_UBI_PARAMS, DISCLAIMERS, EDUCATION_LEVELS, EMPLOYMENT_STATUSES,
  INCOME_BANDS, MODEL_VERSION, RACES, SEXES, buildBundle, buildCsv, buildHtmlReport, buildJson, filterPopulation,
  fmtBillions, fmtInt, fmtMillions, fmtPct, fmtUSD, fmtUSDcents, fromSample, runReach, runUbi, samplePersonas, summarize,
  type Filters, type Population, type ReachAssumptions, type ShareRow, type Summary, type UbiMeta, type UbiParams,
} from './model';

interface Props { baseline: Summary; dataUrl: string; metaUrl: string; }
type Status = 'idle' | 'loading' | 'ready' | 'error';
type Kind = 'observed' | 'calculated' | 'simulated' | 'assumed' | 'estimate';

const Tag = ({ kind }: { kind: Kind }) => <em className={`wb-tag wb-tag-${kind}`}>{kind}</em>;

function Stat({ kind, label, value, testid }: { kind: Kind; label: string; value: string; testid?: string }) {
  return (
    <div className="wb-stat">
      <small><Tag kind={kind} /> {label}</small>
      <b data-testid={testid}>{value}</b>
    </div>
  );
}

function Bars({ rows, kind = 'calculated' }: { rows: ShareRow[]; kind?: Kind }) {
  const max = Math.max(...rows.map((r) => r.share), 1e-6);
  return (
    <div className="wb-bars">
      {rows.map((r) => (
        <div className="wb-bar" key={r.label}>
          <span className="wb-bar-l">{r.label}</span>
          <svg viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
            <rect x="0" y="0" width={((r.share / max) * 100).toFixed(2)} height="8" className={`wb-fill-${kind}`} />
          </svg>
          <span className="wb-bar-v">{fmtPct(r.share)} <i>{fmtInt(r.people)}</i></span>
        </div>
      ))}
    </div>
  );
}

function Chips({ name, options, selected, onChange, disabled }: { name: string; options: string[]; selected: string[]; onChange: (next: string[]) => void; disabled: boolean }) {
  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  return (
    <div className="wb-chips" role="group" aria-label={name}>
      {options.map((o) => (
        <button key={o} type="button" className="wb-chip" aria-pressed={selected.includes(o)} disabled={disabled} onClick={() => toggle(o)} data-testid={`chip-${name}-${o}`}>{o}</button>
      ))}
      {selected.length > 0 && <button type="button" className="wb-chip wb-chip-clear" disabled={disabled} onClick={() => onChange([])}>any</button>}
    </div>
  );
}

function NumberField({ label, value, onChange, min, max, step = 1, suffix, disabled, testid }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string; disabled?: boolean; testid?: string }) {
  const [text, setText] = useState(String(value));
  useEffect(() => { setText(String(value)); }, [value]);
  return (
    <label className="wb-field">
      <span>{label}</span>
      <span className="wb-field-in">
        <input type="number" inputMode="decimal" value={text} min={min} max={max} step={step} disabled={disabled} data-testid={testid}
          onChange={(e) => {
            setText(e.target.value);
            const v = Number(e.target.value);
            if (e.target.value !== '' && Number.isFinite(v)) onChange(min !== undefined && v < min ? min : max !== undefined && v > max ? max : v);
          }} />
        {suffix && <i>{suffix}</i>}
      </span>
    </label>
  );
}

function Range({ label, value, onChange, min, max, step, display, disabled }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; display: string; disabled: boolean }) {
  return (
    <label className="wb-range">
      <span>{label} <b>{display}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function download(filename: string, mime: string, content: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const stamp = () => new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);

export default function Workbench({ baseline, dataUrl, metaUrl }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [pop, setPop] = useState<Population | null>(null);
  const [meta, setMeta] = useState<UbiMeta | null>(null);
  const [question, setQuestion] = useState('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [ubiParams, setUbiParams] = useState<UbiParams>(DEFAULT_UBI_PARAMS);
  const [reach, setReach] = useState<ReachAssumptions>(DEFAULT_REACH);
  const [personaCount, setPersonaCount] = useState(6);
  const [seed, setSeed] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    const get = (url: string) => fetch(url).then((r) => { if (!r.ok) throw new Error(`${r.status} loading ${url}`); return r.json(); });
    Promise.all([get(dataUrl), get(metaUrl)])
      .then(([sample, m]) => { if (cancelled) return; setPop(fromSample(sample)); setMeta(m as UbiMeta); setStatus('ready'); })
      .catch((e) => { if (cancelled) return; setError(String(e?.message ?? e)); setStatus('error'); });
    return () => { cancelled = true; };
  }, [dataUrl, metaUrl]);

  const ready = status === 'ready' && !!pop && !!meta;
  const idx = useMemo(() => (pop ? filterPopulation(pop, filters) : []), [pop, filters]);
  const summary = useMemo(() => (pop ? summarize(pop, idx) : baseline), [pop, idx, baseline]);
  const ubi = useMemo(() => (pop && meta ? runUbi(pop, idx, meta, ubiParams) : null), [pop, meta, idx, ubiParams]);
  const reachResult = useMemo(() => runReach(summary.people, reach), [summary.people, reach]);
  const personas = useMemo(() => (pop ? samplePersonas(pop, idx, personaCount, seed) : []), [pop, idx, personaCount, seed]);
  const small = ready && summary.records < 100;

  const setF = <K extends keyof Filters>(k: K, v: Filters[K]) => setFilters((f) => ({ ...f, [k]: v }));
  const setU = <K extends keyof UbiParams>(k: K, v: UbiParams[K]) => setUbiParams((p) => ({ ...p, [k]: v }));
  const setR = <K extends keyof ReachAssumptions>(k: K, v: ReachAssumptions[K]) => setReach((r) => ({ ...r, [k]: v }));

  const bundle = () => {
    if (!pop || !meta) return null;
    return buildBundle({ question, filters, ubiParams, reach, personaCount, personaSeed: seed }, { summary, ubi, reach: reachResult, personas }, meta, pop);
  };
  const exportHtml = () => { const b = bundle(); if (b) download(`population-workbench-report-${stamp()}.html`, 'text/html', buildHtmlReport(b)); };
  const exportCsv = () => { if (pop) download(`population-workbench-personas-${stamp()}.csv`, 'text/csv', buildCsv(personas)); };
  const exportJson = () => { const b = bundle(); if (b) download(`population-workbench-assumptions-${stamp()}.json`, 'application/json', buildJson(b)); };

  const valueWord = reach.valueKind === 'cost' ? 'cost' : 'revenue';

  return (
    <div className="wb" data-workbench-state={status} data-model-version={MODEL_VERSION}>
      <div className="wb-status" role="status">
        {status === 'idle' && <span>Static baseline shown. Controls enable once the data loads in a JavaScript-enabled browser.</span>}
        {status === 'loading' && <span>Loading Census microdata records…</span>}
        {status === 'ready' && pop && <span>Loaded {fmtInt(pop.n)} records · each represents {fmtInt(pop.weight[0])} Californians · model v{MODEL_VERSION} · runs in your browser</span>}
        {status === 'error' && <span className="wb-error">Could not load the data file ({error}). The static baseline above still stands.</span>}
        <span className="wb-legend"><Tag kind="observed" /><Tag kind="calculated" /><Tag kind="simulated" /><Tag kind="assumed" /><Tag kind="estimate" /></span>
      </div>

      {/* 01 Question */}
      <section className="wb-step" aria-labelledby="wb-s1">
        <h3 id="wb-s1"><span>01</span> Define the question</h3>
        <label className="wb-question">
          <span>What decision is this population for? Stored with every export. <Tag kind="assumed" /></span>
          <input type="text" maxLength={240} value={question} placeholder="e.g. Should we price the plan at $12/month for employed adults under 45?" onChange={(e) => setQuestion(e.target.value)} disabled={!ready} data-testid="question" />
        </label>
      </section>

      {/* 02 Filter */}
      <section className="wb-step" aria-labelledby="wb-s2">
        <h3 id="wb-s2"><span>02</span> Filter the population</h3>
        <div className="wb-filters">
          <div className="wb-filter">
            <div className="wb-filter-h">Age</div>
            <div className="wb-inline">
              <NumberField label="from" value={filters.ageMin} min={0} max={94} onChange={(v) => setF('ageMin', Math.min(v, filters.ageMax))} disabled={!ready} testid="age-min" />
              <NumberField label="to" value={filters.ageMax} min={0} max={94} onChange={(v) => setF('ageMax', Math.max(v, filters.ageMin))} disabled={!ready} testid="age-max" />
            </div>
          </div>
          <div className="wb-filter"><div className="wb-filter-h">Personal income band</div><Chips name="income" options={INCOME_BANDS.map((b) => b.label)} selected={filters.incomeBands} onChange={(v) => setF('incomeBands', v)} disabled={!ready} /></div>
          <div className="wb-filter"><div className="wb-filter-h">Education</div><Chips name="education" options={EDUCATION_LEVELS} selected={filters.education} onChange={(v) => setF('education', v)} disabled={!ready} /></div>
          <div className="wb-filter"><div className="wb-filter-h">Employment</div><Chips name="employment" options={EMPLOYMENT_STATUSES} selected={filters.employment} onChange={(v) => setF('employment', v)} disabled={!ready} /></div>
          <div className="wb-filter"><div className="wb-filter-h">Sex</div><Chips name="sex" options={SEXES} selected={filters.sex} onChange={(v) => setF('sex', v)} disabled={!ready} /></div>
          <div className="wb-filter"><div className="wb-filter-h">Race</div><Chips name="race" options={RACES} selected={filters.race} onChange={(v) => setF('race', v)} disabled={!ready} /></div>
          <button type="button" className="wb-btn wb-btn-ghost" onClick={() => setFilters(DEFAULT_FILTERS)} disabled={!ready}>Reset filters</button>
        </div>

        <div className="wb-stats">
          <Stat kind="observed" label="records" value={fmtInt(summary.records)} testid="record-count" />
          <Stat kind="calculated" label="people represented" value={fmtInt(summary.people)} testid="people-count" />
          <Stat kind="calculated" label="share of California" value={fmtPct(summary.shareOfCalifornia, 2)} testid="share" />
          <Stat kind="calculated" label="median personal income" value={fmtUSD(summary.medianIncome)} />
          <Stat kind="calculated" label="mean personal income" value={fmtUSD(summary.meanIncome)} />
          <Stat kind="calculated" label="mean age" value={summary.meanAge.toFixed(1)} />
        </div>
        {small && <p className="wb-warn">Small selection: {fmtInt(summary.records)} records. Weighted estimates from fewer than 100 records are unstable; widen the filters or treat these numbers as indicative only.</p>}
        {ready && summary.records === 0 && <p className="wb-warn">No records match. The scenarios and personas below are empty until the filters admit at least one record.</p>}

        <div className="wb-charts">
          <figure><figcaption>Age <Tag kind="calculated" /></figcaption><Bars rows={summary.ageHistogram} /></figure>
          <figure><figcaption>Personal income <Tag kind="calculated" /></figcaption><Bars rows={summary.incomeHistogram} /></figure>
          <figure><figcaption>Education <Tag kind="calculated" /></figcaption><Bars rows={summary.educationShares} /></figure>
          <figure><figcaption>Employment <Tag kind="calculated" /></figcaption><Bars rows={summary.employmentShares} /></figure>
        </div>
      </section>

      {/* 03 Scenarios */}
      <section className="wb-step" aria-labelledby="wb-s3">
        <h3 id="wb-s3"><span>03</span> Compare scenarios</h3>
        <div className="wb-scenarios">
          <div className="wb-scenario">
            <h4>A · UBI policy model <Tag kind="simulated" /></h4>
            <p className="wb-muted">The verified California UBI model, applied to the filtered population. Parameters are assumptions; outputs are model results, not fiscal forecasts.</p>
            <div className="wb-ranges">
              <Range label="Adult benefit" value={ubiParams.adultMonthly} min={0} max={3000} step={50} display={`${fmtUSD(ubiParams.adultMonthly)}/mo`} onChange={(v) => setU('adultMonthly', v)} disabled={!ready} />
              <Range label="Child benefit" value={ubiParams.childMonthly} min={0} max={1500} step={50} display={`${fmtUSD(ubiParams.childMonthly)}/mo`} onChange={(v) => setU('childMonthly', v)} disabled={!ready} />
              <Range label="Adult age" value={ubiParams.adultAge} min={16} max={25} step={1} display={`${ubiParams.adultAge} yrs`} onChange={(v) => setU('adultAge', v)} disabled={!ready} />
              <Range label="Income tax rate" value={Math.round(ubiParams.taxRate * 100)} min={0} max={80} step={1} display={`${Math.round(ubiParams.taxRate * 100)}%`} onChange={(v) => setU('taxRate', v / 100)} disabled={!ready} />
              <div className="wb-toggle" role="group" aria-label="Tax structure">
                <button type="button" className="wb-chip" aria-pressed={!ubiParams.progressive} disabled={!ready} onClick={() => setU('progressive', false)}>Flat tax</button>
                <button type="button" className="wb-chip" aria-pressed={ubiParams.progressive} disabled={!ready} onClick={() => setU('progressive', true)}>Progressive (exempt income below an allowance)</button>
              </div>
              {ubiParams.progressive && <Range label="Exempt allowance" value={ubiParams.exemption} min={0} max={100000} step={1000} display={fmtUSD(ubiParams.exemption)} onChange={(v) => setU('exemption', v)} disabled={!ready} />}
            </div>
            {ubi ? (
              <>
                <div className="wb-stats wb-stats-3">
                  <Stat kind="simulated" label="program cost / yr" value={fmtBillions(ubi.totalUbiCost)} testid="ubi-cost" />
                  <Stat kind="simulated" label="tax revenue / yr" value={fmtBillions(ubi.totalTaxRevenue)} />
                  <Stat kind="simulated" label={ubi.netFiscal >= 0 ? 'surplus' : 'deficit'} value={fmtBillions(ubi.netFiscal)} />
                  <Stat kind="simulated" label="revenue-neutral flat rate" value={fmtPct(ubi.fundedTaxRate)} />
                  <Stat kind="simulated" label="mean net change / person" value={fmtUSD(ubi.meanNetChange)} />
                  <Stat kind="simulated" label="median adult net change" value={fmtUSD(ubi.medianAdultNetChange)} />
                  <Stat kind="simulated" label="net gainers" value={fmtMillions(ubi.beneficiaries)} />
                  <Stat kind="simulated" label="net payers" value={fmtMillions(ubi.payers)} />
                  <Stat kind="simulated" label="poverty proxy before → after" value={`${fmtPct(ubi.povertyBefore)} → ${fmtPct(ubi.povertyAfter)}`} />
                </div>
                <div className="wb-charts wb-charts-2">
                  <figure><figcaption>Annual net change per person <Tag kind="simulated" /></figcaption><Bars kind="simulated" rows={ubi.histogram.map((h) => ({ label: h.bin, people: h.people, share: summary.people > 0 ? h.people / summary.people : 0 }))} /></figure>
                  <figure>
                    <figcaption>Mean net change by age group <Tag kind="simulated" /></figcaption>
                    <table className="wb-table"><tbody>
                      {ubi.byAge.filter((g) => AGE_GROUPS.some((a) => a.label === g.label) && g.people > 1).map((g) => <tr key={g.label}><td>{g.label}</td><td>{fmtInt(g.people)}</td><td>{fmtUSD(g.meanNetChange)}</td></tr>)}
                    </tbody></table>
                  </figure>
                </div>
                <p className="wb-muted">{DISCLAIMERS.ubi}</p>
              </>
            ) : (
              <p className="wb-muted">{ready ? 'No records in the selection; nothing to simulate.' : 'Model outputs appear when the data loads.'}</p>
            )}
          </div>

          <div className="wb-scenario">
            <h4>B · Reach and adoption <Tag kind="estimate" /></h4>
            <p className="wb-muted">For a product, price or budget decision. Every input is an assumption you make; the outputs are arithmetic on the weighted population. <strong>{DISCLAIMERS.reach}</strong></p>
            <div className="wb-assumptions">
              <NumberField label="Eligible share of filtered population" value={Math.round(reach.eligibleShare * 1000) / 10} min={0} max={100} step={1} suffix="%" onChange={(v) => setR('eligibleShare', v / 100)} disabled={!ready} testid="reach-eligible" />
              <NumberField label="Awareness rate among eligible" value={Math.round(reach.awarenessRate * 1000) / 10} min={0} max={100} step={1} suffix="%" onChange={(v) => setR('awarenessRate', v / 100)} disabled={!ready} />
              <NumberField label="Adoption rate among aware" value={Math.round(reach.adoptionRate * 1000) / 10} min={0} max={100} step={1} suffix="%" onChange={(v) => setR('adoptionRate', v / 100)} disabled={!ready} />
              <label className="wb-field"><span>Value per adopter is</span><span className="wb-field-in"><select value={reach.valueKind} disabled={!ready} onChange={(e) => setR('valueKind', e.target.value as 'revenue' | 'cost')}><option value="revenue">revenue earned</option><option value="cost">cost incurred</option></select></span></label>
              <NumberField label={`${valueWord === 'cost' ? 'Cost' : 'Revenue'} per adopter per period`} value={reach.valuePerAdopter} min={0} step={1} suffix="$" onChange={(v) => setR('valuePerAdopter', v)} disabled={!ready} />
              <NumberField label="Budget for the period" value={reach.budget} min={0} step={1000} suffix="$" onChange={(v) => setR('budget', v)} disabled={!ready} />
            </div>
            <div className="wb-stats wb-stats-3">
              <Stat kind="estimate" label="eligible people" value={fmtInt(reachResult.eligiblePeople)} />
              <Stat kind="estimate" label="aware people" value={fmtInt(reachResult.awarePeople)} />
              <Stat kind="estimate" label="adopters" value={fmtInt(reachResult.adopters)} testid="reach-adopters" />
              <Stat kind="estimate" label="adopters as share of filtered" value={fmtPct(reachResult.adopterShareOfFiltered, 2)} />
              <Stat kind="estimate" label={`total ${valueWord} per period`} value={fmtUSD(reachResult.totalValue)} />
              <Stat kind="estimate" label="budget per adopter" value={reachResult.budgetPerAdopter === null ? '—' : fmtUSDcents(reachResult.budgetPerAdopter)} />
              {reach.valueKind === 'cost' ? (
                <>
                  <Stat kind="estimate" label="adopters the budget funds" value={reachResult.fundedAdopters === null ? '—' : fmtInt(reachResult.fundedAdopters)} />
                  <Stat kind="estimate" label="budget ÷ total cost" value={reachResult.budgetRatio === null ? '—' : fmtPct(reachResult.budgetRatio, 0)} />
                </>
              ) : (
                <Stat kind="estimate" label="revenue ÷ budget" value={reachResult.budgetRatio === null ? '—' : `${reachResult.budgetRatio.toFixed(2)}×`} />
              )}
            </div>
            <p className="wb-muted">Assumption-driven estimate, not a forecast. No behavioral model, no calibration, no uncertainty range. The population is real and weighted; the rates are yours.</p>
          </div>
        </div>
      </section>

      {/* 04 Personas */}
      <section className="wb-step" aria-labelledby="wb-s4">
        <h3 id="wb-s4"><span>04</span> Draw personas</h3>
        <p className="wb-muted"><strong>{DISCLAIMERS.personas}</strong> Each card is one record from your filtered selection, drawn with probability proportional to its survey weight, described by the attributes on the record and nothing else.</p>
        <div className="wb-inline wb-persona-controls">
          <NumberField label="Personas" value={personaCount} min={1} max={24} onChange={(v) => setPersonaCount(Math.round(v))} disabled={!ready} testid="persona-count" />
          <NumberField label="Seed" value={seed} min={0} max={999999} onChange={(v) => setSeed(Math.round(v))} disabled={!ready} testid="persona-seed" />
          <button type="button" className="wb-btn" onClick={() => setSeed((s) => s + 1)} disabled={!ready} data-testid="resample">Resample</button>
        </div>
        <div className="wb-personas" data-testid="personas">
          {personas.map((p, i) => (
            <article className="wb-persona" key={`${p.record}-${i}`}>
              <header>Persona {i + 1} <Tag kind="observed" /></header>
              <dl>
                <div><dt>Age</dt><dd>{p.age}</dd></div>
                <div><dt>Sex</dt><dd>{p.sex}</dd></div>
                <div><dt>Income band</dt><dd>{p.incomeBand}</dd></div>
                <div><dt>Education</dt><dd>{p.education}</dd></div>
                <div><dt>Employment</dt><dd>{p.employment}</dd></div>
                <div><dt>Race</dt><dd>{p.race}</dd></div>
              </dl>
              <footer>Sample record {p.record} · represents {fmtInt(p.weight)} people</footer>
            </article>
          ))}
          {ready && personas.length === 0 && <p className="wb-muted">No personas: the selection is empty.</p>}
          {!ready && <p className="wb-muted">Persona cards appear when the data loads.</p>}
        </div>
      </section>

      {/* 05 Export */}
      <section className="wb-step" aria-labelledby="wb-s5">
        <h3 id="wb-s5"><span>05</span> Export</h3>
        <p className="wb-muted">Built in your browser from the current state; nothing is uploaded. Each file carries the question, filters, assumptions, results and the same labels and disclaimers shown here.</p>
        <div className="wb-inline">
          <button type="button" className="wb-btn" onClick={exportHtml} disabled={!ready} data-testid="export-html">Interactive HTML report</button>
          <button type="button" className="wb-btn" onClick={exportCsv} disabled={!ready} data-testid="export-csv">Personas CSV</button>
          <button type="button" className="wb-btn" onClick={exportJson} disabled={!ready} data-testid="export-json">Inputs and assumptions JSON</button>
        </div>
      </section>
    </div>
  );
}
