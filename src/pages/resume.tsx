import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { FileText } from "lucide-react";
import { resumePdf } from "@/lib/images";

export default function Resume() {
  return (
    <Layout>
      <SEO 
        title="Resume | Mitchell Miller" 
        description="Download Mitchell Miller's resume."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-2xl py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Resume</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
          A comprehensive overview of my experience across enterprise SEO, AEO/GEO, and AI Search systems.
        </p>
        
        <a 
          href={resumePdf}
          download="Mitchell_Miller_Resume.pdf"
          className="inline-flex items-center justify-center rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-14 px-8"
        >
          Download Resume (PDF) <FileText className="ml-2 h-5 w-5" />
        </a>
      </div>
    </Layout>
  );
}
