import { ReactNode } from "react";

import { ResumeCard } from "@/components/resume-card";
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
            Choose the conversation you want to have.
          </DialogTitle>
          <DialogDescription>
            Download the background that matches the role, project, or collaboration you are evaluating.
          </DialogDescription>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Selections may be reviewed in aggregate to understand which paths are getting interest.
          </p>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          {resumeOptions.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} variant="compact" />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
