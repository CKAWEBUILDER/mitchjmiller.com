import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { caseStudies } from "@/lib/data";
import { portfolioImages } from "@/lib/images";
import { publicPath } from "@/lib/paths";
import { CheckCircle2, ExternalLink } from "lucide-react";
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

const dignityWaybackUrl =
  "https://web.archive.org/web/20180209061904/https://www.dignityhealth.org/";
const yextPagesUrl = "https://www.yext.com/products/pages";

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
  const image = study ? portfolioImages[study.slug] : undefined;
  const systemSteps = study?.system
    .split(";")
    .map((step) => step.trim())
    .filter(Boolean);

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
          
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <span className="block font-bold text-primary mb-1 uppercase tracking-wider text-xs">Role</span>
              <span className="text-muted-foreground">{study.role}</span>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <span className="block font-bold text-primary mb-1 uppercase tracking-wider text-xs">Context</span>
              <span className="text-muted-foreground">{study.context}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-16">
        
        {/* Visual Hero */}
        <figure className="mb-16">
          <div className="aspect-video rounded-xl border border-border shadow-sm overflow-hidden relative bg-muted">
            {image ? (
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-top ${image.fit === "contain" ? "object-contain bg-white p-4" : "object-cover"}`}
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
            {image?.status === "placeholder" && (
              <span className="absolute bottom-3 left-3 bg-background/90 border border-border px-3 py-1 rounded text-xs font-semibold text-muted-foreground shadow">
                Proof asset pending
              </span>
            )}
          </div>
          {(image?.note || image?.sourceUrl) && (
            <figcaption className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              {image.note && <span>{image.note}</span>}
              {image.sourceUrl && (
                <a
                  href={image.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-secondary hover:underline"
                >
                  Public Source <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </figcaption>
          )}
        </figure>

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
            <div className="p-4 bg-card border border-border rounded-lg">
              <h3 className="font-bold text-primary uppercase tracking-wider text-xs mb-2">Interview Angle</h3>
              <p className="text-muted-foreground text-sm">
                Use this story when the interviewer cares about scale, execution ownership,
                cross-functional alignment, or turning messy data into a shipped system.
              </p>
            </div>
          </div>

          {/* Story Body */}
          <div className="md:col-span-2 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-primary mb-4">Problem</h2>
            <p className="text-muted-foreground mb-8">{study.problem}</p>
            
            <h2 className="text-2xl font-bold text-primary mb-4">System & Approach</h2>
            <p className="text-muted-foreground mb-8">{study.system}</p>

            {systemSteps && systemSteps.length > 1 && (
              <div className="not-prose mb-10 grid gap-3">
                {systemSteps.map((step) => (
                  <div key={step} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            )}

            {study.slug === "commonspirit-locations-conversion-engine" && (
              <section className="not-prose mb-12 space-y-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Before",
                      title: "Nine regional web experiences",
                      body: "Service areas behaved like separate sites, with inconsistent templates, local publishing habits, and weak patient-action paths.",
                    },
                    {
                      label: "System",
                      title: "Yext entity + page layer",
                      body: "Structured location data, reusable templates, database uploads, and Yext engineering support created a scalable conversion surface.",
                    },
                    {
                      label: "Result",
                      title: "Measured patient-action lift",
                      body: "The system became a major location-action layer across calls, directions, appointment starts, and booking pathways.",
                    },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-border bg-card p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-secondary">
                        {item.label}
                      </p>
                      <h3 className="mb-2 text-base font-bold text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <figure>
                    <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
                      <img
                        src={publicPath("/images/proof-optimized/dignity-wayback-locations-nav-2018.png")}
                        alt="Archived Dignity Health homepage showing regional location navigation in 2018"
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Archived 2018 Dignity Health navigation showing separate service-area
                      entry points before the location/entity layer matured.
                    </figcaption>
                  </figure>

                  <figure>
                    <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
                      <img
                        src={publicPath("/images/proof-optimized/dignity-locations-conversion-engine.png")}
                        alt="Current CommonSpirit location finder showing structured location discovery"
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Current public location-finder surface used as representative proof
                      context for structured location discovery.
                    </figcaption>
                  </figure>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={dignityWaybackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-accent/40"
                  >
                    View Wayback Source <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={yextPagesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-accent/40"
                  >
                    Yext Pages Platform <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </section>
            )}

            <h2 className="text-2xl font-bold text-primary mb-4">Execution Pattern</h2>
            <p className="text-muted-foreground mb-8">
              This work required translating search and analytics signals into concrete requirements,
              aligning stakeholders who owned different parts of the system, and keeping the implementation
              tied to measurable business outcomes instead of isolated SEO tasks.
            </p>

            <h2 className="text-2xl font-bold text-primary mb-4">Outcome</h2>
            <p className="text-muted-foreground mb-8">{study.proof}</p>

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
