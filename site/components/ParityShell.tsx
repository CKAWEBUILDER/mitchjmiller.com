import { Router } from "wouter";
import type { ReactNode } from "react";
import { Layout } from "../../baseline/src/components/layout";

// Production header/footer around non-parity pages (lab, workbench, clients).
// Rendered statically; no client hydration of the shell itself.
export default function ParityShell({ path, children }: { path: string; children?: ReactNode }) {
  const normalized = path.replace(/\/$/, "") || "/";
  return <Router ssrPath={normalized}><Layout>{children}</Layout></Router>;
}
