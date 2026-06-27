import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { ArrowRight, FileText, Mail, ExternalLink } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { headshot, portfolioImages } from "@/lib/images";

const featuredSlugs = [
  "apple-seasonal-search",
  "commonspirit-locations-conversion-engine",
  "commonspirit-medical-content-library",
  "stanford-myhealth-seo",
];

const aiSystemSlugs = [
  "claritypulse-ai-reporting",
  "searchforge-content-intelligence",
  "actionthread-transcript-execution",
  "aeo-visibility-infrastructure",
];

const proofMetrics = [
  { value: "$15.21M", label: "attributable revenue (FY22)", source: "CommonSpirit Health" },
  { value: "4.9M+", label: "organic sessions (peak)", source: "CommonSpirit Health" },
  { value: "1,000+", label: "Yext entity pages", source: "CommonSpirit Health" },
  { value: "88K", label: "appointments + 175K calls/directions", source: "CommonSpirit Health (FY22)" },
  { value: "38+ countries", label: "· 138 hreflang variants", source: "Apple" },
  { value: "60+", label: "stakeholder audiences presented", source: "Apple" },
];

const liveWork = [
  {
    title: "Dignity Health Orthopedic Surgery Service-Line Surface",
    url: "https://www.dignityhealth.org/conditions-and-treatments/orthopedics/orthopedic-surgery",
    description: "Representative live service-line page from the healthcare content architecture and patient acquisition system."
  },
  {
    title: "CommonSpirit Services & Specialties Library",
    url: "https://www.commonspirit.org/services-specialties/",
    description: "Scalable service-line discovery surface for a 1,000+ location healthcare network."
  },
];

