import { useId, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { featuredStudySlugs, getStudyImage, studyCategories, studyEditorial, type StudyCategory } from "@/lib/case-study-editorial";
import "./portfolio-editorial.css";

type Study = (typeof caseStudies)[number];

export function CaseStudyCard({ study }: { study: Study }) {
  const editorial = studyEditorial[study.slug];
  const image = getStudyImage(study.slug);
  const metric = editorial?.metrics[0];
  return (
    <Link href={`/case-studies/${study.slug}`} className="portfolio-case-card">
      <div className="portfolio-card-media">
        {image && <img src={image.src} alt={image.alt} className={image.fit === "contain" ? "portfolio-image-contain" : undefined} loading="lazy" width={960} height={600} />}
        <span className="portfolio-card-label">{editorial?.category}</span>
      </div>
      <div className="portfolio-card-topline"><span>{editorial?.client}</span><ArrowUpRight aria-hidden="true" size={16} /></div>
      <h2 className="portfolio-card-title">{study.title}</h2>
      <p className="portfolio-card-copy">{editorial?.summary ?? study.thesis}</p>
      <div className="portfolio-card-outcome"><span><strong>{metric?.value}</strong>{metric?.label}</span><ArrowRight aria-hidden="true" size={16} /></div>
    </Link>
  );
}

export function LabCallout() {
  return <section className="portfolio-lab-callout">
    <div><p className="portfolio-kicker">Open the work</p><h2>Some ideas are better experienced.</h2><p>Explore interactive tools that make search strategy, data quality and system design easier to understand.</p></div>
    <Link className="portfolio-text-link" href="/lab">Enter the interactive lab <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </section>;
}

export function CaseStudyCollection({ mode = "work" }: { mode?: "work" | "stories" }) {
  const [filter, setFilter] = useState<StudyCategory>("All work");
  const [query, setQuery] = useState("");
  const id = useId();
  const ordered = useMemo(() => [...caseStudies].sort((a, b) => {
    const ai = featuredStudySlugs.indexOf(a.slug); const bi = featuredStudySlugs.indexOf(b.slug);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  }), []);
  const filtered = ordered.filter(study => {
    const editorial = studyEditorial[study.slug];
    return (filter === "All work" || editorial?.category === filter) && `${study.title} ${study.thesis} ${study.tools} ${editorial?.client} ${editorial?.summary}`.toLowerCase().includes(query.toLowerCase().trim());
  });
  return <div className="portfolio-shell">
    <header>
      <p className="portfolio-kicker">{mode === "stories" ? "Case studies / Decisions, systems & outcomes" : "The work / From enterprise to independent"}</p>
      <h1 className="portfolio-display">{mode === "stories" ? "The thinking behind the things I build." : "Search strategy. Shipped systems. Visible progress."}</h1>
      <p className="portfolio-intro">{mode === "stories" ? "How I turn a complicated problem into a useful product, bring people with me and measure what happened next." : "Apple-scale commerce, healthcare infrastructure, practical AI products and a surf school finding its next customer. Different scales. The same commitment to making the work useful."}</p>
    </header>
    <div className="portfolio-control-bar">
      <div className="portfolio-filters" role="group" aria-label="Filter work by discipline">
        {studyCategories.map(category => <button type="button" key={category} className="portfolio-filter" onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>)}
      </div>
      <div className="portfolio-search"><label htmlFor={id}>Find a project or capability</label><input id={id} type="search" placeholder="Try healthcare, AI, or SFC" value={query} onChange={event => setQuery(event.target.value)} /></div>
    </div>
    <p className="portfolio-count" role="status">{filtered.length} {filtered.length === 1 ? "case study" : "case studies"}{filter !== "All work" ? ` / ${filter}` : " / Selected across the years"}</p>
    {filtered.length ? <div className="portfolio-grid">{filtered.map(study => <CaseStudyCard key={study.slug} study={study} />)}</div> : <div className="portfolio-empty"><p>No projects match that combination.</p><button className="portfolio-filter" onClick={() => { setFilter("All work"); setQuery(""); }}>Show all work</button></div>}
    <LabCallout />
  </div>;
}
