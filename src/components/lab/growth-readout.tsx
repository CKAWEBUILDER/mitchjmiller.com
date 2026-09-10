import { useState } from "react";
import { ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { compareCounts, growthSnapshot } from "./models";

const format = (value: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
const metricLabel = { clicks: "Search clicks", impressions: "Search impressions" };
type Metric = keyof typeof metricLabel;
const evidenceSteps = [
  { label: "Observed", title: "Visibility increased over two comparable windows.", text: "Google Search Console recorded 54 clicks versus 5, and 1,652 impressions versus 470. Both windows cover 28 days. Those are measured changes in Google Search activity." },
  { label: "Interpreted", title: "An early signal with a visible starting point.", text: "The site is earning more search exposure and visits. The +980% headline is meaningful alongside its 5-click baseline and the 49 additional clicks. It is an early growth signal, not a mature traffic level." },
  { label: "Act on it", title: "Connect discovery to the next customer action.", text: "Prioritize useful landing pages, clear lesson choices and booking paths. Connect production-only analytics and booking records before claiming that search growth produced additional customers or revenue." },
];

export function GrowthReadout() {
  const [metric, setMetric] = useState<Metric>("clicks");
  const [mode, setMode] = useState<"observed" | "demo">("observed");
  const [previous, setPrevious] = useState(5);
  const [current, setCurrent] = useState(54);
  const [evidence, setEvidence] = useState(0);
  const old = mode === "observed" ? growthSnapshot.previous[metric] : previous;
  const now = mode === "observed" ? growthSnapshot.current[metric] : current;
  const change = compareCounts(old, now);
  const maximum = Math.max(old, now, 1);
  const reset = () => { setMetric("clicks"); setMode("observed"); setPrevious(5); setCurrent(54); setEvidence(0); };
  const selectMetric = (value: Metric) => { setMetric(value); setPrevious(growthSnapshot.previous[value]); setCurrent(growthSnapshot.current[value]); };
  const editCount = (setter: (n: number) => void, value: string) => setter(Math.min(1000000, Math.max(0, Math.round(Number(value) || 0))));
  return <div className="lab-experiment" id="growth-readout">
    <div className="lab-experiment-heading"><div><span className="lab-eyebrow">02 / Make the evidence useful</span><h2>A big percentage.<br />The complete picture.</h2><p>Explore SFC Surf School’s search growth, then change the inputs to see why the baseline belongs beside the headline.</p></div><span className={`lab-status ${mode === "demo" ? "lab-status-demo" : ""}`}><span />{mode === "observed" ? "Recorded SFC data" : "Illustrative inputs"}</span></div>
    <div className="lab-controls lab-growth-controls"><label>Measure<select value={metric} onChange={e => selectMetric(e.target.value as Metric)}><option value="clicks">Search clicks</option><option value="impressions">Search impressions</option></select></label><div className="lab-control-group"><span>Explore</span><div className="lab-segmented"><button type="button" aria-pressed={mode === "observed"} onClick={() => setMode("observed")}>Recorded data</button><button type="button" aria-pressed={mode === "demo"} onClick={() => setMode("demo")}>Try your numbers</button></div></div><button className="lab-reset" type="button" onClick={reset}><RotateCcw size={15} /> Reset</button></div>
    {mode === "demo" && <div className="lab-demo-inputs"><label>Previous period<input type="number" min="0" max="1000000" step="1" value={previous} onChange={e => editCount(setPrevious, e.target.value)} /></label><label>Current period<input type="number" min="0" max="1000000" step="1" value={current} onChange={e => editCount(setCurrent, e.target.value)} /></label><p>Your inputs update the chart and calculations below. These values are an illustration, separate from the recorded SFC results.</p></div>}
    <div className="lab-growth-stage" aria-live="polite" aria-atomic="true"><div className="lab-growth-headline"><span>{metricLabel[metric]} · {mode === "observed" ? "28-day comparison" : "your comparison"}</span><strong>{change.percentage === null ? (now === 0 ? "No activity" : "New activity") : `${change.percentage > 0 ? "+" : ""}${format(change.percentage)}%`}</strong><p>{change.percentage === null ? "A zero baseline has no defined percentage increase." : "Change from the previous period"}</p><div className="lab-baseline"><b>{format(old)}</b><ArrowRight size={22} /><b>{format(now)}</b></div></div><div className="lab-bar-chart" role="img" aria-label={`${metricLabel[metric]}: previous ${old}, current ${now}. Absolute change ${change.change}.`}>
      <div className="lab-bar-row"><div><span>{mode === "observed" ? growthSnapshot.previous.label : "Previous period"}</span><b>{format(old)}</b></div><div className="lab-bar-track"><div className="lab-bar-previous" style={{ width: `${(old / maximum) * 100}%` }} /></div></div>
      <div className="lab-bar-row"><div><span>{mode === "observed" ? growthSnapshot.current.label : "Current period"}</span><b>{format(now)}</b></div><div className="lab-bar-track"><div className="lab-bar-current" style={{ width: `${(now / maximum) * 100}%` }} /></div></div>
      <div className="lab-chart-key"><span><i /> Previous</span><span><i /> Current</span><span>Bars start at zero</span></div>
    </div></div>
    <div className="lab-growth-facts"><div><span>Absolute change</span><strong>{change.change > 0 ? "+" : ""}{format(change.change)}</strong><p>{metric}</p></div><div><span>Current ÷ previous</span><strong>{change.multiplier === null ? "—" : `${format(change.multiplier)}×`}</strong><p>{change.multiplier === null ? "No defined ratio from zero" : "Previous period’s volume"}</p></div><div><span>{mode === "observed" ? "Comparison length" : "Interpretation"}</span><strong>{mode === "observed" ? "28 / 28" : "Demo"}</strong><p>{mode === "observed" ? "Days in each measured window" : "Editable scenario, not a forecast"}</p></div></div>
    <div className="lab-evidence"><div className="lab-evidence-steps" aria-label="Explore the evidence"><span className="lab-eyebrow">Readout → decision</span>{evidenceSteps.map((step, index) => <button type="button" key={step.label} onClick={() => setEvidence(index)} aria-pressed={evidence === index}><span>0{index + 1}</span>{step.label}<ArrowUpRight size={17} /></button>)}</div><article aria-live="polite"><h3>{evidenceSteps[evidence].title}</h3><p>{evidenceSteps[evidence].text}</p>{mode === "demo" && <small>This interpretation refers to the recorded SFC snapshot, not your illustrative inputs.</small>}</article></div>
    <p className="lab-method">Source: SFC Surf School’s Google Search Console, reviewed September 10, 2026. August 12–September 8 vs. July 15–August 11. Percentage change = (current − previous) ÷ previous × 100. This comparison alone does not isolate the effect of any one site change.</p>
  </div>;
}
