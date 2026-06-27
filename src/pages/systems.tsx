import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { ArrowDown } from "lucide-react";

export default function Systems() {
  return (
    <Layout>
      <SEO 
        title="Systems Architecture | Mitchell Miller" 
        description="Mitchell Miller's operating architecture across search, analytics, and AI systems."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Systems Architecture</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
          A standardized flow from raw data sources to final delivery. This is the operating system behind enterprise scale.
        </p>

        {/* Visual Diagram Flow */}
        <div className="space-y-4 mb-24 relative">
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">1. Sources</h3>
            <div className="flex flex-wrap gap-2">
              {['GA4', 'GSC', 'Google Ads', 'Adobe Analytics', 'Profound', 'CRM', 'CMS', 'Yext', 'Screaming Frog', 'BigQuery', 'Call Transcripts', 'Jira/Asana'].map(s => (
                <span key={s} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">{s}</span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center"><ArrowDown className="text-secondary" /></div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">2. Analysis</h3>
            <div className="flex flex-wrap gap-2">
              {['SQL', 'Python', 'Attribution Modeling', 'Crawl/Render Diagnostics', 'Entity Extraction', 'Competitive Analysis', 'Prompt-Set Monitoring', 'AEO/GEO Scoring'].map(s => (
                <span key={s} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center"><ArrowDown className="text-secondary" /></div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">3. Workflow</h3>
            <div className="flex flex-wrap gap-2">
              {['Business Cases', 'Technical Requirements', 'Dashboards', 'Briefs', 'QA Loops', 'Entity Systems', 'Stakeholder Readouts'].map(s => (
                <span key={s} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex justify-center"><ArrowDown className="text-secondary" /></div>

          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">4. Delivery</h3>
            <div className="flex flex-wrap gap-2">
              {['Engineering Prioritization', 'Content Updates', 'Entity Templates', 'Reporting Automation', 'Exec Summaries', 'Client Roadmaps', 'Continuous Improvement'].map(s => (
                <span key={s} className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium">{s}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Skills Matrix */}
        <h2 className="text-3xl font-bold mb-8">Skills Matrix</h2>
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-lg mb-3">Core SEO</h4>
            <p className="text-muted-foreground leading-relaxed">Enterprise strategy, international SEO (hreflang), crawl budget optimization, JavaScript rendering/indexation, migrations, content architecture, keyword strategy.</p>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-lg mb-3">AEO/GEO & AI Search</h4>
            <p className="text-muted-foreground leading-relaxed">Prompt-set monitoring, citation velocity, share-of-voice measurement, retrieval augmented generation (RAG) optimization, LLM evidence targets.</p>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-lg mb-3">Entity Systems</h4>
            <p className="text-muted-foreground leading-relaxed">Parent/child architecture, structured data mapping, schema generation (FAQ, local, organization), network syndication (Yext, Maps).</p>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-lg mb-3">Analytics & Data</h4>
            <p className="text-muted-foreground leading-relaxed">GA4, Adobe Analytics, BigQuery, attribution modeling, dashboard creation, raw log file analysis, revenue modeling.</p>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-lg mb-3">AI / Dev</h4>
            <p className="text-muted-foreground leading-relaxed">Python, SQL, prompt engineering, LLM API orchestration (OpenAI, Anthropic), internal tool prototyping, workflow automation.</p>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-lg mb-3">Tools</h4>
            <p className="text-muted-foreground leading-relaxed">GSC, Screaming Frog, Profound, Semrush, Ahrefs, Yext, AEM, Jira, Asana, Looker Studio.</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}