export default function Home() {
  const featuredCases = caseStudies.filter(c => featuredSlugs.includes(c.slug));
  const aiSystems = caseStudies.filter(c => aiSystemSlugs.includes(c.slug));

  return (
    <Layout>
      <SEO
        title="Mitchell Miller — Director of SEO, AEO/GEO & AI Search Systems"
        description="Senior search and AI-growth leader with a decade owning enterprise organic at Apple, CommonSpirit, and Stanford Health Care. $15.21M FY22 attributable revenue, 4.9M+ organic sessions, three shipped AI products."
      />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary mb-3" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Mitchell Miller
              </h1>
              <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-6">
                Director of SEO, AEO/GEO &amp; AI Search Systems
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl" style={{ lineHeight: 1.65 }}>
                Decade of enterprise organic at Apple, Stanford Health Care, and a 1,000+ location healthcare network.
                Operationalizing AEO/GEO measurement before most teams have the metrics.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/aeo-geo"
                  className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6"
                  data-testid="link-aeo-geo-lab"
                >
                  View AEO/GEO Lab <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-5"
                  data-testid="link-download-resume"
                >
                  Download Resume <FileText className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-5"
                  data-testid="link-contact"
                >
                  Contact <Mail className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-muted/40 border border-border rounded-lg px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Open to remote and hybrid roles</p>
                <p className="text-sm text-primary leading-relaxed">
                  SEO Director · AEO/GEO Lead · AI Search Strategist · Technical SEO/Product Manager · Organic Growth Lead · Website Growth Lead
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-border shadow-lg bg-muted">
                <img
                  src={headshot}
                  alt="Mitchell Miller — Director of SEO, AEO/GEO & AI Search Systems"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Proof strip */}
          <div className="mt-12 pt-8 border-t border-border/60">
            <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">Enterprise experience</p>
            <div className="flex flex-wrap gap-6 items-center">
              {["Apple", "CommonSpirit Health", "Stanford Health Care", "Clarity Digital"].map(name => (
                <span key={name} className="text-sm font-semibold text-primary/70 tracking-tight">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl font-bold mb-10 text-primary">What I lead.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                track: "Track 1",
                title: "Enterprise SEO & Technical Search",
                body: "Multi-location architecture, entity systems, JS rendering, migrations, Core Web Vitals, Knowledge Graph.",
                proof: "Anchor proof: Apple, CommonSpirit, Stanford.",
                link: "/work",
              },
              {
                track: "Track 2",
                title: "AEO / GEO & AI Search Measurement",
                body: "Profound-based citation tracking, AI share-of-voice across ChatGPT, Perplexity, Google AI Overviews. Closed-loop measurement on a category most haven't operationalized.",
                proof: "Anchor proof: Clarity Digital enterprise portfolio.",
                link: "/aeo-geo",
              },
              {
                track: "Track 3",
                title: "Applied AI Systems & Selected Builds",
                body: "LLM workflows, agent orchestration, internal product builds. ClarityPulse, SearchForge, and ActionThread shipped end-to-end.",
                proof: "Anchor proof: 3 internal AI products replacing Looker Studio, Surfer SEO, Fireflies.",
                link: "/selected-builds",
              },
            ].map(item => (
              <div key={item.track} className="bg-card border border-border rounded-xl p-6 flex flex-col">
                <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2">{item.track}</p>
                <h3 className="font-bold text-lg text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{item.body}</p>
                <p className="text-xs text-muted-foreground border-t border-border pt-3 mb-3">{item.proof}</p>
                <Link href={item.link} className="text-sm font-medium text-secondary hover:underline flex items-center">
                  See work <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Metrics */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl font-bold mb-3 text-primary">What it produced.</h2>
          <p className="text-muted-foreground text-sm mb-10">Sourced, specific, verifiable.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {proofMetrics.map((m, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-3xl font-bold text-primary mb-1" style={{ letterSpacing: "-0.02em" }}>{m.value}</p>
                <p className="text-sm text-muted-foreground mb-2 leading-snug">{m.label}</p>
                <p className="text-xs font-medium text-secondary/70">{m.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Enterprise Work */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-primary">Selected work.</h2>
            <Link href="/work" className="text-sm text-secondary font-medium hover:underline flex items-center">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {featuredCases.map((cs) => {
              const image = portfolioImages[cs.slug];
              return (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`} data-testid={`card-case-study-${cs.slug}`}>
                  <div className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                    <div className="aspect-video bg-muted flex items-center justify-center border-b border-border overflow-hidden relative">
                      {image ? (
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs font-medium p-6 text-center">{cs.placeholder}</span>
                      )}
                      {image?.status === "placeholder" && (
                        <span className="absolute bottom-3 left-3 rounded bg-background/90 px-2 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm">
                          Proof asset pending
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-2">{cs.role}</p>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{cs.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{cs.thesis}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AEO/GEO Lab */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-3">The differentiator</p>
              <h2 className="text-2xl font-bold text-primary mb-4">AEO / GEO Lab — measurement most teams haven't operationalized.</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                While most SEO programs are still learning what AEO stands for, this infrastructure has been running in production: tracking citation velocity, monitoring AI share-of-voice, and feeding those findings back into entity and content strategy.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                {[
                  "Prompt-cluster construction across buyer-intent, brand-defense, and competitive surfaces",
                  "Citation velocity tracking across ChatGPT, Perplexity, Google AI Overviews",
                  "AI share-of-voice benchmarking against competitor sets",
                  "Closed-loop: entity/schema/content changes → citation lift measured over 30/60/90 days",
                  "Tooling: Profound + custom Python eval pipelines + Claude API for prompt orchestration",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/aeo-geo"
                className="inline-flex items-center text-sm font-semibold text-secondary hover:underline"
                data-testid="link-aeo-geo-methodology"
              >
                Read the full methodology <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">Representative output</p>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-xs font-semibold text-secondary mb-1">Citation velocity shift — 90 days</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tracked enterprise client across 240 prompts. Citation share moved from 4.2% → 17.8% after entity-graph cleanup, schema refactor, and Wikidata validation.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-xs font-semibold text-secondary mb-1">Engines monitored</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["ChatGPT", "Perplexity", "Google AI Overviews", "Bing Copilot"].map(e => (
                      <span key={e} className="text-xs bg-card border border-border rounded px-2 py-1 text-muted-foreground">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-xs font-semibold text-secondary mb-1">Tooling stack</p>
                  <p className="text-sm text-muted-foreground">Profound · Custom Python pipelines · Claude API · GSC · Schema markup validators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Search Systems */}
      <section className="py-20 bg-primary text-primary-foreground border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl font-bold mb-2 text-white">AI Search &amp; Internal Product Systems</h2>
          <p className="text-primary-foreground/70 mb-10 text-sm max-w-xl">
            Internal product concepts, measurement infrastructure, and workflow systems designed around real reporting, content intelligence, and execution gaps.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {aiSystems.map(system => (
              <Link key={system.slug} href={`/case-studies/${system.slug}`} data-testid={`card-ai-system-${system.slug}`}>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-5 h-full hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                  <h3 className="font-bold text-base text-white mb-2">{system.title}</h3>
                  <p className="text-primary-foreground/75 text-sm leading-relaxed">{system.thesis}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Enterprise Surfaces */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl font-bold mb-2 text-primary">Live work — enterprise surfaces I built or led.</h2>
          <p className="text-muted-foreground text-sm mb-10">Published, indexable, and still serving patients and search engines at scale.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {liveWork.map(item => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all flex flex-col"
                data-testid={`link-live-work-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-base text-primary group-hover:text-secondary transition-colors">{item.title}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                <p className="text-xs text-secondary font-mono mt-auto">{item.url.replace("https://", "")}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-primary">Signals &amp; Systems</h2>
            <Link href="/blog" className="text-sm text-secondary font-medium hover:underline flex items-center">
              View all posts <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/blog/mitchell-miller-journey" data-testid="link-blog-journey">
              <div className="group cursor-pointer">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">June 2026 · Published</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors leading-snug">
                  The Long Road to Systems Thinking: My Journey in Search, AI, and Building Things
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  From agency environments to Apple-scale SEO programs, and why search in 2026 feels like being at the edge of a new map.
                </p>
              </div>
            </Link>
            <Link href="/blog/traditional-seo-to-ai-search" data-testid="link-blog-ai-search">
              <div className="group cursor-pointer">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Draft · Coming Soon</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors leading-snug">
                  From Traditional SEO to AI Search: What Actually Changed
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A breakdown of how information retrieval has shifted from blue links to generated answers, and what it means for enterprise strategy.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
