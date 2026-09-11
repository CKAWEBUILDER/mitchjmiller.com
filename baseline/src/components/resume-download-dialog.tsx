import { Children, isValidElement, type ReactNode } from "react";
import { ResumeCard } from "@/components/resume-card";
import { resumeOptions } from "@/lib/resumes";

export function ResumeDownloadDialog({ children }: { children: ReactNode }) {
  const child = Children.only(children);
  const props = isValidElement(child) ? child.props as Record<string, unknown> : {};
  return <a href="/resume" data-resume-open="true" className={props.className as string}
    data-testid={props["data-testid"] as string}>{isValidElement(child) ? props.children as ReactNode : children}</a>;
}

// One native dialog per document. All downloads are present in the initial HTML;
// the trigger falls back to the complete resume page without JavaScript.
export function ResumeChooser() {
  return <dialog id="resume-chooser" aria-labelledby="resume-chooser-title"
    className="parity-resume-dialog rounded-lg border border-border bg-background p-6 shadow-lg">
    <button type="button" data-resume-close="true" aria-label="Close resume chooser"
      className="absolute right-4 top-3 text-2xl text-muted-foreground">×</button>
    <h2 id="resume-chooser-title" className="text-2xl text-primary pr-6">Download the resume that fits the role.</h2>
    <p className="text-sm text-muted-foreground mt-2">Each version emphasizes different evidence: enterprise SEO, AEO/GEO, AI product systems, or organic growth.</p>
    <p className="text-xs leading-relaxed text-muted-foreground my-4">Selections may be reviewed in aggregate to understand which paths are getting interest.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      {resumeOptions.map(resume => <ResumeCard key={resume.id} resume={resume} variant="compact" />)}
    </div>
  </dialog>;
}
