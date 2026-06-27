import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "dist/public";

const routes = [
  "about",
  "contact",
  "resume",
  "systems",
  "work",
  "selected-builds",
  "blog",
  "blog/mitchell-miller-journey",
  "blog/traditional-seo-to-ai-search",
  "case-studies",
  "case-studies/apple-seasonal-search",
  "case-studies/apple-store-amr",
  "case-studies/apple-education-store",
  "case-studies/stanford-myhealth-seo",
  "case-studies/commonspirit-locations-conversion-engine",
  "case-studies/commonspirit-network-consolidation",
  "case-studies/commonspirit-medical-content-library",
  "case-studies/aem-content-fragmentation-architecture",
  "case-studies/yext-entity-data-foundation",
  "case-studies/claritypulse-ai-reporting",
  "case-studies/searchforge-content-intelligence",
  "case-studies/actionthread-transcript-execution",
  "case-studies/aeo-visibility-infrastructure",
  "case-studies/domainsignal",
  "case-studies/date-night",
  "case-studies/vet-advocates-growth-system",
  "aeo-geo",
];

for (const route of routes) {
  const routeDir = join(outDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(join(outDir, "index.html"), join(routeDir, "index.html"));
}

copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));
writeFileSync(join(outDir, ".nojekyll"), "");
