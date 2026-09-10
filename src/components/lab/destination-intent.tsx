import { useState } from "react";
import { ArrowRight, Compass, Globe2, MapPin, RotateCcw, Search } from "lucide-react";
import { intentScenarios, interpretIntent, type IntentScenario, type Origin } from "./models";

export function DestinationIntent() {
  const [scenario, setScenario] = useState<IntentScenario>("private");
  const [origin, setOrigin] = useState<Origin>("connecticut");
  const result = interpretIntent(scenario, origin);
  return <div className="lab-experiment" id="destination-intent">
    <div className="lab-experiment-heading"><div><span className="lab-eyebrow">01 / Read the intent</span><h2>Where someone is.<br />Where they want to go.</h2><p>A destination in the query tells you something valuable. Move the searcher and see which signals stay the same.</p></div><span className="lab-status"><span /> Strategy model</span></div>
    <div className="lab-controls">
      <label>What are they searching for?<select value={scenario} onChange={e => setScenario(e.target.value as IntentScenario)}>{Object.entries(intentScenarios).map(([key, value]) => <option key={key} value={key}>{value.query}</option>)}</select></label>
      <label>Where are they searching from?<select value={origin} onChange={e => setOrigin(e.target.value as Origin)}><option value="connecticut">Connecticut · planning from afar</option><option value="waikiki">Waikīkī · already there</option><option value="unknown">Current location unknown</option></select></label>
      <button className="lab-reset" type="button" onClick={() => { setScenario("private"); setOrigin("connecticut"); }}><RotateCcw size={15} /> Reset</button>
    </div>
    <div className="lab-intent-canvas" aria-live="polite" aria-atomic="true">
      <div className="lab-signal-map" aria-hidden="true"><svg viewBox="0 0 1000 240" preserveAspectRatio="none"><defs><pattern id="lab-grid" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" /></pattern></defs><rect width="1000" height="240" fill="url(#lab-grid)" /><path d="M160 145 C320 0 660 0 830 145" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" /><path d="M160 145 Q500 270 830 145" fill="none" stroke="currentColor" strokeWidth="1" /></svg></div>
      <div className="lab-signal-origin"><Globe2 size={24} /><span>SEARCHER</span><strong>{origin === "connecticut" ? "Connecticut" : origin === "waikiki" ? "Waikīkī" : "Location unknown"}</strong><small>Current location</small></div>
      <div className="lab-query-card"><Search size={19} /><span>{result.query}</span><strong>{result.intent}</strong></div>
      <div className="lab-signal-destination"><MapPin size={27} /><span>DESTINATION</span><strong>{result.destination}</strong><small>{result.explicit ? "Named in the query" : "Supplied by context"}</small></div>
    </div>
    <div className="lab-interpretation" aria-live="polite"><Compass size={22} /><p>{result.originNote}</p></div>
    <div className="lab-result-grid"><article><span className="lab-eyebrow">Organic discovery</span><h3>Answer the actual need.</h3><p>{result.organic}</p></article><article><span className="lab-eyebrow">Maps & local evaluation</span><h3>Make the business easy to choose.</h3><p>{result.maps}</p></article></div>
    <div className="lab-next-step"><ArrowRight size={19} /><p><strong>Build around this:</strong> {result.content}</p></div>
    <p className="lab-method">This is a strategy explorer, not a live search-results preview. The mix of Maps, organic pages and directories varies by query and context. <a href="https://support.google.com/business/answer/7091?hl=en" target="_blank" rel="noreferrer">Google’s local-ranking guide ↗</a></p>
  </div>;
}
