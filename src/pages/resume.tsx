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
          Download the resume that fits the role. Each version emphasizes different evidence: enterprise SEO,
          AEO/GEO, AI product systems, or organic growth.
        </p>
        <p className="mb-12 -mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Selections may be reviewed in aggregate to understand which paths are getting interest.
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
