import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { LabCallout } from "@/components/case-study-collection";
import { vibeProjects } from "@/lib/data";
import { publicPath } from "@/lib/paths";
import "@/components/portfolio-editorial.css";

const destinations: Record<string, { href: string; label: string; type: string }> = {
  DomainSignal: { href: "/case-studies/domainsignal", label: "Inside the build", type: "Independent prototype" },
  ClarityPulse: { href: "/case-studies/claritypulse-ai-reporting", label: "Read the case study", type: "Clarity AI · internal work" },
  SearchForge: { href: "/case-studies/searchforge-content-intelligence", label: "Inside the build", type: "Independent prototype" },
  ActionThread: { href: "/case-studies/actionthread-transcript-execution", label: "Inside the workflow", type: "Independent prototype" },
  "AEO Visibility Infrastructure": { href: "/case-studies/aeo-visibility-infrastructure", label: "Read the approach", type: "Clarity AI · measurement system" },
  "Date Night": { href: "/case-studies/date-night", label: "Inside the build", type: "Independent prototype" },
  "Clear Kayak Adventures": { href: "/contact", label: "Ask me about the project", type: "Small-business operations" },
  FolioTrack: { href: "/contact", label: "Ask me about the prototype", type: "Personal finance prototype" },
  "Vet Advocates": { href: "/case-studies/vet-advocates-growth-system", label: "Read the case study", type: "Pro bono growth system" },
  "SFC South Shore Explorer": { href: "/case-studies/sfc-surf-school", label: "Explore the case study", type: "Client product · released September 2026" },
};
const projects = [
  { name: "SFC South Shore Explorer", category: "Mobile & Web Apps", description: "A real aerial, ten surf breaks, original-source footage and connected guides. Local knowledge becomes an experience people can explore.", goal: "Help visitors understand Waikīkī’s surf and plan their lesson.", image: publicPath("/images/portfolio-proof/sfc-south-shore-explorer.png") },
  ...vibeProjects,
];
const categories = ["All builds", "Research & AI", "Mobile & Web Apps", "Process Automation", "Volunteer & Community", "Finance Tools"];

export default function VibeCoding() {
  const [filter, setFilter] = useState("All builds");
  const visible = projects.filter(project => filter === "All builds" || project.category === filter);
  return <Layout>
    <SEO title="Selected Builds | Mitchell Miller" description="Explore working client products, internal AI systems and independent prototypes by Mitchell Miller—from a Waikīkī surf explorer to source-aware reporting." />
    <div className="portfolio-shell">
      <header><p className="portfolio-kicker">Selected builds / Ideas made tangible</p><h1 className="portfolio-display">I like to find out by building.</h1><p className="portfolio-intro">Client products, internal tools and independent experiments. Each begins with a practical question: could this be clearer, easier or more useful?</p><div className="portfolio-detail-links"><Link href="/lab" className="portfolio-text-link">Try the interactive lab <ArrowUpRight size={17} aria-hidden="true" /></Link></div></header>
      <div className="portfolio-control-bar"><div className="portfolio-filters" role="group" aria-label="Filter selected builds">{categories.map(category => <button key={category} className="portfolio-filter" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
      <p className="portfolio-count" role="status">{visible.length} {visible.length === 1 ? "build" : "builds"} / {filter}</p>
      <div className="portfolio-build-grid">{visible.map(project => {
        const destination = destinations[project.name];
        const representative = ["ClarityPulse", "SearchForge", "ActionThread", "AEO Visibility Infrastructure", "FolioTrack"].includes(project.name);
        return <article className="portfolio-build-card" key={project.name}>
          <Link href={destination.href} tabIndex={-1} aria-hidden="true" className="portfolio-card-media"><img src={project.image} alt="" loading="lazy" width={800} height={600} />{representative && <span className="portfolio-card-label">Representative interface</span>}</Link>
          <span className="portfolio-kicker">{destination.type}</span><h2>{project.name}</h2><p>{project.description}</p><p><strong>Built to:</strong> {project.goal.charAt(0).toLowerCase() + project.goal.slice(1)}</p><Link href={destination.href} className="portfolio-text-link">{destination.label} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </article>;
      })}</div>
      <LabCallout />
    </div>
  </Layout>;
}
