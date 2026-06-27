import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "What is AEO (Answer Engine Optimization)?",
    a: "AEO is the practice of optimizing content and entity data so that AI-powered answer engines — ChatGPT, Perplexity, Google AI Overviews, Bing Copilot — cite your brand, content, or expertise in their generated responses. It is not about ranking blue links; it is about being the source those systems cite."
  },
  {
    q: "What is GEO (Generative Engine Optimization)?",
    a: "GEO refers to the broader practice of optimizing digital presence for generative AI retrieval systems. While AEO focuses specifically on answer engines, GEO encompasses all forms of LLM-powered search and content generation. The two terms are used interchangeably in most enterprise contexts."
  },
  {
    q: "How is AEO measured?",
    a: "AEO is measured through prompt-set monitoring: constructing a representative set of queries your target audience might ask an AI engine, then tracking how often and how accurately your brand is cited across those prompts over time. Metrics include citation frequency, citation share (AI share-of-voice), citation quality, and citation velocity (rate of change)."
  },
  {
    q: "What is the difference between AEO and traditional SEO?",
    a: "Traditional SEO optimizes for position in a ranked list of links. AEO optimizes for citation in a generated text response. The underlying signals overlap significantly — entity recognition, structured data, topical authority, and content quality matter in both — but the measurement infrastructure, query construction, and success metrics are entirely different."
  },
  {
    q: "Which tools track AI citation visibility?",
    a: "Profound is the primary enterprise-grade platform for prompt-set monitoring and AI citation tracking. Custom Python pipelines using direct API calls to AI engines can supplement Profound for more granular query sets. Attribution remains partially probabilistic — AI engines do not expose full citation logs — but consistent prompt-set monitoring over 30/60/90-day windows produces reliable trend signals."
  },
  {
    q: "How long does it take to see AEO/GEO lift?",
    a: "In practice, meaningful citation lift from entity-graph and schema improvements typically shows within 30–90 days, depending on the domain's existing authority baseline and how frequently the target AI engines refresh their training or retrieval indexes. Citation velocity (rate of change) is often a more useful signal than absolute citation share in the early stages of a program."
  },
  {
    q: "What content changes improve AEO performance?",
    a: "Entity-rich content that directly answers definitional and comparison queries, structured FAQ sections with FAQPage schema, robust internal linking between topically related pages, Wikidata and Knowledge Graph validation, and citation-network building through earned mentions and structured data across authoritative sources."
  },
  {
    q: "Why should enterprise SEO teams prioritize AEO now?",
    a: "AI-generated answers now appear above organic results for a significant and growing share of informational and navigational queries. Brands that build AEO measurement infrastructure now will have 12–24 months of baseline data, iteration cycles, and learned methodology before this capability becomes a standard requirement. The window for first-mover advantage is closing."
  },
];

