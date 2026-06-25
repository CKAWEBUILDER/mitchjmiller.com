import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Mail, Monitor, BarChart, Settings, CheckCircle2 } from "lucide-react";
import { caseStudies } from "@/lib/data";

export default function Home() {
  const featuredCases = caseStudies.slice(0, 4);
  const aiSystems = caseStudies.filter(c => ['claritypulse-ai-reporting', 'searchforge-content-intelligence', 'actionthread-transcript-execution', 'aeo-visibility-infrastructure'].includes(c.slug));

  return (
    <Layout>
      <SEO 
        title="SEO, AEO/GEO & AI Search Systems Leader" 
        description="Mitchell Miller is a senior enterprise SEO/AEO/GEO and AI Search systems leader operating at Apple and CommonSpirit scale."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 z-[-1] opacity-50" style={{ backgroundImage: 'url(/images/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-4">
              Mitchell Miller
            </h1>
            <h2 className="text-2xl md:text-3xl text-secondary font-medium mb-6">
              SEO, AEO/GEO & AI Search Systems Leader
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              I turn search, analytics, and AI-visibility data into roadmaps, technical requirements, executive-ready business cases, and continuously improving systems across enterprise SEO, AEO/GEO, reporting, content architecture, and growth operations.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8 inline-block">
              <p className="text-sm font-medium text-primary">
                <span className="text-secondary font-bold mr-2">Open to remote and hybrid roles:</span>
                SEO Director | AEO/GEO Lead | AI Search Strategist | Agentic AI Engineer | AI Automation Engineer | Technical SEO/Product Manager | Organic Growth Lead | Website Growth Lead
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/work" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6">
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/resume" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6">
                Download Resume <FileText className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6">
                Contact <Mail className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-4">Proof at Scale</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-primary">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Apple-scale SEO program</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> $15.21M FY22 attributable revenue</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 88K appointments</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 1,000+ entity pages</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> AEO/GEO measurement</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operating Model */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12">From data to decisions to systems.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart className="text-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Diagnose with data</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use analytics, crawl/render diagnostics, search demand, entity gaps, attribution, prompt-set monitoring, competitive analysis, and statistical methods to identify where growth is actually available.
              </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <Monitor className="text-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Align and translate</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Turn findings into executive-ready business cases, technical requirements, product roadmaps, stakeholder plans, and prioritized implementation work across SEO, content, UX, engineering, paid media, analytics, vendors, and client teams.
              </p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <Settings className="text-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Build and compound</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Create systems that improve delivery over time: dashboards, entity architecture, CMS workflows, QA loops, AEO/GEO measurement, reporting automation, AI-assisted briefs, action routing, and continuous improvement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Enterprise Work */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Enterprise Work</h2>
            <Link href="/work" className="text-secondary font-medium hover:underline flex items-center">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredCases.map((caseStudy) => (
              <Link key={caseStudy.slug} href={`/case-studies/${caseStudy.slug}`}>
                <motion.div whileHover={{ scale: 1.01 }} className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="aspect-video bg-muted flex items-center justify-center text-center border-b border-border relative overflow-hidden">
                    {(caseStudy as any).image ? (
                      <img src={(caseStudy as any).image} alt={caseStudy.placeholder} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-muted-foreground text-sm font-medium p-6">{caseStudy.placeholder}</span>
                    )}
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-secondary transition-colors">{caseStudy.title}</h3>
                    <p className="text-muted-foreground text-sm">{caseStudy.thesis}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Search Systems */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-white">AI Search & Internal Product Systems</h2>
          <p className="text-primary-foreground/80 mb-12 max-w-2xl">
            Internal prototypes, measurement infrastructure, and workflow experiments built to solve operational bottlenecks.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiSystems.map((system) => (
              <Link key={system.slug} href={`/case-studies/${system.slug}`}>
                <motion.div whileHover={{ y: -5 }} className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-6 h-full cursor-pointer hover:bg-primary-foreground/20 transition-colors">
                  <h3 className="font-bold text-lg text-white mb-2">{system.title}</h3>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">{system.thesis}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Architecture */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Systems Architecture</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A structured flow from raw data sources through analysis, standardized workflows, and final delivery. This is the operating system behind enterprise scale.
              </p>
              <Link href="/systems" className="inline-flex items-center text-secondary font-medium hover:underline">
                Explore the full architecture <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded border border-border text-sm"><span className="font-bold text-primary block text-xs uppercase mb-1">Sources</span> GA4, GSC, Ads, Adobe, Yext, Crawl...</div>
                  <div className="flex justify-center"><ArrowRight className="text-secondary/50 rotate-90 md:rotate-0" /></div>
                  <div className="p-3 bg-muted rounded border border-border text-sm"><span className="font-bold text-primary block text-xs uppercase mb-1">Analysis</span> SQL, Python, BigQuery, Entity Extraction...</div>
                  <div className="flex justify-center"><ArrowRight className="text-secondary/50 rotate-90 md:rotate-0" /></div>
                  <div className="p-3 bg-muted rounded border border-border text-sm"><span className="font-bold text-primary block text-xs uppercase mb-1">Workflow</span> Business cases, Jira, QA loops, Dashboards...</div>
                  <div className="flex justify-center"><ArrowRight className="text-secondary/50 rotate-90 md:rotate-0" /></div>
                  <div className="p-3 bg-secondary/10 border-secondary/30 rounded border text-sm"><span className="font-bold text-secondary block text-xs uppercase mb-1">Delivery</span> Engineering priority, Exec summaries...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Signals & Systems</h2>
            <Link href="/blog" className="text-secondary font-medium hover:underline flex items-center">
              View all posts <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/blog/mitchell-miller-journey">
              <div className="group cursor-pointer">
                <p className="text-sm text-secondary font-medium mb-2">June 2026</p>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">The Long Road to Systems Thinking: My Journey in Search, AI, and Building Things</h3>
                <p className="text-muted-foreground">From agency environments to Apple-scale SEO programs, and why search in 2026 feels like being at the edge of a new map.</p>
              </div>
            </Link>
            <Link href="/blog/traditional-seo-to-ai-search">
              <div className="group cursor-pointer">
                <p className="text-sm text-muted-foreground font-medium mb-2">Draft / Coming Soon</p>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">From Traditional SEO to AI Search: What Actually Changed</h3>
                <p className="text-muted-foreground">A breakdown of how information retrieval has shifted from blue links to generated answers, and what it means for enterprise strategy.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
