import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

export default function About() {
  return (
    <Layout>
      <SEO 
        title="About | Mitchell Miller" 
        description="Mitchell is a remote-first SEO/AEO/GEO and AI Search systems leader based in San Jose, CA."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About</h1>
        
        <div className="aspect-[3/4] w-48 md:w-64 bg-muted rounded-xl mb-12 flex items-center justify-center border border-border shadow-sm overflow-hidden">
          <img src="/images/portrait.png" alt="Mitchell Miller" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            Mitchell is a remote-first SEO/AEO/GEO and AI Search systems leader based in San Jose, CA.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Professional Values</h2>
          <p className="mb-6">
            I believe that search is not just a marketing channel—it is an operating system for understanding user intent, competitive landscape, and business opportunity. My professional values center around three core principles:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8 text-muted-foreground">
            <li><strong>Data-driven:</strong> Moving past opinions to find what the data actually supports.</li>
            <li><strong>Cross-functional:</strong> SEO cannot happen in a silo. Success requires deep alignment with engineering, product, and editorial teams.</li>
            <li><strong>Builds things that compound:</strong> I focus on creating systems, workflows, and tools that improve delivery and capability over time.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Experience at Scale</h2>
          <p className="mb-6">
            I have built search programs and architectures across healthcare, enterprise, agency, and nonprofit contexts. From overseeing Apple-scale SEO programs across the Americas to architecting a $15.21M healthcare search system for CommonSpirit Health, my focus is always on translating complex data into clear, executable roadmaps.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Prototyping & Building</h2>
          <p className="mb-6">
            Outside of traditional enterprise search, I build product prototypes to solve operational bottlenecks and explore market gaps:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8 text-muted-foreground">
            <li><strong>DomainSignal:</strong> A solo AI build for scoring domain authority.</li>
            <li><strong>Date Night:</strong> A couples app prototype focused on relationship-first discovery.</li>
            <li><strong>Clear Kayak Adventures:</strong> Operating digital infrastructure and operations for a small outdoor business.</li>
            <li><strong>Vet Advocates:</strong> Building a structured growth system for a veterans-services nonprofit.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-4">Outside Work</h2>
          <p>
            When I'm not looking at data or building systems, you can find me surfing, rock climbing, or practicing martial arts. I believe the physical practice of doing something difficult with your body keeps you honest.
          </p>
        </div>
      </div>
    </Layout>
  );
}
