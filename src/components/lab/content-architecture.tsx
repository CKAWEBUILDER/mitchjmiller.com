import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, GitBranch, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { architectureLayers, architecturePresets, type ArchitecturePreset } from "./models";

type Layer = typeof architectureLayers[number]["key"];
export function ContentArchitecture() {
  const [preset, setPreset] = useState<ArchitecturePreset>("local");
  const [layer, setLayer] = useState<Layer>("content");
  const [sharedValue, setSharedValue] = useState(architecturePresets.local.defaultValue);
  const [override, setOverride] = useState(false);
  const system = architecturePresets[preset];
  const selectPreset = (value: ArchitecturePreset) => { setPreset(value); setSharedValue(architecturePresets[value].defaultValue); setOverride(false); };
  return <div className="lab-experiment" id="content-architecture">
    <div className="lab-experiment-heading"><div><span className="lab-eyebrow">03 / Design the system</span><h2>One useful model.<br />Many better experiences.</h2><p>Follow the architecture from source records to customer actions. Then edit a shared field and see reuse happen.</p></div><span className="lab-status"><span /> Working architecture demo</span></div>
    <div className="lab-controls"><label>Explore an approach<select value={preset} onChange={e => selectPreset(e.target.value as ArchitecturePreset)}>{Object.entries(architecturePresets).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label><p className="lab-preset-context">Based on <strong>{system.basedOn}</strong></p><button type="button" className="lab-reset" onClick={() => { selectPreset("local"); setLayer("content"); }}><RotateCcw size={15} /> Reset</button></div>
    <div className="lab-architecture"><div className="lab-layer-grid" aria-label="Architecture layers">{architectureLayers.map(item => <button type="button" className="lab-layer" key={item.key} aria-pressed={layer === item.key} onClick={() => setLayer(item.key)}><span>{item.number}<ArrowUpRight size={17} /></span><strong>{item.label}</strong><small>{item.caption}</small></button>)}</div><article className="lab-layer-detail" aria-live="polite"><GitBranch size={28} /><span className="lab-eyebrow">{architectureLayers.find(item => item.key === layer)?.label}</span><h3>{system[layer]}</h3><p>{system.summary}</p><Link href={`/case-studies/${system.slug}`} className="lab-text-link">Explore the case study <ArrowUpRight size={17} /></Link></article></div>
    <div className="lab-reuse"><div className="lab-reuse-description"><span className="lab-eyebrow">Try the reusable field</span><h3>Change it once.<br />See it travel.</h3><p>A shared value feeds three sample outputs. A local override lets one experience differ without duplicating the whole template.</p></div><div className="lab-reuse-model"><label>{system.field}<input value={sharedValue} maxLength={64} onChange={e => setSharedValue(e.target.value)} aria-describedby="lab-field-hint" /></label><small id="lab-field-hint">Edit this field to update the connected outputs.</small><div className="lab-flow-arrow"><ArrowDown size={23} /></div><div className="lab-output-grid" aria-live="polite">{system.pages.map((page, index) => <div key={page} className={override && index === 2 ? "lab-output lab-output-override" : "lab-output"}><span>{page}</span><strong>{override && index === 2 ? system.override : sharedValue || "Add a shared value above"}</strong><small>{override && index === 2 ? <><GitBranch size={13} /> Local override</> : <><Check size={13} /> Shared field</>}</small></div>)}</div><label className="lab-toggle"><input type="checkbox" checked={override} onChange={e => setOverride(e.target.checked)} /><span>Give “{system.pages[2]}” its own local value</span></label></div></div>
    <p className="lab-method">This interactive explains methods from the linked portfolio case studies. The three sample outputs demonstrate field reuse; they are not a production CMS, client record set or measurement of time saved.</p>
  </div>;
}
