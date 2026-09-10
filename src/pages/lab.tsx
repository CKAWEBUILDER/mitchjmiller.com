import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, FlaskConical } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { publicPath } from "@/lib/paths";
import { DestinationIntent } from "@/components/lab/destination-intent";
import { GrowthReadout } from "@/components/lab/growth-readout";
import { ContentArchitecture } from "@/components/lab/content-architecture";
import "@/components/lab/lab.css";

const experiments = [
  { id: "intent", number: "01", name: "Destination intent", detail: "Query → customer need" },
  { id: "growth", number: "02", name: "Evidence & growth", detail: "Numbers → a decision" },
  { id: "architecture", number: "03", name: "Content systems", detail: "One field → many experiences" },
] as const;

type Experiment = typeof experiments[number]["id"];
function experimentFromHash(): Experiment {
  if (typeof window === "undefined") return "intent";
  const hash = window.location.hash;
  return hash === "#evidence" || hash === "#growth" ? "growth" : hash === "#architecture" ? "architecture" : "intent";
}

export default function Lab() {
  const [active, setActive] = useState<Experiment>(experimentFromHash);
  useEffect(() => {
    const syncHash = () => {
      if (["#intent", "#evidence", "#growth", "#architecture", ""].includes(window.location.hash)) setActive(experimentFromHash());
    };
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => { window.removeEventListener("hashchange", syncHash); window.removeEventListener("popstate", syncHash); };
  }, []);
  const selectExperiment = (value: Experiment) => {
    setActive(value);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${value === "growth" ? "evidence" : value}`);
  };
  return <Layout><SEO title="Interactive Lab" description="Explore Mitchell Miller’s working tools for destination search intent, honest growth reporting and reusable content architecture." canonical="https://mitchjmiller.com/lab/" /><div className="mjm-lab">
    <header className="lab-intro"><div className="lab-eyebrow"><FlaskConical size={17} /> MITCHELL MILLER / WORKING NOTES, MADE INTERACTIVE</div><div className="lab-intro-grid"><h1>Think it through.<br /><em>Then try it.</em></h1><div><p>Strategy is easier to understand when you can move the pieces. Three working explorations from the way I build search, content and measurement systems.</p><a href="#lab-workbench" className="lab-text-link">Open the workbench <ArrowDown size={18} /></a></div></div><div className="lab-intro-footer"><span>03 working experiments</span><span>Change the inputs. Follow the consequences.</span></div></header>
    <section className="lab-workbench" id="lab-workbench" aria-label="Interactive workbench"><div className="lab-experiment-nav" aria-label="Choose an experiment">{experiments.map(item => <button type="button" key={item.id} aria-pressed={active === item.id} aria-controls="lab-active-experiment" onClick={() => selectExperiment(item.id)}><span>{item.number}</span><strong>{item.name}<small>{item.detail}</small></strong><ArrowUpRight size={21} /></button>)}</div><div id="lab-active-experiment">{active === "intent" ? <DestinationIntent /> : active === "growth" ? <GrowthReadout /> : <ContentArchitecture />}</div></section>
    <aside className="lab-takeaway"><div><span className="lab-eyebrow">Take an idea with you</span><h2>A small tool. A useful conversation.</h2><p>The destination-intent explorer is also a standalone HTML file. Open it in your browser or download a copy to use in a workshop. It runs locally, without an account.</p></div><div className="lab-download-links"><a href={publicPath("/artifacts/destination-intent-explorer.html")} target="_blank" rel="noreferrer">Open the standalone tool <ArrowUpRight size={18} /></a><a href={publicPath("/artifacts/destination-intent-explorer.html")} download="Mitchell-Miller-Destination-Intent-Explorer.html">Download HTML <Download size={18} /></a></div></aside>
  </div></Layout>;
}
