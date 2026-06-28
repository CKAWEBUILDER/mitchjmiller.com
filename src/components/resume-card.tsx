import {
  Bot,
  Download,
  FileSearch,
  KanbanSquare,
  Network,
} from "lucide-react";

import type { resumeOptions } from "@/lib/resumes";

type ResumeOption = (typeof resumeOptions)[number];

type ResumeCardProps = {
  resume: ResumeOption;
  variant?: "compact" | "page";
};

const iconMap = {
  "search-direction": FileSearch,
  "ai-search-engineering": Bot,
  "product-management": KanbanSquare,
  "organic-systems-architecture": Network,
} satisfies Record<ResumeOption["id"], typeof FileSearch>;

function ResumeSignalSketch({ resumeId }: { resumeId: ResumeOption["id"] }) {
  const lineClass = "stroke-secondary/55";
  const nodeClass = "fill-primary";

  if (resumeId === "ai-search-engineering") {
    return (
      <svg viewBox="0 0 220 72" className="h-16 w-full" aria-hidden="true">
        <path d="M20 38C48 12 77 14 106 36C135 58 169 55 202 22" className={lineClass} strokeWidth="3" fill="none" />
        <circle cx="20" cy="38" r="6" className={nodeClass} />
        <circle cx="106" cy="36" r="6" className="fill-secondary animate-pulse" />
        <circle cx="202" cy="22" r="6" className={nodeClass} />
        <rect x="44" y="48" width="32" height="8" rx="4" className="fill-secondary/20" />
        <rect x="126" y="18" width="46" height="8" rx="4" className="fill-secondary/20" />
      </svg>
    );
  }

  if (resumeId === "product-management") {
    return (
      <svg viewBox="0 0 220 72" className="h-16 w-full" aria-hidden="true">
        <rect x="18" y="16" width="46" height="40" rx="8" className="fill-primary/10 stroke-primary/30" />
        <rect x="87" y="16" width="46" height="40" rx="8" className="fill-secondary/10 stroke-secondary/40" />
        <rect x="156" y="16" width="46" height="40" rx="8" className="fill-primary/10 stroke-primary/30" />
        <path d="M66 36H84M135 36H153" className={lineClass} strokeWidth="3" strokeLinecap="round" />
        <path d="M78 30L84 36L78 42M147 30L153 36L147 42" className={lineClass} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="110" cy="36" r="7" className="fill-secondary animate-pulse" />
      </svg>
    );
  }

  if (resumeId === "organic-systems-architecture") {
    return (
      <svg viewBox="0 0 220 72" className="h-16 w-full" aria-hidden="true">
        <circle cx="42" cy="36" r="15" className="fill-primary/10 stroke-primary/35" />
        <circle cx="110" cy="20" r="13" className="fill-secondary/10 stroke-secondary/45" />
        <circle cx="110" cy="54" r="13" className="fill-secondary/10 stroke-secondary/45" />
        <circle cx="178" cy="36" r="15" className="fill-primary/10 stroke-primary/35" />
        <path d="M57 32L97 23M57 40L97 51M123 23L163 32M123 51L163 40" className={lineClass} strokeWidth="3" strokeLinecap="round" />
        <circle cx="110" cy="20" r="5" className="fill-secondary animate-pulse" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 72" className="h-16 w-full" aria-hidden="true">
      <path d="M24 54H196" className="stroke-border" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 50V30M78 50V20M120 50V36M162 50V14" className="stroke-primary/45" strokeWidth="10" strokeLinecap="round" />
      <path d="M30 26C62 18 88 32 114 27C143 21 166 15 195 20" className={lineClass} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="162" cy="14" r="6" className="fill-secondary animate-pulse" />
    </svg>
  );
}

export function ResumeCard({ resume, variant = "page" }: ResumeCardProps) {
  const Icon = iconMap[resume.id];
  const compact = variant === "compact";

  return (
    <a
      href={resume.href}
      download={resume.download}
      className={`group flex flex-col justify-between rounded-lg border border-border bg-card text-left transition-colors hover:border-secondary hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        compact ? "min-h-40 p-4" : "min-h-56 p-6"
      }`}
      data-testid={`${compact ? "link-download" : "card-resume"}-${resume.id}`}
    >
      <span>
        <span className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1 rounded-md bg-muted/40 px-3 py-1">
            <ResumeSignalSketch resumeId={resume.id} />
          </span>
        </span>
        <span className="block text-base font-semibold leading-snug text-primary">
          {resume.label}
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
          {resume.description}
        </span>
        {!compact && (
          <span className="mt-4 block">
            <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Useful conversation
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-primary/80">
              {resume.talkTrack}
            </span>
            <span className="mt-4 flex flex-wrap gap-2">
              {resume.signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded bg-secondary/10 px-2 py-1 text-xs font-semibold text-secondary"
                >
                  {signal}
                </span>
              ))}
            </span>
          </span>
        )}
      </span>
      <span className={`${compact ? "mt-4" : "mt-6"} inline-flex items-center text-sm font-semibold text-secondary`}>
        Download PDF <Download className="ml-2 h-4 w-4" />
      </span>
    </a>
  );
}
