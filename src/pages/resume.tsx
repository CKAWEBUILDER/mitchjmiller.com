import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Download, FileText } from "lucide-react";
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
          Point Mitchell toward the conversation you want to have. Pick the closest signal and pull the most relevant background.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {resumeOptions.map((resume) => (
            <a
              key={resume.id}
              href={resume.href}
              download={resume.download}
              className="group flex min-h-48 flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-secondary hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid={`card-resume-${resume.id}`}
            >
              <span>
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="block text-lg font-semibold leading-snug text-primary">
                  {resume.label}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                  {resume.description}
                </span>
              </span>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-secondary">
                Download PDF <Download className="ml-2 h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
