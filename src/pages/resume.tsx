import { Layout } from "@/components/layout";
import { ResumeCard } from "@/components/resume-card";
import { SEO } from "@/components/seo";
import { resumeOptions } from "@/lib/resumes";

export default function Resume() {
  return (
    <Layout>
      <SEO 
        title="Resume | Mitchell Miller" 
        description="Download Mitchell Miller's resume."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Resume</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Point Mitchell toward the right conversation. Pick the closest signal and pull the most relevant background.
        </p>
        <p className="mb-12 -mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          By selecting a signal, you agree Mitchell may use that choice in
          aggregate personal market analysis.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {resumeOptions.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
