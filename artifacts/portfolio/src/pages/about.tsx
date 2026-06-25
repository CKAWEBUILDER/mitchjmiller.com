import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { headshot } from "@/lib/images";

const certs = [
  "Google AI Essentials",
  "Google Analytics 4 (GA4)",
  "PSM I (Scrum)",
  "CAPM (Project Management)",
  "Google Ads Search",
];

export default function About() {
  return (
    <Layout>
      <SEO
        title="About · Mitchell Miller — Director of SEO, AEO/GEO & AI Search Systems"
        description="Mitchell Miller is a remote-first SEO, AEO/GEO, and AI Search systems leader. He's led enterprise search at Apple, CommonSpirit Health, and Stanford Health Care."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start mb-14">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary" style={{ letterSpacing: "-0.02em" }}>
              About
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Mitchell Miller. I've led enterprise SEO at Apple, Stanford Health Care, and a 1,000+ location healthcare network.
              My discipline is the convergence of search, AI systems, performance marketing, and applied data science.
            </p>
          </div>
          <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border border-border shadow-md bg-muted flex-shrink-0">
            <img
              src={headshot}
              alt="Mitchell Miller"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="space-y-10 text-base leading-relaxed" style={{ lineHeight: 1.7 }}>
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">What I do</h2>
            <p className="text-muted-foreground">
              I find growth opportunities using analytics, entity diagnostics, and AI-visibility data — then build the systems that automate delivery.
              Increasingly that means LLM workflows, agent orchestration, and prompt evaluation pipelines.
              I'm currently advising enterprise clients at Clarity Digital and building independent products.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Enterprise scale</h2>
            <p className="text-muted-foreground">
              Apple-scale SEO program across the Americas product and services portfolio. CommonSpirit Health —
              a $15.21M attributable revenue outcome, 1,000+ Yext entity pages, 88K appointments, and 4.9M+ organic sessions.
              Stanford Health Care full-funnel paid and organic across regulated clinical service lines.
              Agency experience spanning enterprise SaaS, ecommerce, cybersecurity, and healthcare.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Independent builds</h2>
            <p className="text-muted-foreground mb-3">
              I build things to understand them and to solve operational gaps I've hit in client work.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong className="text-primary font-semibold">DomainSignal</strong> — solo AI build for domain authority scoring and intelligence.</li>
              <li><strong className="text-primary font-semibold">Date Night</strong> — couples app prototype for people done swiping.</li>
              <li><strong className="text-primary font-semibold">Clear Kayak Adventures</strong> — digital infrastructure and operations for a small outdoor tour business.</li>
              <li><strong className="text-primary font-semibold">Vet Advocates</strong> — structured acquisition system for a veterans-services nonprofit; monthly signups grew from 2-3 to 25-50.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Open to</h2>
            <p className="text-muted-foreground">
              Director-level roles in SEO, AEO/GEO, AI Search, or AI Systems leadership. Remote. I am also available for advisory engagements and speaking.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {certs.map(c => (
                <span key={c} className="text-xs bg-muted border border-border rounded-full px-3 py-1.5 text-muted-foreground font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">Outside work</h2>
            <p className="text-muted-foreground">
              Surfing &middot; BJJ &amp; Muay Thai &middot; Rock climbing &middot; Drone piloting &middot; Music curation.
              The physical practice of doing something difficult with your body keeps you honest — you cannot fake a wave or a wall.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
