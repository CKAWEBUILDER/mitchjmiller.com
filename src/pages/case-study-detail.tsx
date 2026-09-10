import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { CaseStudyCard, LabCallout } from "@/components/case-study-collection";
import { caseStudies } from "@/lib/data";
import { getStudyImage, studyEditorial } from "@/lib/case-study-editorial";
import { publicPath } from "@/lib/paths";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import "@/components/portfolio-editorial.css";

export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:slug");
  const study = caseStudies.find(item => item.slug === params?.slug);
  const editorial = study ? studyEditorial[study.slug] : undefined;
  const image = study ? getStudyImage(study.slug) : undefined;

  if (!study || !editorial) return <Layout><SEO title="Case study not found | Mitchell Miller" description="Explore Mitchell Miller’s case studies and selected work." /><div className="portfolio-shell"><p className="portfolio-kicker">Case studies</p><h1 className="portfolio-display">That story isn’t here.</h1><p className="portfolio-intro">Explore the full collection of search, growth and product work.</p><Link href="/work" className="portfolio-text-link">Return to the work <ArrowUpRight size={16} /></Link></div></Layout>;

  const related = caseStudies.filter(item => item.slug !== study.slug && studyEditorial[item.slug]?.category === editorial.category).slice(0, 2);
  return <Layout>
    <SEO title={`${study.title} | Mitchell Miller`} description={editorial.summary} />
    <article className="portfolio-shell">
      <Link href="/case-studies" className="portfolio-back"><ArrowLeft size={14} aria-hidden="true" /> All case studies</Link>
      <header>
        <p className="portfolio-kicker">{editorial.client} / {editorial.category}</p>
        <h1 className="portfolio-detail-heading">{editorial.headline}</h1>
        <p className="portfolio-detail-deck">{editorial.summary}</p>
        <dl className="portfolio-detail-meta">
          <div><dt>My role</dt><dd>{study.role}</dd></div>
          <div><dt>Context</dt><dd>{editorial.accent}</dd></div>
          <div><dt>Engagement</dt><dd>{editorial.period}</dd></div>
        </dl>
        {editorial.links && <div className="portfolio-detail-links">{editorial.links.map(link => link.external ? <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="portfolio-text-link">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a> : <Link key={link.href} href={link.href} className="portfolio-text-link">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>}
      </header>
      {image && <figure className="portfolio-hero-proof"><div className="portfolio-proof-image"><img src={image.src} alt={image.alt} width={1440} height={900} /></div><figcaption className="portfolio-proof-caption"><span>{image.note?.replace("; replace with a redacted Profound-style dashboard if available.", "; no client data shown.")}</span>{image.sourceUrl && <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">View public source ↗</a>}</figcaption></figure>}
      <section className={`portfolio-metrics portfolio-metrics-${editorial.metrics.length}`} aria-label="Project outcomes and scale">
        {editorial.metrics.map(metric => <div className="portfolio-metric" key={metric.label}><strong className="portfolio-metric-value">{metric.value}</strong><span className="portfolio-metric-label">{metric.label}</span><span className="portfolio-metric-note">{metric.note}</span></div>)}
      </section>
      <div className="portfolio-story-layout">
        <aside className="portfolio-sidebar">
          <dl><div><dt>Working with</dt><dd>{study.partners}</dd></div><div><dt>Tools & disciplines</dt><dd>{study.tools}</dd></div></dl>
          <nav className="portfolio-toc" aria-label="In this case study"><p className="portfolio-kicker">In the story</p>{editorial.chapters.map((chapter, index) => <a key={chapter.title} href={`#chapter-${index + 1}`}>{String(index + 1).padStart(2, "0")} / {chapter.title}</a>)}<a href="#evidence">Sources & interpretation</a></nav>
        </aside>
        <div>
          {editorial.chapters.map((chapter, index) => <section key={chapter.title} id={`chapter-${index + 1}`} className="portfolio-chapter"><div className="portfolio-chapter-index">{String(index + 1).padStart(2, "0")} / {index === 0 ? "The starting point" : index === editorial.chapters.length - 1 ? "The result" : "The work"}</div><h2>{chapter.title}</h2>{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          {study.slug === "sfc-surf-school" && <figure className="portfolio-insights"><img src={publicPath("/images/portfolio-proof/sfc-search-console-insights.jpg")} alt="Google Search Console Insights showing 54 clicks, up 980 percent, and 1.65 thousand impressions, up 251 percent, with top-performing SFC pages" width={1035} height={751} loading="lazy" /><figcaption>Original Search Console Insights capture from September 10. Comparison: August 12–September 8 versus July 15–August 11, 2026. Account controls are cropped out; the report itself is unchanged.</figcaption></figure>}
          {study.slug === "commonspirit-locations-conversion-engine" && <div className="portfolio-proof-pair"><figure><img src={publicPath("/images/proof-optimized/dignity-wayback-locations-nav-2018.png")} alt="Archived 2018 Dignity Health site with separate regional location navigation" loading="lazy" /><figcaption>Before: regional location navigation on the archived 2018 Dignity Health site.</figcaption></figure><figure><img src={publicPath("/images/proof-optimized/dignity-locations-conversion-engine.png")} alt="Current CommonSpirit location finder showing structured facility discovery" loading="lazy" /><figcaption>Current public location finder, illustrating the continuing structured discovery experience.</figcaption></figure></div>}
          <div className="portfolio-takeaway"><span>The principle I carry forward</span><p>{editorial.takeaway}</p></div>
          <p id="evidence" className="portfolio-evidence"><strong>Sources & interpretation.</strong> {editorial.evidence}</p>
        </div>
      </div>
      {related.length > 0 && <section className="portfolio-related"><p className="portfolio-kicker">Continue exploring</p><h2>Related work</h2><div className="portfolio-grid">{related.map(item => <CaseStudyCard key={item.slug} study={item} />)}</div></section>}
      <LabCallout />
    </article>
  </Layout>;
}