export default function AeoGeo() {
  return (
    <Layout>
      <SEO
        title="AEO/GEO Measurement Methodology · Mitchell Miller"
        description="Mitchell Miller's AEO/GEO measurement methodology: prompt-cluster construction, citation velocity tracking, AI share-of-voice benchmarking, and closed-loop optimization across ChatGPT, Perplexity, and Google AI Overviews."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }) }} />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-secondary">Home</Link>
          <span>/</span>
          <span className="text-primary font-medium">AEO/GEO Lab</span>
        </nav>

        <header className="mb-16">
          <p className="text-xs uppercase tracking-wider font-semibold text-secondary mb-3">AEO / GEO Lab</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-5" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            AEO/GEO Measurement Methodology
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl" style={{ lineHeight: 1.65 }}>
            A working, production-tested framework for measuring and improving brand visibility in AI-generated answers —
            across ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot.
          </p>
        </header>

        {/* Intro */}
        <section className="mb-16">
          <div className="prose prose-slate max-w-none">
            <p className="text-base text-muted-foreground leading-relaxed mb-4" style={{ lineHeight: 1.7 }}>
              AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) represent the next layer of search visibility — one that traditional rank tracking and GSC data cannot measure. When a user asks ChatGPT "what's the best healthcare SEO firm" or "who are the leading AEO practitioners," they receive a generated answer. That answer either cites you or it doesn't. No impression. No click. No keyword rank.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-4" style={{ lineHeight: 1.7 }}>
              Traditional SEO metrics are structurally blind to this outcome. An enterprise search program optimizing solely for blue-link rankings may be invisible in the channels that now serve the first touchpoint for a significant and growing share of high-intent queries.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed" style={{ lineHeight: 1.7 }}>
              This methodology operationalizes AEO/GEO measurement — making it reproducible, trackable, and actionable — using tooling and frameworks developed across enterprise client delivery at Clarity Digital.
            </p>
          </div>
        </section>

        {/* 4 sections */}
        <div className="space-y-14 mb-16">
          {[
            {
              num: "01",
              title: "Prompt-Cluster Construction",
              body: [
                "The foundation of AEO measurement is a representative prompt set — a curated collection of queries that mirror how your target audience actually interacts with AI engines.",
                "Prompt clusters are built across three surfaces: buyer-intent queries (\"best enterprise SEO agency for healthcare\"), brand-defense queries (\"what is [brand] known for\"), and competitive queries (\"who are the leading AEO practitioners\").",
                "A well-constructed prompt set of 100–300 prompts, run consistently across target engines, provides enough signal to detect citation share shifts, competitive position changes, and the impact of content and entity updates."
              ]
            },
            {
              num: "02",
              title: "Citation Velocity Tracking",
              body: [
                "Citation velocity is the rate of change in citation frequency across a prompt set over a defined time window — typically 30, 60, or 90 days. It is more useful than raw citation share in the early stages of a program, because it separates signal from baseline noise.",
                "Velocity is measured by running the full prompt set at consistent intervals, recording which brands are cited in each response, and calculating change rates against baseline. Profound automates the prompt execution and response logging at scale.",
                "Custom Python pipelines handle prompt normalization, response parsing, and citation attribution across engines with varying output formats."
              ]
            },
            {
              num: "03",
              title: "AI Share-of-Voice Benchmarking",
              body: [
                "AI share-of-voice (SOV) is the percentage of prompt responses in which a brand is cited, relative to the total prompt set. Competitive SOV adds a denominator: your citation share versus named competitors across the same prompt set.",
                "SOV benchmarking requires a consistent competitive set, a fixed prompt set, and a minimum tracking window of 30 days to produce reliable baselines. Results are reported as a percentage of prompts cited, broken down by engine, prompt cluster, and competitive position.",
                "The gap between your organic SOV and your AI SOV typically reveals an entity or content architecture problem — entities that are well-indexed in traditional search but poorly represented in AI retrieval corpora."
              ]
            },
            {
              num: "04",
              title: "Closed-Loop Optimization",
              body: [
                "The measurement infrastructure feeds directly into a prioritized fix queue. Input changes — entity graph updates, schema implementation, Wikidata validation, content additions, citation network building — are tagged and correlated with subsequent citation velocity shifts.",
                "This closed loop makes AEO/GEO iterative rather than speculative. Each intervention cycle produces measurable signal within 30–90 days, allowing the program to compound: high-signal interventions get replicated, low-signal ones get deprioritized.",
                "In one client case, entity-graph cleanup and schema refactoring across 31 pages moved citation share from 4.2% to 17.8% in 90 days across 240 tracked prompts."
              ]
            },
          ].map(section => (
            <div key={section.num}>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-2xl font-bold text-secondary/40 font-mono">{section.num}</span>
                <h2 className="text-xl font-bold text-primary">{section.title}</h2>
              </div>
              <div className="pl-12 space-y-3">
                {section.body.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed" style={{ lineHeight: 1.7 }}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tooling */}
        <section className="bg-muted/30 border border-border rounded-xl p-8 mb-16">
          <h2 className="text-lg font-bold text-primary mb-5">Tooling stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { tool: "Profound", role: "Primary platform for prompt-set monitoring, AI citation tracking, and share-of-voice reporting." },
              { tool: "Custom Python eval pipelines", role: "Prompt normalization, response parsing, citation extraction, and multi-engine result aggregation." },
              { tool: "Claude API / OpenAI API", role: "Direct prompt orchestration, response sampling, and citation pattern analysis across model families." },
              { tool: "Google Search Console", role: "Traditional organic baseline data, correlated against AI citation trends for full-funnel visibility." },
              { tool: "Schema validators + Wikidata", role: "Entity validation, structured data QA, and Knowledge Graph representation verification." },
              { tool: "BigQuery + Python (pandas/statsmodels)", role: "Citation trend analysis, velocity calculations, and statistical significance testing." },
            ].map(item => (
              <div key={item.tool} className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-primary mb-1">{item.tool}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div key={i} className="border-b border-border pb-6 last:border-0">
                <h3 className="font-semibold text-primary mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Interested in AEO/GEO measurement for your organization?</h2>
          <p className="text-primary-foreground/80 text-sm mb-6">I work with enterprise teams building AEO/GEO infrastructure from scratch and integrating it into existing SEO programs.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold bg-white text-primary hover:bg-white/90 h-10 px-6 transition-colors"
            >
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/case-studies/aeo-visibility-infrastructure"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 h-10 px-6 transition-colors"
            >
              See case study
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
