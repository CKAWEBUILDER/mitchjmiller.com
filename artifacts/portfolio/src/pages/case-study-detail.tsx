import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { caseStudies } from "@/lib/data";
import { caseStudyImages } from "@/lib/images";
import { Link, useRoute } from "wouter";

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

function DetailPlaceholder({ slug, title }: { slug: string; title: string }) {
  const gradient = gradientMap[slug] ?? "from-slate-700 to-slate-500";
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-end p-8`}>
      <span className="text-white/70 text-base font-semibold leading-snug">{title}</span>
    </div>
  );
}

export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:slug");
  const study = caseStudies.find(c => c.slug === params?.slug);

  if (!study) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link href="/work" className="text-secondary hover:underline">Return to Work</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={`${study.title} | Mitchell Miller`} 
        description={study.thesis}
      />
      
      {/* Hero */}
      <div className="bg-muted/30 border-b border-border pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{study.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {study.thesis}
          </p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div>
              <span className="block font-bold text-primary mb-1 uppercase tracking-wider text-xs">Role</span>
              <span className="text-muted-foreground">{study.role}</span>
            </div>
            <div>
              <span className="block font-bold text-primary mb-1 uppercase tracking-wider text-xs">Context</span>
              <span className="text-muted-foreground">{study.context}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-16">
        
        {/* Visual Hero */}
        <div className="aspect-video rounded-xl border border-border shadow-sm mb-16 overflow-hidden relative">
          {caseStudyImages[study.slug] ? (
            <img
              src={caseStudyImages[study.slug]}
              alt={study.title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <DetailPlaceholder slug={study.slug} title={study.title} />
          )}
          {(study as any).isMockup && (
            <span className="absolute bottom-3 right-3 bg-background/90 border border-border px-3 py-1 rounded text-xs font-semibold shadow">
              Representative mockup — not client data
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Sidebar Facts */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="font-bold text-primary uppercase tracking-wider text-xs mb-2">Partners</h3>
              <p className="text-muted-foreground text-sm">{study.partners}</p>
            </div>
            <div>
              <h3 className="font-bold text-primary uppercase tracking-wider text-xs mb-2">Tools & Data</h3>
              <p className="text-muted-foreground text-sm">{study.tools}</p>
            </div>
            <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
              <h3 className="font-bold text-secondary uppercase tracking-wider text-xs mb-2">Proof</h3>
              <p className="text-primary font-medium text-sm">{study.proof}</p>
            </div>
          </div>

          {/* Story Body */}
          <div className="md:col-span-2 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-primary mb-4">The Problem</h2>
            <p className="text-muted-foreground mb-8">{study.problem}</p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">System & Approach</h2>
            <p className="text-muted-foreground mb-8">{study.system}</p>

            <div className="mt-12 p-6 border border-border rounded-xl bg-card">
              <h3 className="font-bold text-primary mb-2">What this shows hiring managers</h3>
              <p className="text-muted-foreground text-sm">{study.showsHiringManagers}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
