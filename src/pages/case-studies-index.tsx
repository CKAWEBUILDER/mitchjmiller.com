import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { caseStudies } from "@/lib/data";
import { portfolioImages } from "@/lib/images";
import { Link } from "wouter";

export default function CaseStudiesIndex() {
  const coreSlugs = new Set([
    "apple-seasonal-search",
    "apple-store-amr",
    "apple-education-store",
    "stanford-myhealth-seo",
    "commonspirit-locations-conversion-engine",
    "commonspirit-network-consolidation",
    "commonspirit-medical-content-library",
    "aem-content-fragmentation-architecture",
    "yext-entity-data-foundation",
    "claritypulse-ai-reporting",
    "aeo-visibility-infrastructure",
  ]);

  const coreStudies = caseStudies.filter((study) => coreSlugs.has(study.slug));
  const selectedBuilds = caseStudies.filter((study) => !coreSlugs.has(study.slug));

  return (
    <Layout>
      <SEO 
        title="Case Studies | Mitchell Miller" 
        description="In-depth case studies on enterprise SEO, AEO/GEO, and AI Search."
      />
      <div className="container mx-auto px-4 md:px-8 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Case Studies</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
          Deep dives into systems architecture, enterprise alignment, and measurable outcomes.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {coreStudies.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`}>
              <div className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video bg-white flex items-center justify-center text-center border-b border-border relative overflow-hidden">
                  {portfolioImages[study.slug] ? (
                    <img
                      src={portfolioImages[study.slug].src}
                      alt={portfolioImages[study.slug].alt}
                      className={`w-full h-full object-top ${portfolioImages[study.slug].fit === "contain" ? "object-contain p-2" : "object-cover"}`}
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm font-medium p-6">{study.placeholder}</span>
                  )}
                  {portfolioImages[study.slug]?.status === "placeholder" && (
                    <span className="absolute bottom-3 left-3 rounded bg-background/90 px-2 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm">
                      Source image pending
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-secondary transition-colors">{study.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed break-words mt-auto">{study.thesis}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">Personal builds</p>
            <h2 className="text-2xl font-bold text-primary mb-3">Product Prototypes and Growth Systems</h2>
            <p className="text-muted-foreground leading-relaxed">
              Personal prototypes and small-business systems showing hands-on product thinking, AI workflow design,
              and execution speed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {selectedBuilds.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`}>
                <div className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="aspect-video bg-white flex items-center justify-center text-center border-b border-border relative overflow-hidden">
                    {portfolioImages[study.slug] ? (
                      <img
                        src={portfolioImages[study.slug].src}
                        alt={portfolioImages[study.slug].alt}
                        className={`w-full h-full object-top ${portfolioImages[study.slug].fit === "contain" ? "object-contain p-2" : "object-cover"}`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm font-medium p-6">{study.placeholder}</span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{study.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed break-words mt-auto">{study.thesis}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
