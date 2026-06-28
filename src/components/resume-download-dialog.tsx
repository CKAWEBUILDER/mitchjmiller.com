import { Download, FileText } from "lucide-react";
import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resumeOptions } from "@/lib/resumes";

type ResumeDownloadDialogProps = {
  children: ReactNode;
};

export function ResumeDownloadDialog({ children }: ResumeDownloadDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">
            Point Mitchell toward the right conversation.
          </DialogTitle>
          <DialogDescription>
            Pick the closest signal and pull the most relevant background.
          </DialogDescription>
          <p className="text-xs leading-relaxed text-muted-foreground">
            By selecting a signal, you agree Mitchell may use that choice in
            aggregate personal market analysis.
          </p>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          {resumeOptions.map((resume) => (
            <a
              key={resume.id}
              href={resume.href}
              download={resume.download}
              className="group flex min-h-36 flex-col justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-secondary hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid={`link-download-${resume.id}`}
            >
              <span>
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <FileText className="h-4 w-4" />
                </span>
                <span className="block text-base font-semibold leading-snug text-primary">
                  {resume.label}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {resume.description}
                </span>
              </span>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
                Download PDF <Download className="ml-2 h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
