import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { caseStudies } from "@/lib/data";
import { caseStudyImages } from "@/lib/images";
import { Link } from "wouter";
import { useState } from "react";

const gradientMap: Record<string, string> = {
  "apple-seasonal-search": "from-slate-800 to-slate-600",
  "apple-store-amr": "from-slate-800 to-slate-600",
  "apple-education-store": "from-slate-800 to-slate-600",
  "stanford-myhealth-seo": "from-red-900 to-red-700",
  "commonspirit-locations-conversion-engine": "from-blue-900 to-blue-700",
  "commonspirit-network-consolidation": "from-blue-900 to-blue-700",
  "commonspirit-medical-content-library": "from-blue-900 to-blue-700",
  "aem-content-fragmentation-architecture": "from-orange-900 to-orange-700",
  "yext-entity-data-foundation": "from-violet-900 to-violet-700",
  "claritypulse-ai-reporting": "from-sky-700 to-sky-500",
  "searchforge-content-intelligence": "from-emerald-800 to-emerald-600",
  "actionthread-transcript-execution": "from-indigo-800 to-indigo-600",
  "aeo-visibility-infrastructure": "from-teal-800 to-teal-600",
  "domainsignal": "from-zinc-700 to-zinc-500",
  "date-night": "from-rose-800 to-rose-600",
  "vet-advocates-growth-system": "from-green-800 to-green-600",
};

function CardPlaceholder({ slug, title }: { slug: string; title: string }) {
  const gradient = gradientMap[slug] ?? "from-slate-700 to-slate-500";
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-end p-5`}>
      <span className="text-white/80 text-sm font-semibold leading-tight">{title}</span>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Enterprise SEO", "AEO/GEO & AI Search", "AI Products", "Growth Systems", "Side Projects"];

  // Mapping slugs to categories (for the sake of the static demo)
  const categoryMap: Record<string, string> = {
    'apple-seasonal-search': 'Enterprise SEO',
    'apple-store-amr': 'Enterprise SEO',
    'apple-education-store': 'Enterprise SEO',
    'stanford-myhealth-seo': 'Enterprise SEO',
    'commonspirit-locations-conversion-engine': 'Enterprise SEO',
    'commonspirit-network-consolidation': 'Enterprise SEO',
    'commonspirit-medical-content-library': 'Enterprise SEO',
    'aem-content-fragmentation-architecture': 'Enterprise SEO',
    'yext-entity-data-foundation': 'Enterprise SEO',
    'claritypulse-ai-reporting': 'AI Products',
    'searchforge-content-intelligence': 'AI Products',
    'actionthread-transcript-execution': 'AI Products',
    'aeo-visibility-infrastructure': 'AEO/GEO & AI Search',
    'domainsignal': 'Side Projects',
    'date-night': 'Side Projects',
    'vet-advocates-growth-system': 'Growth Systems'
  };

  const filteredStudies = filter === "All" 
    ? caseStudies 
    : caseStudies.filter(c => categoryMap[c.slug] === filter);

  return (
    <Layout>
      <SEO 
        title="Work | Mitchell Miller" 
        description="Portfolio of work across Enterprise SEO, AEO/GEO, and AI Products."
      />
      <div className="container mx-auto px-4 md:px-8 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Work</h1>
        
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`}>
              <div className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video border-b border-border relative overflow-hidden">
                  {caseStudyImages[study.slug] ? (
                    <img
                      src={caseStudyImages[study.slug]}
                      alt={study.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <CardPlaceholder slug={study.slug} title={study.title} />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{categoryMap[study.slug]}</span>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-secondary transition-colors">{study.title}</h3>
                  <p className="text-muted-foreground text-sm mt-auto">{study.thesis}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
