import { publicPath } from "./paths";

export const resumeOptions = [
  {
    id: "seo-aeo-geo-director",
    label: "Search Direction",
    description: "Enterprise search leadership + AI-search strategy.",
    href: publicPath("/files/Mitchell-Miller-SEO-AEO-GEO-Director-Resume-2026.pdf"),
    download: "Mitchell-Miller-SEO-AEO-GEO-Director-Resume-2026.pdf",
  },
  {
    id: "ai-search-optimization-engineer",
    label: "AI Search Engineering",
    description: "Hands-on AEO/GEO optimization + AI tooling.",
    href: publicPath("/files/Mitchell-Miller-AI-Search-AEO-GEO-Optimization-Engineer-Resume-2026.pdf"),
    download: "Mitchell-Miller-AI-Search-AEO-GEO-Optimization-Engineer-Resume-2026.pdf",
  },
  {
    id: "technical-ai-product-manager",
    label: "Product Management",
    description: "Roadmap, requirements, shipped AI products.",
    href: publicPath("/files/Mitchell-Miller-Technical-AI-Product-Manager-Resume-2026.pdf"),
    download: "Mitchell-Miller-Technical-AI-Product-Manager-Resume-2026.pdf",
  },
  {
    id: "growth-systems-lead",
    label: "Organic Systems Architecture",
    description: "Full-funnel organic growth + growth systems.",
    href: publicPath("/files/Mitchell-Miller-Growth-Systems-Organic-Growth-Lead-Resume-2026.pdf"),
    download: "Mitchell-Miller-Growth-Systems-Organic-Growth-Lead-Resume-2026.pdf",
  },
] as const;

export const defaultResume = resumeOptions[0];
