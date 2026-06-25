import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { caseStudies } from "@/lib/data";
import { Link } from "wouter";

export default function CaseStudiesIndex() {
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
          {caseStudies.map((study) => (
            <Link key={study.slug} href={`/case-studies/${study.slug}`}>
              <div className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="aspect-video bg-muted flex items-center justify-center text-center border-b border-border relative overflow-hidden">
                  {(study as any).image ? (
                    <img src={(study as any).image} alt={study.placeholder} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-sm font-medium p-6">{study.placeholder}</span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
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
